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

class HostedRestSDK
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

        $config = HostedRestConfig::make_config();

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

        // Add features from config.
        $feature_opts = HostedRestHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = HostedRestHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, HostedRestFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
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
        $method_val = is_string($method_val) ? $method_val : "GET";
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

    public function direct(array $fetchargs = []): mixed
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
            return ["ok" => false, "err" => $fetch_err];
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
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_agent_health = null;

    // Idiomatic facade: $client->agent_health()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias AgentHealth() (PHP method
    // names are case-insensitive).
    public function agent_health($data = null)
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

    // Idiomatic facade: $client->agent_sandbox()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias AgentSandbox() (PHP method
    // names are case-insensitive).
    public function agent_sandbox($data = null)
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


    private $_agent_user_detail = null;

    // Idiomatic facade: $client->agent_user_detail()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias AgentUserDetail() (PHP method
    // names are case-insensitive).
    public function agent_user_detail($data = null)
    {
        require_once __DIR__ . '/entity/agent_user_detail_entity.php';
        if ($data === null) {
            if ($this->_agent_user_detail === null) {
                $this->_agent_user_detail = new AgentUserDetailEntity($this, null);
            }
            return $this->_agent_user_detail;
        }
        return new AgentUserDetailEntity($this, $data);
    }


    private $_agent_user_list = null;

    // Idiomatic facade: $client->agent_user_list()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias AgentUserList() (PHP method
    // names are case-insensitive).
    public function agent_user_list($data = null)
    {
        require_once __DIR__ . '/entity/agent_user_list_entity.php';
        if ($data === null) {
            if ($this->_agent_user_list === null) {
                $this->_agent_user_list = new AgentUserListEntity($this, null);
            }
            return $this->_agent_user_list;
        }
        return new AgentUserListEntity($this, $data);
    }


    private $_app_user = null;

    // Idiomatic facade: $client->app_user()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias AppUser() (PHP method
    // names are case-insensitive).
    public function app_user($data = null)
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

    // Idiomatic facade: $client->app_user_login()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias AppUserLogin() (PHP method
    // names are case-insensitive).
    public function app_user_login($data = null)
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

    // Idiomatic facade: $client->app_user_session()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias AppUserSession() (PHP method
    // names are case-insensitive).
    public function app_user_session($data = null)
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

    // Idiomatic facade: $client->app_user_total()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias AppUserTotal() (PHP method
    // names are case-insensitive).
    public function app_user_total($data = null)
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

    // Idiomatic facade: $client->app_user_verify()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias AppUserVerify() (PHP method
    // names are case-insensitive).
    public function app_user_verify($data = null)
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

    // Idiomatic facade: $client->authentication()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Authentication() (PHP method
    // names are case-insensitive).
    public function authentication($data = null)
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

    // Idiomatic facade: $client->collection()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Collection() (PHP method
    // names are case-insensitive).
    public function collection($data = null)
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

    // Idiomatic facade: $client->collection_record()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias CollectionRecord() (PHP method
    // names are case-insensitive).
    public function collection_record($data = null)
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


    private $_collection_record_list = null;

    // Idiomatic facade: $client->collection_record_list()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias CollectionRecordList() (PHP method
    // names are case-insensitive).
    public function collection_record_list($data = null)
    {
        require_once __DIR__ . '/entity/collection_record_list_entity.php';
        if ($data === null) {
            if ($this->_collection_record_list === null) {
                $this->_collection_record_list = new CollectionRecordListEntity($this, null);
            }
            return $this->_collection_record_list;
        }
        return new CollectionRecordListEntity($this, $data);
    }


    private $_custom = null;

    // Idiomatic facade: $client->custom()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Custom() (PHP method
    // names are case-insensitive).
    public function custom($data = null)
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


    private $_legacy = null;

    // Idiomatic facade: $client->legacy()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Legacy() (PHP method
    // names are case-insensitive).
    public function legacy($data = null)
    {
        require_once __DIR__ . '/entity/legacy_entity.php';
        if ($data === null) {
            if ($this->_legacy === null) {
                $this->_legacy = new LegacyEntity($this, null);
            }
            return $this->_legacy;
        }
        return new LegacyEntity($this, $data);
    }


    private $_legacy_mutation = null;

    // Idiomatic facade: $client->legacy_mutation()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias LegacyMutation() (PHP method
    // names are case-insensitive).
    public function legacy_mutation($data = null)
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

    // Idiomatic facade: $client->legacy_unknown()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias LegacyUnknown() (PHP method
    // names are case-insensitive).
    public function legacy_unknown($data = null)
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


    private $_legacy_unknown_list = null;

    // Idiomatic facade: $client->legacy_unknown_list()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias LegacyUnknownList() (PHP method
    // names are case-insensitive).
    public function legacy_unknown_list($data = null)
    {
        require_once __DIR__ . '/entity/legacy_unknown_list_entity.php';
        if ($data === null) {
            if ($this->_legacy_unknown_list === null) {
                $this->_legacy_unknown_list = new LegacyUnknownListEntity($this, null);
            }
            return $this->_legacy_unknown_list;
        }
        return new LegacyUnknownListEntity($this, $data);
    }


    private $_legacy_user = null;

    // Idiomatic facade: $client->legacy_user()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias LegacyUser() (PHP method
    // names are case-insensitive).
    public function legacy_user($data = null)
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


    private $_legacy_user_list = null;

    // Idiomatic facade: $client->legacy_user_list()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias LegacyUserList() (PHP method
    // names are case-insensitive).
    public function legacy_user_list($data = null)
    {
        require_once __DIR__ . '/entity/legacy_user_list_entity.php';
        if ($data === null) {
            if ($this->_legacy_user_list === null) {
                $this->_legacy_user_list = new LegacyUserListEntity($this, null);
            }
            return $this->_legacy_user_list;
        }
        return new LegacyUserListEntity($this, $data);
    }


    private $_login = null;

    // Idiomatic facade: $client->login()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Login() (PHP method
    // names are case-insensitive).
    public function login($data = null)
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

    // Idiomatic facade: $client->register()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Register() (PHP method
    // names are case-insensitive).
    public function register($data = null)
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
