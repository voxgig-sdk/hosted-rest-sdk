<?php
declare(strict_types=1);

// CollectionRecord entity test

require_once __DIR__ . '/../hostedrest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CollectionRecordEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = HostedRestSDK::test(null, null);
        $ent = $testsdk->CollectionRecord(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = collection_record_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "update", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "collection_record." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HOSTED_REST_TEST_COLLECTION_RECORD_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $collection_record_ref01_ent = $client->CollectionRecord(null);
        $collection_record_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.collection_record"), "collection_record_ref01"));
        $collection_record_ref01_data["collection_id"] = $setup["idmap"]["collection01"];
        $collection_record_ref01_data["slug"] = $setup["idmap"]["slug01"];

        $collection_record_ref01_data_result = $collection_record_ref01_ent->create($collection_record_ref01_data, null);
        $collection_record_ref01_data = Helpers::to_map(is_object($collection_record_ref01_data_result) && method_exists($collection_record_ref01_data_result, 'data_get') ? $collection_record_ref01_data_result->data_get() : $collection_record_ref01_data_result);
        $this->assertNotNull($collection_record_ref01_data);
        $this->assertNotNull($collection_record_ref01_data["id"]);

        // UPDATE
        $collection_record_ref01_data_up0_up = [
            "id" => $collection_record_ref01_data["id"],
            "collection_id" => $setup["idmap"]["collection_id"],
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
        $collection_record_ref01_data_dt0_loaded = $collection_record_ref01_ent->load($collection_record_ref01_match_dt0, null);
        $collection_record_ref01_data_dt0_load_result = Helpers::to_map(is_object($collection_record_ref01_data_dt0_loaded) && method_exists($collection_record_ref01_data_dt0_loaded, 'data_get') ? $collection_record_ref01_data_dt0_loaded->data_get() : $collection_record_ref01_data_dt0_loaded);
        $this->assertNotNull($collection_record_ref01_data_dt0_load_result);
        $this->assertEquals($collection_record_ref01_data_dt0_load_result["id"], $collection_record_ref01_data["id"]);

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

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HOSTED_REST_TEST_COLLECTION_RECORD_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HOSTED_REST_TEST_COLLECTION_RECORD_ENTID" => $idmap,
        "HOSTED_REST_TEST_LIVE" => "FALSE",
        "HOSTED_REST_TEST_EXPLAIN" => "FALSE",
        "HOSTED_REST_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HOSTED_REST_TEST_COLLECTION_RECORD_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["collection_id"])) {
        $idmap_resolved["collection_id"] = $idmap_resolved["collection01"];
    }

    if ($env["HOSTED_REST_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["HOSTED_REST_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new HostedRestSDK(Helpers::to_map($merged_opts));
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
