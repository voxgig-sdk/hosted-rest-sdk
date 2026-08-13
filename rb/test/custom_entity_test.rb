# Custom entity test

require "minitest/autorun"
require "json"
require_relative "../HostedRest_sdk"
require_relative "runner"

class CustomEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HostedRestSDK.test(nil, nil)
    ent = testsdk.Custom(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = custom_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "custom." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HOSTED_REST_TEST_CUSTOM_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    custom_ref01_ent = client.Custom(nil)
    custom_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.custom"), "custom_ref01"))
    custom_ref01_data["path"] = setup[:idmap]["path01"]

    custom_ref01_data_result = custom_ref01_ent.create(custom_ref01_data, nil)
    custom_ref01_data = Helpers.to_map(custom_ref01_data_result.respond_to?(:data_get) ? custom_ref01_data_result.data_get : custom_ref01_data_result)
    assert !custom_ref01_data.nil?

    # UPDATE
    custom_ref01_data_up0_up = {
    }

    custom_ref01_resdata_up0_result = custom_ref01_ent.update(custom_ref01_data_up0_up, nil)
    custom_ref01_resdata_up0 = Helpers.to_map(custom_ref01_resdata_up0_result.respond_to?(:data_get) ? custom_ref01_resdata_up0_result.data_get : custom_ref01_resdata_up0_result)
    assert !custom_ref01_resdata_up0.nil?

    # LOAD
    custom_ref01_match_dt0 = {}
    custom_ref01_data_dt0_loaded = custom_ref01_ent.load(custom_ref01_match_dt0, nil)
    assert !custom_ref01_data_dt0_loaded.nil?


  end
end

def custom_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "custom", "CustomTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HostedRestSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["custom01", "custom02", "custom03", "path01"],
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
  entid_env_raw = ENV["HOSTED_REST_TEST_CUSTOM_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HOSTED_REST_TEST_CUSTOM_ENTID" => idmap,
    "HOSTED_REST_TEST_LIVE" => "FALSE",
    "HOSTED_REST_TEST_EXPLAIN" => "FALSE",
    "HOSTED_REST_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["HOSTED_REST_TEST_CUSTOM_ENTID"])
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
