<?php
declare(strict_types=1);

// HostedRest SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class HostedRestSDK implements \JsonSerializable
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new HostedRestUtility();
        $this->_utility = $utility;

        $config = HostedRestConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = HostedRestHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = HostedRestHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!HostedRestFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, HostedRestFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    // The options hold the credential, so the default print and json form
    // name the client and nothing more; options_map() is the way to read
    // them back.
    public function jsonSerialize(): array
    {
        return ['name' => 'HostedRest'];
    }

    public function __debugInfo(): array
    {
        return $this->jsonSerialize();
    }

    public function get_utility()
    {
        return HostedRestUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = HostedRestHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = strtoupper(is_string($method_val) && '' !== $method_val ? $method_val : "GET");
        $allow_method = Struct::getpath($opts, "allow.method");
        if (!HostedRestPrepareMethod::allowed($allow_method, $method_val)) {
            return ($utility->make_error)($ctx, $ctx->make_error("spec_method_allow",
                "Method \"" . $method_val . "\" not allowed by SDK option allow.method value: \"" .
                (is_string($allow_method) ? $allow_method : "") . "\""));
        }
        $params = HostedRestHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = HostedRestHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new HostedRestSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        return HostedRestPrepareMethod::allowed(Struct::getpath($this->options, "allow.op"), $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new HostedRestError($op . "_allow",
                "HostedRestSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = HostedRestHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => ($utility->clean)($ctx, $fetch_err)];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = HostedRestHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            $body_err = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
                if (true === Struct::getprop($fetched, "unreadable")) {
                    $failed = ($status >= 200 && $status < 300) ? null : $ctx->make_error(
                        "request_status",
                        "request: {$status}: " . (string)Struct::getprop($fetched, "statusText"));
                    $sent = $fetchdef["headers"] ?? [];
                    if (HostedRestFetcher::usesDefault($ctx)) {
                        $sent = HostedRestFetcher::sentHeaders($sent);
                    }
                    $body_err = HostedRestResultBody::unreadable($ctx, $status, $headers,
                        Struct::getprop($fetched, "body"), $sent, $failed);
                }
            }

            $out = [
                "ok" => null === $body_err && $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
            if (null !== $body_err) {
                $out["err"] = ($utility->clean)($ctx, $body_err);
            }
            return $out;
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new HostedRestError("graphql_error",
                "HostedRestSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_agent_health = null;

    // Canonical facade: $client->AgentHealth()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_health()
    // resolves here too.
    public function AgentHealth($data = null)
    {
        require_once __DIR__ . '/entity/agent_health_entity.php';
        if ($data === null) {
            if ($this->_agent_health === null) {
                $this->_agent_health = new AgentHealthEntity($this, null);
            }
            return $this->_agent_health;
        }
        return new AgentHealthEntity($this, $data);
    }


    private $_agent_sandbox = null;

    // Canonical facade: $client->AgentSandbox()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_sandbox()
    // resolves here too.
    public function AgentSandbox($data = null)
    {
        require_once __DIR__ . '/entity/agent_sandbox_entity.php';
        if ($data === null) {
            if ($this->_agent_sandbox === null) {
                $this->_agent_sandbox = new AgentSandboxEntity($this, null);
            }
            return $this->_agent_sandbox;
        }
        return new AgentSandboxEntity($this, $data);
    }


    private $_agent_user = null;

    // Canonical facade: $client->AgentUser()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_user()
    // resolves here too.
    public function AgentUser($data = null)
    {
        require_once __DIR__ . '/entity/agent_user_entity.php';
        if ($data === null) {
            if ($this->_agent_user === null) {
                $this->_agent_user = new AgentUserEntity($this, null);
            }
            return $this->_agent_user;
        }
        return new AgentUserEntity($this, $data);
    }


    private $_app_user = null;

    // Canonical facade: $client->AppUser()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_user()
    // resolves here too.
    public function AppUser($data = null)
    {
        require_once __DIR__ . '/entity/app_user_entity.php';
        if ($data === null) {
            if ($this->_app_user === null) {
                $this->_app_user = new AppUserEntity($this, null);
            }
            return $this->_app_user;
        }
        return new AppUserEntity($this, $data);
    }


    private $_app_user_login = null;

    // Canonical facade: $client->AppUserLogin()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_user_login()
    // resolves here too.
    public function AppUserLogin($data = null)
    {
        require_once __DIR__ . '/entity/app_user_login_entity.php';
        if ($data === null) {
            if ($this->_app_user_login === null) {
                $this->_app_user_login = new AppUserLoginEntity($this, null);
            }
            return $this->_app_user_login;
        }
        return new AppUserLoginEntity($this, $data);
    }


    private $_app_user_session = null;

    // Canonical facade: $client->AppUserSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_user_session()
    // resolves here too.
    public function AppUserSession($data = null)
    {
        require_once __DIR__ . '/entity/app_user_session_entity.php';
        if ($data === null) {
            if ($this->_app_user_session === null) {
                $this->_app_user_session = new AppUserSessionEntity($this, null);
            }
            return $this->_app_user_session;
        }
        return new AppUserSessionEntity($this, $data);
    }


    private $_app_user_total = null;

    // Canonical facade: $client->AppUserTotal()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_user_total()
    // resolves here too.
    public function AppUserTotal($data = null)
    {
        require_once __DIR__ . '/entity/app_user_total_entity.php';
        if ($data === null) {
            if ($this->_app_user_total === null) {
                $this->_app_user_total = new AppUserTotalEntity($this, null);
            }
            return $this->_app_user_total;
        }
        return new AppUserTotalEntity($this, $data);
    }


    private $_app_user_verify = null;

    // Canonical facade: $client->AppUserVerify()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->app_user_verify()
    // resolves here too.
    public function AppUserVerify($data = null)
    {
        require_once __DIR__ . '/entity/app_user_verify_entity.php';
        if ($data === null) {
            if ($this->_app_user_verify === null) {
                $this->_app_user_verify = new AppUserVerifyEntity($this, null);
            }
            return $this->_app_user_verify;
        }
        return new AppUserVerifyEntity($this, $data);
    }


    private $_authentication = null;

    // Canonical facade: $client->Authentication()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->authentication()
    // resolves here too.
    public function Authentication($data = null)
    {
        require_once __DIR__ . '/entity/authentication_entity.php';
        if ($data === null) {
            if ($this->_authentication === null) {
                $this->_authentication = new AuthenticationEntity($this, null);
            }
            return $this->_authentication;
        }
        return new AuthenticationEntity($this, $data);
    }


    private $_collection = null;

    // Canonical facade: $client->Collection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->collection()
    // resolves here too.
    public function Collection($data = null)
    {
        require_once __DIR__ . '/entity/collection_entity.php';
        if ($data === null) {
            if ($this->_collection === null) {
                $this->_collection = new CollectionEntity($this, null);
            }
            return $this->_collection;
        }
        return new CollectionEntity($this, $data);
    }


    private $_collection_record = null;

    // Canonical facade: $client->CollectionRecord()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->collection_record()
    // resolves here too.
    public function CollectionRecord($data = null)
    {
        require_once __DIR__ . '/entity/collection_record_entity.php';
        if ($data === null) {
            if ($this->_collection_record === null) {
                $this->_collection_record = new CollectionRecordEntity($this, null);
            }
            return $this->_collection_record;
        }
        return new CollectionRecordEntity($this, $data);
    }


    private $_custom = null;

    // Canonical facade: $client->Custom()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->custom()
    // resolves here too.
    public function Custom($data = null)
    {
        require_once __DIR__ . '/entity/custom_entity.php';
        if ($data === null) {
            if ($this->_custom === null) {
                $this->_custom = new CustomEntity($this, null);
            }
            return $this->_custom;
        }
        return new CustomEntity($this, $data);
    }


    private $_legacy_mutation = null;

    // Canonical facade: $client->LegacyMutation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->legacy_mutation()
    // resolves here too.
    public function LegacyMutation($data = null)
    {
        require_once __DIR__ . '/entity/legacy_mutation_entity.php';
        if ($data === null) {
            if ($this->_legacy_mutation === null) {
                $this->_legacy_mutation = new LegacyMutationEntity($this, null);
            }
            return $this->_legacy_mutation;
        }
        return new LegacyMutationEntity($this, $data);
    }


    private $_legacy_unknown = null;

    // Canonical facade: $client->LegacyUnknown()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->legacy_unknown()
    // resolves here too.
    public function LegacyUnknown($data = null)
    {
        require_once __DIR__ . '/entity/legacy_unknown_entity.php';
        if ($data === null) {
            if ($this->_legacy_unknown === null) {
                $this->_legacy_unknown = new LegacyUnknownEntity($this, null);
            }
            return $this->_legacy_unknown;
        }
        return new LegacyUnknownEntity($this, $data);
    }


    private $_legacy_user = null;

    // Canonical facade: $client->LegacyUser()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->legacy_user()
    // resolves here too.
    public function LegacyUser($data = null)
    {
        require_once __DIR__ . '/entity/legacy_user_entity.php';
        if ($data === null) {
            if ($this->_legacy_user === null) {
                $this->_legacy_user = new LegacyUserEntity($this, null);
            }
            return $this->_legacy_user;
        }
        return new LegacyUserEntity($this, $data);
    }


    private $_login = null;

    // Canonical facade: $client->Login()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->login()
    // resolves here too.
    public function Login($data = null)
    {
        require_once __DIR__ . '/entity/login_entity.php';
        if ($data === null) {
            if ($this->_login === null) {
                $this->_login = new LoginEntity($this, null);
            }
            return $this->_login;
        }
        return new LoginEntity($this, $data);
    }


    private $_register = null;

    // Canonical facade: $client->Register()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->register()
    // resolves here too.
    public function Register($data = null)
    {
        require_once __DIR__ . '/entity/register_entity.php';
        if ($data === null) {
            if ($this->_register === null) {
                $this->_register = new RegisterEntity($this, null);
            }
            return $this->_register;
        }
        return new RegisterEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new HostedRestSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
