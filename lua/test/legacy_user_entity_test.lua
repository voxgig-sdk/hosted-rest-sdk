-- LegacyUser entity test

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


describe("LegacyUserEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:LegacyUser(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:LegacyUser(nil):load({ ["id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = legacy_user_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "legacy_user." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: " .. "the flow loads a legacy_user record it has no list to find")
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local legacy_user_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.legacy_user")))
    local legacy_user_ref01_data = nil
    if #legacy_user_ref01_data_raw > 0 then
      legacy_user_ref01_data = helpers.to_map(legacy_user_ref01_data_raw[1][2])
    end

    -- LOAD
    local legacy_user_ref01_ent = client:LegacyUser(nil)
    local legacy_user_ref01_match_dt0 = {
      id = legacy_user_ref01_data["id"],
    }
    local legacy_user_ref01_data_dt0_loaded, err = legacy_user_ref01_ent:load(legacy_user_ref01_match_dt0, nil)
    assert.is_nil(err)
    local legacy_user_ref01_data_dt0_load_result = helpers.to_map(type(legacy_user_ref01_data_dt0_loaded) == 'table' and legacy_user_ref01_data_dt0_loaded.data_get and legacy_user_ref01_data_dt0_loaded:data_get() or legacy_user_ref01_data_dt0_loaded)
    assert.is_not_nil(legacy_user_ref01_data_dt0_load_result)
    assert.are.equal(legacy_user_ref01_data_dt0_load_result["id"], legacy_user_ref01_data["id"])

  end)
end)

function legacy_user_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/legacy_user/LegacyUserTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read legacy_user test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "legacy_user01", "legacy_user02", "legacy_user03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("HOSTED_REST_TEST_LEGACY_USER_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HOSTED_REST_TEST_LEGACY_USER_ENTID"] = idmap,
    ["HOSTED_REST_TEST_LIVE"] = "FALSE",
    ["HOSTED_REST_TEST_EXPLAIN"] = "FALSE",
    ["HOSTED_REST_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["HOSTED_REST_TEST_LEGACY_USER_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
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
