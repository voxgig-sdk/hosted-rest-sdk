-- Collection entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("hosted-rest_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("CollectionEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Collection(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = collection_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "collection." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set HOSTEDREST_TEST_COLLECTION_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local collection_ref01_ent = client:Collection(nil)
    local collection_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.collection"), "collection_ref01"))
    collection_ref01_data["collection_id"] = setup.idmap["collection01"]

    local collection_ref01_data_result, err = collection_ref01_ent:create(collection_ref01_data, nil)
    assert.is_nil(err)
    collection_ref01_data = helpers.to_map(collection_ref01_data_result)
    assert.is_not_nil(collection_ref01_data)
    assert.is_not_nil(collection_ref01_data["id"])

    -- LIST
    local collection_ref01_match = {}

    local collection_ref01_list_result, err = collection_ref01_ent:list(collection_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(collection_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(collection_ref01_list_result),
      { id = collection_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- UPDATE
    local collection_ref01_data_up0_up = {
      id = collection_ref01_data["id"],
    }

    local collection_ref01_markdef_up0_name = "created_at"
    local collection_ref01_markdef_up0_value = "Mark01-collection_ref01_" .. tostring(setup.now)
    collection_ref01_data_up0_up[collection_ref01_markdef_up0_name] = collection_ref01_markdef_up0_value

    local collection_ref01_resdata_up0_result, err = collection_ref01_ent:update(collection_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local collection_ref01_resdata_up0 = helpers.to_map(collection_ref01_resdata_up0_result)
    assert.is_not_nil(collection_ref01_resdata_up0)
    assert.are.equal(collection_ref01_resdata_up0["id"], collection_ref01_data_up0_up["id"])
    assert.are.equal(collection_ref01_resdata_up0[collection_ref01_markdef_up0_name], collection_ref01_markdef_up0_value)

    -- LOAD
    local collection_ref01_match_dt0 = {
      id = collection_ref01_data["id"],
    }
    local collection_ref01_data_dt0_loaded, err = collection_ref01_ent:load(collection_ref01_match_dt0, nil)
    assert.is_nil(err)
    local collection_ref01_data_dt0_load_result = helpers.to_map(collection_ref01_data_dt0_loaded)
    assert.is_not_nil(collection_ref01_data_dt0_load_result)
    assert.are.equal(collection_ref01_data_dt0_load_result["id"], collection_ref01_data["id"])

    -- REMOVE
    local collection_ref01_match_rm0 = {
      id = collection_ref01_data["id"],
    }
    local _, err = collection_ref01_ent:remove(collection_ref01_match_rm0, nil)
    assert.is_nil(err)

    -- LIST
    local collection_ref01_match_rt0 = {}

    local collection_ref01_list_rt0_result, err = collection_ref01_ent:list(collection_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(collection_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(collection_ref01_list_rt0_result),
      { id = collection_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function collection_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/collection/CollectionTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read collection test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "collection01", "collection02", "collection03", "record01", "record02", "record03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("HOSTEDREST_TEST_COLLECTION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HOSTEDREST_TEST_COLLECTION_ENTID"] = idmap,
    ["HOSTEDREST_TEST_LIVE"] = "FALSE",
    ["HOSTEDREST_TEST_EXPLAIN"] = "FALSE",
    ["HOSTEDREST_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["HOSTEDREST_TEST_COLLECTION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["HOSTEDREST_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["HOSTEDREST_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["HOSTEDREST_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["HOSTEDREST_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
