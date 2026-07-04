# AgentHealth entity test

require "minitest/autorun"
require "json"
require_relative "../HostedRest_sdk"
require_relative "runner"

class AgentHealthEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HostedRestSDK.test(nil, nil)
    ent = testsdk.AgentHealth(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = agent_health_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "agent_health." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HOSTEDREST_TEST_AGENT_HEALTH_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    agent_health_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.agent_health")))
    agent_health_ref01_data = nil
    if agent_health_ref01_data_raw.length > 0
      agent_health_ref01_data = Helpers.to_map(agent_health_ref01_data_raw[0][1])
    end

    # LOAD
    agent_health_ref01_ent = client.AgentHealth(nil)
    agent_health_ref01_match_dt0 = {}
    agent_health_ref01_data_dt0_loaded = agent_health_ref01_ent.load(agent_health_ref01_match_dt0, nil)
    assert !agent_health_ref01_data_dt0_loaded.nil?

  end
end

def agent_health_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "agent_health", "AgentHealthTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HostedRestSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["agent_health01", "agent_health02", "agent_health03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["HOSTEDREST_TEST_AGENT_HEALTH_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HOSTEDREST_TEST_AGENT_HEALTH_ENTID" => idmap,
    "HOSTEDREST_TEST_LIVE" => "FALSE",
    "HOSTEDREST_TEST_EXPLAIN" => "FALSE",
    "HOSTEDREST_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["HOSTEDREST_TEST_AGENT_HEALTH_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["HOSTEDREST_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["HOSTEDREST_APIKEY"],
      },
      extra || {},
    ])
    client = HostedRestSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["HOSTEDREST_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["HOSTEDREST_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
