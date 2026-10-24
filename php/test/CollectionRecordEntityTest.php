<?php
declare(strict_types=1);

// CollectionRecord entity test

require_once __DIR__ . '/../hostedrest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CollectionRecordEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = HostedRestSDK::test(null, null);
        $ent = $testsdk->CollectionRecord(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = HostedRestConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = HostedRestSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->CollectionRecord(null)->list(["slug" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = collection_record_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "collection_record." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"])) {
            foreach (["slug01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via HOSTED_REST_TEST_COLLECTION_RECORD_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // CREATE
        $collection_record_ref01_ent = $client->CollectionRecord(null);
        $collection_record_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.collection_record"), "collection_record_ref01"));
        $collection_record_ref01_data["slug"] = $setup["idmap"]["slug01"];

        $collection_record_ref01_data_result = $collection_record_ref01_ent->create($collection_record_ref01_data, null);
        $collection_record_ref01_data = Helpers::to_map(is_object($collection_record_ref01_data_result) && method_exists($collection_record_ref01_data_result, 'data_get') ? $collection_record_ref01_data_result->data_get() : $collection_record_ref01_data_result);
        $this->assertNotNull($collection_record_ref01_data);
        $this->assertNotNull($collection_record_ref01_data["id"]);

        // LIST
        $collection_record_ref01_match = [
            "slug" => $setup["idmap"]["slug01"],
        ];

        $collection_record_ref01_list_result = $collection_record_ref01_ent->list($collection_record_ref01_match, null);
        $this->assertIsArray($collection_record_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($collection_record_ref01_list_result),
            ["id" => $collection_record_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $collection_record_ref01_data_up0_up = [
            "id" => $collection_record_ref01_data["id"],
            "slug" => $setup["idmap"]["slug"],
        ];

        $collection_record_ref01_markdef_up0_name = "app_user_id";
        $collection_record_ref01_markdef_up0_value = "Mark01-collection_record_ref01_" . $setup["now"];
        $collection_record_ref01_data_up0_up[$collection_record_ref01_markdef_up0_name] = $collection_record_ref01_markdef_up0_value;

        $collection_record_ref01_resdata_up0_result = $collection_record_ref01_ent->update($collection_record_ref01_data_up0_up, null);
        $collection_record_ref01_resdata_up0 = Helpers::to_map(is_object($collection_record_ref01_resdata_up0_result) && method_exists($collection_record_ref01_resdata_up0_result, 'data_get') ? $collection_record_ref01_resdata_up0_result->data_get() : $collection_record_ref01_resdata_up0_result);
        $this->assertNotNull($collection_record_ref01_resdata_up0);
        $this->assertEquals($collection_record_ref01_resdata_up0["id"], $collection_record_ref01_data_up0_up["id"]);
        $this->assertEquals($collection_record_ref01_resdata_up0[$collection_record_ref01_markdef_up0_name], $collection_record_ref01_markdef_up0_value);

        // LOAD
        $collection_record_ref01_match_dt0 = [
            "id" => $collection_record_ref01_data["id"],
        ];
        $collection_record_ref01_match_dt0["slug"] = $setup["idmap"]["slug"] ?? $setup["idmap"]["slug01"] ?? null;
        $collection_record_ref01_data_dt0_loaded = $collection_record_ref01_ent->load($collection_record_ref01_match_dt0, null);
        $collection_record_ref01_data_dt0_load_result = Helpers::to_map(is_object($collection_record_ref01_data_dt0_loaded) && method_exists($collection_record_ref01_data_dt0_loaded, 'data_get') ? $collection_record_ref01_data_dt0_loaded->data_get() : $collection_record_ref01_data_dt0_loaded);
        $this->assertNotNull($collection_record_ref01_data_dt0_load_result);
        $this->assertEquals($collection_record_ref01_data_dt0_load_result["id"], $collection_record_ref01_data["id"]);

        // REMOVE
        $collection_record_ref01_match_rm0 = [
            "id" => $collection_record_ref01_data["id"],
        ];
        $collection_record_ref01_match_rm0["slug"] = $setup["idmap"]["slug"] ?? $setup["idmap"]["slug01"] ?? null;
        $collection_record_ref01_ent->remove($collection_record_ref01_match_rm0, null);

        // LIST
        $collection_record_ref01_match_rt0 = [
            "slug" => $setup["idmap"]["slug01"],
        ];

        $collection_record_ref01_list_rt0_result = $collection_record_ref01_ent->list($collection_record_ref01_match_rt0, null);
        $this->assertIsArray($collection_record_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($collection_record_ref01_list_rt0_result),
            ["id" => $collection_record_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function collection_record_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/collection_record/CollectionRecordTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = HostedRestSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["collection_record01", "collection_record02", "collection_record03", "collection01", "collection02", "collection03", "slug01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("HOSTED_REST_TEST_COLLECTION_RECORD_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HOSTED_REST_TEST_COLLECTION_RECORD_ENTID" => $idmap,
        "HOSTED_REST_TEST_LIVE" => "FALSE",
        "HOSTED_REST_TEST_EXPLAIN" => "FALSE",
        "HOSTED_REST_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HOSTED_REST_TEST_COLLECTION_RECORD_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["slug"])) {
        $idmap_resolved["slug"] = $idmap_resolved["slug01"];
    }

    if ($env["HOSTED_REST_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["HOSTED_REST_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new HostedRestSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["HOSTED_REST_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["HOSTED_REST_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
