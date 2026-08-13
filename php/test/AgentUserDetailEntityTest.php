<?php
declare(strict_types=1);

// AgentUserDetail entity test

require_once __DIR__ . '/../hostedrest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AgentUserDetailEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = HostedRestSDK::test(null, null);
        $ent = $testsdk->AgentUserDetail(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = agent_user_detail_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "agent_user_detail." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HOSTED_REST_TEST_AGENT_USER_DETAIL_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $agent_user_detail_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.agent_user_detail")));
        $agent_user_detail_ref01_data = null;
        if (count($agent_user_detail_ref01_data_raw) > 0) {
            $agent_user_detail_ref01_data = Helpers::to_map($agent_user_detail_ref01_data_raw[0][1]);
        }

        // LOAD
        $agent_user_detail_ref01_ent = $client->AgentUserDetail(null);
        $agent_user_detail_ref01_match_dt0 = [
            "id" => $agent_user_detail_ref01_data["id"],
        ];
        $agent_user_detail_ref01_data_dt0_loaded = $agent_user_detail_ref01_ent->load($agent_user_detail_ref01_match_dt0, null);
        $agent_user_detail_ref01_data_dt0_load_result = Helpers::to_map(is_object($agent_user_detail_ref01_data_dt0_loaded) && method_exists($agent_user_detail_ref01_data_dt0_loaded, 'data_get') ? $agent_user_detail_ref01_data_dt0_loaded->data_get() : $agent_user_detail_ref01_data_dt0_loaded);
        $this->assertNotNull($agent_user_detail_ref01_data_dt0_load_result);
        $this->assertEquals($agent_user_detail_ref01_data_dt0_load_result["id"], $agent_user_detail_ref01_data["id"]);

    }
}

function agent_user_detail_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/agent_user_detail/AgentUserDetailTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = HostedRestSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["agent_user_detail01", "agent_user_detail02", "agent_user_detail03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HOSTED_REST_TEST_AGENT_USER_DETAIL_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HOSTED_REST_TEST_AGENT_USER_DETAIL_ENTID" => $idmap,
        "HOSTED_REST_TEST_LIVE" => "FALSE",
        "HOSTED_REST_TEST_EXPLAIN" => "FALSE",
        "HOSTED_REST_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HOSTED_REST_TEST_AGENT_USER_DETAIL_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
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
