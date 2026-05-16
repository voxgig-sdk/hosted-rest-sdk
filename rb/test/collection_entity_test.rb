# Collection entity test

require "minitest/autorun"
require "json"
require_relative "../HostedRest_sdk"
require_relative "runner"

class CollectionEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HostedRestSDK.test(nil, nil)
    ent = testsdk.Collection(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = collection_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "collection." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HOSTEDREST_TEST_COLLECTION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    collection_ref01_ent = client.Collection(nil)
    collection_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.collection"), "collection_ref01"))
    collection_ref01_data["collection_id"] = setup[:idmap]["collection01"]

    collection_ref01_data_result, err = collection_ref01_ent.create(collection_ref01_data, nil)
    assert_nil err
    collection_ref01_data = Helpers.to_map(collection_ref01_data_result)
    assert !collection_ref01_data.nil?
    assert !collection_ref01_data["id"].nil?

    # LIST
    collection_ref01_match = {}

    collection_ref01_list_result, err = collection_ref01_ent.list(collection_ref01_match, nil)
    assert_nil err
    assert collection_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(collection_ref01_list_result),
      { "id" => collection_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    collection_ref01_data_up0_up = {
      "id" => collection_ref01_data["id"],
    }

    collection_ref01_markdef_up0_name = "created_at"
    collection_ref01_markdef_up0_value = "Mark01-collection_ref01_#{setup[:now]}"
    collection_ref01_data_up0_up[collection_ref01_markdef_up0_name] = collection_ref01_markdef_up0_value

    collection_ref01_resdata_up0_result, err = collection_ref01_ent.update(collection_ref01_data_up0_up, nil)
    assert_nil err
    collection_ref01_resdata_up0 = Helpers.to_map(collection_ref01_resdata_up0_result)
    assert !collection_ref01_resdata_up0.nil?
    assert_equal collection_ref01_resdata_up0["id"], collection_ref01_data_up0_up["id"]
    assert_equal collection_ref01_resdata_up0[collection_ref01_markdef_up0_name], collection_ref01_markdef_up0_value

    # LOAD
    collection_ref01_match_dt0 = {
      "id" => collection_ref01_data["id"],
    }
    collection_ref01_data_dt0_loaded, err = collection_ref01_ent.load(collection_ref01_match_dt0, nil)
    assert_nil err
    collection_ref01_data_dt0_load_result = Helpers.to_map(collection_ref01_data_dt0_loaded)
    assert !collection_ref01_data_dt0_load_result.nil?
    assert_equal collection_ref01_data_dt0_load_result["id"], collection_ref01_data["id"]

    # REMOVE
    collection_ref01_match_rm0 = {
      "id" => collection_ref01_data["id"],
    }
    _, err = collection_ref01_ent.remove(collection_ref01_match_rm0, nil)
    assert_nil err

    # LIST
    collection_ref01_match_rt0 = {}

    collection_ref01_list_rt0_result, err = collection_ref01_ent.list(collection_ref01_match_rt0, nil)
    assert_nil err
    assert collection_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(collection_ref01_list_rt0_result),
      { "id" => collection_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def collection_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "collection", "CollectionTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HostedRestSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["collection01", "collection02", "collection03", "record01", "record02", "record03"],
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
  entid_env_raw = ENV["HOSTEDREST_TEST_COLLECTION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HOSTEDREST_TEST_COLLECTION_ENTID" => idmap,
    "HOSTEDREST_TEST_LIVE" => "FALSE",
    "HOSTEDREST_TEST_EXPLAIN" => "FALSE",
    "HOSTEDREST_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["HOSTEDREST_TEST_COLLECTION_ENTID"])
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
