-- CollectionRecord entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("hosted-rest_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("CollectionRecordEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:CollectionRecord(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:CollectionRecord(nil):list({ ["slug"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = collection_record_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "collection_record." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _, _live_key in ipairs({"slug01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via HOSTED_REST_TEST_COLLECTION_RECORD_ENTID")
        end
      end
    end
    local client = setup.client

    -- CREATE
    local collection_record_ref01_ent = client:CollectionRecord(nil)
    local collection_record_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.collection_record"), "collection_record_ref01"))
    collection_record_ref01_data["slug"] = setup.idmap["slug01"]

    local collection_record_ref01_data_result, err = collection_record_ref01_ent:create(collection_record_ref01_data, nil)
    assert.is_nil(err)
    collection_record_ref01_data = helpers.to_map(type(collection_record_ref01_data_result) == 'table' and collection_record_ref01_data_result.data_get and collection_record_ref01_data_result:data_get() or collection_record_ref01_data_result)
    assert.is_not_nil(collection_record_ref01_data)
    assert.is_not_nil(collection_record_ref01_data["id"])

    -- LIST
    local collection_record_ref01_match = {
      ["slug"] = setup.idmap["slug01"],
    }

    local collection_record_ref01_list_result, err = collection_record_ref01_ent:list(collection_record_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(collection_record_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(collection_record_ref01_list_result),
      { id = collection_record_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- UPDATE
    local collection_record_ref01_data_up0_up = {
      id = collection_record_ref01_data["id"],
      ["slug"] = setup.idmap["slug"],
    }

    local collection_record_ref01_markdef_up0_name = "app_user_id"
    local collection_record_ref01_markdef_up0_value = "Mark01-collection_record_ref01_" .. tostring(setup.now)
    collection_record_ref01_data_up0_up[collection_record_ref01_markdef_up0_name] = collection_record_ref01_markdef_up0_value

    local collection_record_ref01_resdata_up0_result, err = collection_record_ref01_ent:update(collection_record_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local collection_record_ref01_resdata_up0 = helpers.to_map(type(collection_record_ref01_resdata_up0_result) == 'table' and collection_record_ref01_resdata_up0_result.data_get and collection_record_ref01_resdata_up0_result:data_get() or collection_record_ref01_resdata_up0_result)
    assert.is_not_nil(collection_record_ref01_resdata_up0)
    assert.are.equal(collection_record_ref01_resdata_up0["id"], collection_record_ref01_data_up0_up["id"])
    assert.are.equal(collection_record_ref01_resdata_up0[collection_record_ref01_markdef_up0_name], collection_record_ref01_markdef_up0_value)

    -- LOAD
    local collection_record_ref01_match_dt0 = {
      id = collection_record_ref01_data["id"],
    }
    collection_record_ref01_match_dt0["slug"] = setup.idmap["slug"] or setup.idmap["slug01"]
    local collection_record_ref01_data_dt0_loaded, err = collection_record_ref01_ent:load(collection_record_ref01_match_dt0, nil)
    assert.is_nil(err)
    local collection_record_ref01_data_dt0_load_result = helpers.to_map(type(collection_record_ref01_data_dt0_loaded) == 'table' and collection_record_ref01_data_dt0_loaded.data_get and collection_record_ref01_data_dt0_loaded:data_get() or collection_record_ref01_data_dt0_loaded)
    assert.is_not_nil(collection_record_ref01_data_dt0_load_result)
    assert.are.equal(collection_record_ref01_data_dt0_load_result["id"], collection_record_ref01_data["id"])

    -- REMOVE
    local collection_record_ref01_match_rm0 = {
      id = collection_record_ref01_data["id"],
    }
    collection_record_ref01_match_rm0["slug"] = setup.idmap["slug"] or setup.idmap["slug01"]
    local _, err = collection_record_ref01_ent:remove(collection_record_ref01_match_rm0, nil)
    assert.is_nil(err)

    -- LIST
    local collection_record_ref01_match_rt0 = {
      ["slug"] = setup.idmap["slug01"],
    }

    local collection_record_ref01_list_rt0_result, err = collection_record_ref01_ent:list(collection_record_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(collection_record_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(collection_record_ref01_list_rt0_result),
      { id = collection_record_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function collection_record_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/collection_record/CollectionRecordTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read collection_record test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "collection_record01", "collection_record02", "collection_record03", "collection01", "collection02", "collection03", "slug01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("HOSTED_REST_TEST_COLLECTION_RECORD_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HOSTED_REST_TEST_COLLECTION_RECORD_ENTID"] = idmap,
    ["HOSTED_REST_TEST_LIVE"] = "FALSE",
    ["HOSTED_REST_TEST_EXPLAIN"] = "FALSE",
    ["HOSTED_REST_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["HOSTED_REST_TEST_COLLECTION_RECORD_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["slug"] == nil then
    idmap_resolved["slug"] = idmap_resolved["slug01"]
  end

  if env["HOSTED_REST_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["HOSTED_REST_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["HOSTED_REST_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["HOSTED_REST_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
