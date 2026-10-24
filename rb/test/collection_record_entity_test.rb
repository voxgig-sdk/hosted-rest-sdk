# CollectionRecord entity test

require "minitest/autorun"
require "json"
require_relative "../HostedRest_sdk"
require_relative "runner"

class CollectionRecordEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = HostedRestSDK.test(nil, nil)
    ent = testsdk.CollectionRecord(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = HostedRestConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = HostedRestSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.CollectionRecord(nil).list({ "slug" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = collection_record_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "collection_record." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["slug01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via HOSTED_REST_TEST_COLLECTION_RECORD_ENTID")
        end
      end
    end
    client = setup[:client]

    # CREATE
    collection_record_ref01_ent = client.CollectionRecord(nil)
    collection_record_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.collection_record"), "collection_record_ref01"))
    collection_record_ref01_data["slug"] = setup[:idmap]["slug01"]

    collection_record_ref01_data_result = collection_record_ref01_ent.create(collection_record_ref01_data, nil)
    collection_record_ref01_data = Helpers.to_map(collection_record_ref01_data_result.respond_to?(:data_get) ? collection_record_ref01_data_result.data_get : collection_record_ref01_data_result)
    assert !collection_record_ref01_data.nil?
    assert !collection_record_ref01_data["id"].nil?

    # LIST
    collection_record_ref01_match = {
      "slug" => setup[:idmap]["slug01"],
    }

    collection_record_ref01_list_result = collection_record_ref01_ent.list(collection_record_ref01_match, nil)
    assert collection_record_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(collection_record_ref01_list_result),
      { "id" => collection_record_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    collection_record_ref01_data_up0_up = {
      "id" => collection_record_ref01_data["id"],
      "slug" => setup[:idmap]["slug"],
    }

    collection_record_ref01_markdef_up0_name = "app_user_id"
    collection_record_ref01_markdef_up0_value = "Mark01-collection_record_ref01_#{setup[:now]}"
    collection_record_ref01_data_up0_up[collection_record_ref01_markdef_up0_name] = collection_record_ref01_markdef_up0_value

    collection_record_ref01_resdata_up0_result = collection_record_ref01_ent.update(collection_record_ref01_data_up0_up, nil)
    collection_record_ref01_resdata_up0 = Helpers.to_map(collection_record_ref01_resdata_up0_result.respond_to?(:data_get) ? collection_record_ref01_resdata_up0_result.data_get : collection_record_ref01_resdata_up0_result)
    assert !collection_record_ref01_resdata_up0.nil?
    assert_equal collection_record_ref01_resdata_up0["id"], collection_record_ref01_data_up0_up["id"]
    assert_equal collection_record_ref01_resdata_up0[collection_record_ref01_markdef_up0_name], collection_record_ref01_markdef_up0_value

    # LOAD
    collection_record_ref01_match_dt0 = {
      "id" => collection_record_ref01_data["id"],
    }
    collection_record_ref01_match_dt0["slug"] = setup[:idmap]["slug"] || setup[:idmap]["slug01"]
    collection_record_ref01_data_dt0_loaded = collection_record_ref01_ent.load(collection_record_ref01_match_dt0, nil)
    collection_record_ref01_data_dt0_load_result = Helpers.to_map(collection_record_ref01_data_dt0_loaded.respond_to?(:data_get) ? collection_record_ref01_data_dt0_loaded.data_get : collection_record_ref01_data_dt0_loaded)
    assert !collection_record_ref01_data_dt0_load_result.nil?
    assert_equal collection_record_ref01_data_dt0_load_result["id"], collection_record_ref01_data["id"]

    # REMOVE
    collection_record_ref01_match_rm0 = {
      "id" => collection_record_ref01_data["id"],
    }
    collection_record_ref01_match_rm0["slug"] = setup[:idmap]["slug"] || setup[:idmap]["slug01"]
    collection_record_ref01_ent.remove(collection_record_ref01_match_rm0, nil)

    # LIST
    collection_record_ref01_match_rt0 = {
      "slug" => setup[:idmap]["slug01"],
    }

    collection_record_ref01_list_rt0_result = collection_record_ref01_ent.list(collection_record_ref01_match_rt0, nil)
    assert collection_record_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(collection_record_ref01_list_rt0_result),
      { "id" => collection_record_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def collection_record_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "collection_record", "CollectionRecordTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
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

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["HOSTED_REST_TEST_COLLECTION_RECORD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HOSTED_REST_TEST_COLLECTION_RECORD_ENTID" => idmap,
    "HOSTED_REST_TEST_LIVE" => "FALSE",
    "HOSTED_REST_TEST_EXPLAIN" => "FALSE",
    "HOSTED_REST_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["HOSTED_REST_TEST_COLLECTION_RECORD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["slug"].nil?
    idmap_resolved["slug"] = idmap_resolved["slug01"]
  end

  if env["HOSTED_REST_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
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
