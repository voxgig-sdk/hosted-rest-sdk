# LegacyUserList entity test

require "minitest/autorun"
require "json"
require_relative "../HostedRest_sdk"
require_relative "runner"

class LegacyUserListEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HostedRestSDK.test(nil, nil)
    ent = testsdk.LegacyUserList(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "legacy_user_list" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = HostedRestSDK.test(seed, nil)
    seen = base.LegacyUserList(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = HostedRestConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = HostedRestSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.LegacyUserList(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = legacy_user_list_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "legacy_user_list." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HOSTED_REST_TEST_LEGACY_USER_LIST_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    legacy_user_list_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.legacy_user_list")))
    legacy_user_list_ref01_data = nil
    if legacy_user_list_ref01_data_raw.length > 0
      legacy_user_list_ref01_data = Helpers.to_map(legacy_user_list_ref01_data_raw[0][1])
    end

    # LIST
    legacy_user_list_ref01_ent = client.LegacyUserList(nil)
    legacy_user_list_ref01_match = {}

    legacy_user_list_ref01_list_result = legacy_user_list_ref01_ent.list(legacy_user_list_ref01_match, nil)
    assert legacy_user_list_ref01_list_result.is_a?(Array)

  end
end

def legacy_user_list_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "legacy_user_list", "LegacyUserListTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HostedRestSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["legacy_user_list01", "legacy_user_list02", "legacy_user_list03"],
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
  entid_env_raw = ENV["HOSTED_REST_TEST_LEGACY_USER_LIST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HOSTED_REST_TEST_LEGACY_USER_LIST_ENTID" => idmap,
    "HOSTED_REST_TEST_LIVE" => "FALSE",
    "HOSTED_REST_TEST_EXPLAIN" => "FALSE",
    "HOSTED_REST_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["HOSTED_REST_TEST_LEGACY_USER_LIST_ENTID"])
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
