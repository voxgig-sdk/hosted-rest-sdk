# CollectionRecord entity test

require "minitest/autorun"
require "json"
require_relative "../HostedRest_sdk"
require_relative "runner"

class CollectionRecordEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HostedRestSDK.test(nil, nil)
    ent = testsdk.CollectionRecord(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = collection_record_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "collection_record." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HOSTEDREST_TEST_COLLECTION_RECORD_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    collection_record_ref01_ent = client.CollectionRecord(nil)
    collection_record_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.collection_record"), "collection_record_ref01"))
    collection_record_ref01_data["collection_id"] = setup[:idmap]["collection01"]
    collection_record_ref01_data["slug"] = setup[:idmap]["slug01"]

    collection_record_ref01_data_result = collection_record_ref01_ent.create(collection_record_ref01_data, nil)
    collection_record_ref01_data = Helpers.to_map(collection_record_ref01_data_result)
    assert !collection_record_ref01_data.nil?

    # UPDATE
    collection_record_ref01_data_up0_up = {
      "collection_id" => setup[:idmap]["collection_id"],
    }

    collection_record_ref01_resdata_up0_result = collection_record_ref01_ent.update(collection_record_ref01_data_up0_up, nil)
    collection_record_ref01_resdata_up0 = Helpers.to_map(collection_record_ref01_resdata_up0_result)
    assert !collection_record_ref01_resdata_up0.nil?

    # LOAD
    collection_record_ref01_match_dt0 = {}
    collection_record_ref01_data_dt0_loaded = collection_record_ref01_ent.load(collection_record_ref01_match_dt0, nil)
    assert !collection_record_ref01_data_dt0_loaded.nil?

  end
end

def collection_record_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "collection_record", "CollectionRecordTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HostedRestSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["collection_record01", "collection_record02", "collection_record03", "collection01", "collection02", "collection03", "slug01"],
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
  entid_env_raw = ENV["HOSTEDREST_TEST_COLLECTION_RECORD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HOSTEDREST_TEST_COLLECTION_RECORD_ENTID" => idmap,
    "HOSTEDREST_TEST_LIVE" => "FALSE",
    "HOSTEDREST_TEST_EXPLAIN" => "FALSE",
    "HOSTEDREST_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["HOSTEDREST_TEST_COLLECTION_RECORD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["collection_id"].nil?
    idmap_resolved["collection_id"] = idmap_resolved["collection01"]
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
