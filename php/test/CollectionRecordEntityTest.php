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
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HOSTEDREST_TEST_COLLECTION_RECORD_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $collection_record_ref01_ent = $client->CollectionRecord(null);
        $collection_record_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.collection_record"), "collection_record_ref01"));
        $collection_record_ref01_data["collection_id"] = $setup["idmap"]["collection01"];
        $collection_record_ref01_data["slug"] = $setup["idmap"]["slug01"];

        [$collection_record_ref01_data_result, $err] = $collection_record_ref01_ent->create($collection_record_ref01_data, null);
        $this->assertNull($err);
        $collection_record_ref01_data = Helpers::to_map($collection_record_ref01_data_result);
        $this->assertNotNull($collection_record_ref01_data);

        // UPDATE
        $collection_record_ref01_data_up0_up = [
            "collection_id" => $setup["idmap"]["collection_id"],
        ];

        [$collection_record_ref01_resdata_up0_result, $err] = $collection_record_ref01_ent->update($collection_record_ref01_data_up0_up, null);
        $this->assertNull($err);
        $collection_record_ref01_resdata_up0 = Helpers::to_map($collection_record_ref01_resdata_up0_result);
        $this->assertNotNull($collection_record_ref01_resdata_up0);

        // LOAD
        $collection_record_ref01_match_dt0 = [];
        [$collection_record_ref01_data_dt0_loaded, $err] = $collection_record_ref01_ent->load($collection_record_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($collection_record_ref01_data_dt0_loaded);

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
    $entid_env_raw = getenv("HOSTEDREST_TEST_COLLECTION_RECORD_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HOSTEDREST_TEST_COLLECTION_RECORD_ENTID" => $idmap,
        "HOSTEDREST_TEST_LIVE" => "FALSE",
        "HOSTEDREST_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HOSTEDREST_TEST_COLLECTION_RECORD_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["collection_id"])) {
        $idmap_resolved["collection_id"] = $idmap_resolved["collection01"];
    }

    if ($env["HOSTEDREST_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new HostedRestSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["HOSTEDREST_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["HOSTEDREST_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
