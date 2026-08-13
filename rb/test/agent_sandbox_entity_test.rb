# AgentSandbox entity test

require "minitest/autorun"
require "json"
require_relative "../HostedRest_sdk"
require_relative "runner"

class AgentSandboxEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HostedRestSDK.test(nil, nil)
    ent = testsdk.AgentSandbox(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = agent_sandbox_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "agent_sandbox." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HOSTED_REST_TEST_AGENT_SANDBOX_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    agent_sandbox_ref01_ent = client.AgentSandbox(nil)
    agent_sandbox_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.agent_sandbox"), "agent_sandbox_ref01"))

    agent_sandbox_ref01_data_result = agent_sandbox_ref01_ent.create(agent_sandbox_ref01_data, nil)
    agent_sandbox_ref01_data = Helpers.to_map(agent_sandbox_ref01_data_result.respond_to?(:data_get) ? agent_sandbox_ref01_data_result.data_get : agent_sandbox_ref01_data_result)
    assert !agent_sandbox_ref01_data.nil?

    # LOAD
    agent_sandbox_ref01_match_dt0 = {}
    agent_sandbox_ref01_data_dt0_loaded = agent_sandbox_ref01_ent.load(agent_sandbox_ref01_match_dt0, nil)
    assert !agent_sandbox_ref01_data_dt0_loaded.nil?

  end
end

def agent_sandbox_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "agent_sandbox", "AgentSandboxTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HostedRestSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["agent_sandbox01", "agent_sandbox02", "agent_sandbox03", "scenario01", "scenario02", "scenario03"],
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
  entid_env_raw = ENV["HOSTED_REST_TEST_AGENT_SANDBOX_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HOSTED_REST_TEST_AGENT_SANDBOX_ENTID" => idmap,
    "HOSTED_REST_TEST_LIVE" => "FALSE",
    "HOSTED_REST_TEST_EXPLAIN" => "FALSE",
    "HOSTED_REST_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["HOSTED_REST_TEST_AGENT_SANDBOX_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["HOSTED_REST_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["HOSTED_REST_APIKEY"],
      },
      extra || {},
    ])
    client = HostedRestSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["HOSTED_REST_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["HOSTED_REST_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
