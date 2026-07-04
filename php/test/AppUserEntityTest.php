<?php
declare(strict_types=1);

// AppUser entity test

require_once __DIR__ . '/../hostedrest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AppUserEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = HostedRestSDK::test(null, null);
        $ent = $testsdk->AppUser(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = app_user_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "app_user." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HOSTEDREST_TEST_APP_USER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $app_user_ref01_ent = $client->AppUser(null);
        $app_user_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.app_user"), "app_user_ref01"));
        $app_user_ref01_data["collection_id"] = $setup["idmap"]["collection01"];
        $app_user_ref01_data["project_id"] = $setup["idmap"]["project01"];

        $app_user_ref01_data_result = $app_user_ref01_ent->create($app_user_ref01_data, null);
        $app_user_ref01_data = Helpers::to_map($app_user_ref01_data_result);
        $this->assertNotNull($app_user_ref01_data);
        $this->assertNotNull($app_user_ref01_data["id"]);

        // LIST
        $app_user_ref01_match = [];

        $app_user_ref01_list_result = $app_user_ref01_ent->list($app_user_ref01_match, null);
        $this->assertIsArray($app_user_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($app_user_ref01_list_result),
            ["id" => $app_user_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $app_user_ref01_data_up0_up = [
            "id" => $app_user_ref01_data["id"],
        ];

        $app_user_ref01_markdef_up0_name = "created_at";
        $app_user_ref01_markdef_up0_value = "Mark01-app_user_ref01_" . $setup["now"];
        $app_user_ref01_data_up0_up[$app_user_ref01_markdef_up0_name] = $app_user_ref01_markdef_up0_value;

        $app_user_ref01_resdata_up0_result = $app_user_ref01_ent->update($app_user_ref01_data_up0_up, null);
        $app_user_ref01_resdata_up0 = Helpers::to_map($app_user_ref01_resdata_up0_result);
        $this->assertNotNull($app_user_ref01_resdata_up0);
        $this->assertEquals($app_user_ref01_resdata_up0["id"], $app_user_ref01_data_up0_up["id"]);
        $this->assertEquals($app_user_ref01_resdata_up0[$app_user_ref01_markdef_up0_name], $app_user_ref01_markdef_up0_value);

        // LOAD
        $app_user_ref01_match_dt0 = [
            "id" => $app_user_ref01_data["id"],
        ];
        $app_user_ref01_data_dt0_loaded = $app_user_ref01_ent->load($app_user_ref01_match_dt0, null);
        $app_user_ref01_data_dt0_load_result = Helpers::to_map($app_user_ref01_data_dt0_loaded);
        $this->assertNotNull($app_user_ref01_data_dt0_load_result);
        $this->assertEquals($app_user_ref01_data_dt0_load_result["id"], $app_user_ref01_data["id"]);

        // REMOVE
        $app_user_ref01_match_rm0 = [
            "id" => $app_user_ref01_data["id"],
        ];
        $app_user_ref01_ent->remove($app_user_ref01_match_rm0, null);

        // LIST
        $app_user_ref01_match_rt0 = [];

        $app_user_ref01_list_rt0_result = $app_user_ref01_ent->list($app_user_ref01_match_rt0, null);
        $this->assertIsArray($app_user_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($app_user_ref01_list_rt0_result),
            ["id" => $app_user_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function app_user_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/app_user/AppUserTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = HostedRestSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["app_user01", "app_user02", "app_user03", "project01", "project02", "project03", "collection01", "collection02", "collection03", "record01", "record02", "record03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HOSTEDREST_TEST_APP_USER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HOSTEDREST_TEST_APP_USER_ENTID" => $idmap,
        "HOSTEDREST_TEST_LIVE" => "FALSE",
        "HOSTEDREST_TEST_EXPLAIN" => "FALSE",
        "HOSTEDREST_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HOSTEDREST_TEST_APP_USER_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["HOSTEDREST_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["HOSTEDREST_APIKEY"],
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
