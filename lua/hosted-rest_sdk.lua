-- HostedRest SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local HostedRestSDK = {}
HostedRestSDK.__index = HostedRestSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

HostedRestSDK._make_feature = _make_feature


function HostedRestSDK.new(options)
  local self = setmetatable({}, HostedRestSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function HostedRestSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function HostedRestSDK:get_utility()
  return Utility.copy(self._utility)
end


function HostedRestSDK:get_root_ctx()
  return self._rootctx
end


function HostedRestSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function HostedRestSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:agent_health():list() / client:agent_health():load({ id = ... })
function HostedRestSDK:agent_health(data)
  local EntityMod = require("entity.agent_health_entity")
  if data == nil then
    if self._agent_health == nil then
      self._agent_health = EntityMod.new(self, nil)
    end
    return self._agent_health
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:agent_health() instead.
function HostedRestSDK:AgentHealth(data)
  local EntityMod = require("entity.agent_health_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:agent_sandbox():list() / client:agent_sandbox():load({ id = ... })
function HostedRestSDK:agent_sandbox(data)
  local EntityMod = require("entity.agent_sandbox_entity")
  if data == nil then
    if self._agent_sandbox == nil then
      self._agent_sandbox = EntityMod.new(self, nil)
    end
    return self._agent_sandbox
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:agent_sandbox() instead.
function HostedRestSDK:AgentSandbox(data)
  local EntityMod = require("entity.agent_sandbox_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:agent_user_detail():list() / client:agent_user_detail():load({ id = ... })
function HostedRestSDK:agent_user_detail(data)
  local EntityMod = require("entity.agent_user_detail_entity")
  if data == nil then
    if self._agent_user_detail == nil then
      self._agent_user_detail = EntityMod.new(self, nil)
    end
    return self._agent_user_detail
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:agent_user_detail() instead.
function HostedRestSDK:AgentUserDetail(data)
  local EntityMod = require("entity.agent_user_detail_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:agent_user_list():list() / client:agent_user_list():load({ id = ... })
function HostedRestSDK:agent_user_list(data)
  local EntityMod = require("entity.agent_user_list_entity")
  if data == nil then
    if self._agent_user_list == nil then
      self._agent_user_list = EntityMod.new(self, nil)
    end
    return self._agent_user_list
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:agent_user_list() instead.
function HostedRestSDK:AgentUserList(data)
  local EntityMod = require("entity.agent_user_list_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:app_user():list() / client:app_user():load({ id = ... })
function HostedRestSDK:app_user(data)
  local EntityMod = require("entity.app_user_entity")
  if data == nil then
    if self._app_user == nil then
      self._app_user = EntityMod.new(self, nil)
    end
    return self._app_user
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:app_user() instead.
function HostedRestSDK:AppUser(data)
  local EntityMod = require("entity.app_user_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:app_user_login():list() / client:app_user_login():load({ id = ... })
function HostedRestSDK:app_user_login(data)
  local EntityMod = require("entity.app_user_login_entity")
  if data == nil then
    if self._app_user_login == nil then
      self._app_user_login = EntityMod.new(self, nil)
    end
    return self._app_user_login
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:app_user_login() instead.
function HostedRestSDK:AppUserLogin(data)
  local EntityMod = require("entity.app_user_login_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:app_user_session():list() / client:app_user_session():load({ id = ... })
function HostedRestSDK:app_user_session(data)
  local EntityMod = require("entity.app_user_session_entity")
  if data == nil then
    if self._app_user_session == nil then
      self._app_user_session = EntityMod.new(self, nil)
    end
    return self._app_user_session
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:app_user_session() instead.
function HostedRestSDK:AppUserSession(data)
  local EntityMod = require("entity.app_user_session_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:app_user_total():list() / client:app_user_total():load({ id = ... })
function HostedRestSDK:app_user_total(data)
  local EntityMod = require("entity.app_user_total_entity")
  if data == nil then
    if self._app_user_total == nil then
      self._app_user_total = EntityMod.new(self, nil)
    end
    return self._app_user_total
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:app_user_total() instead.
function HostedRestSDK:AppUserTotal(data)
  local EntityMod = require("entity.app_user_total_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:app_user_verify():list() / client:app_user_verify():load({ id = ... })
function HostedRestSDK:app_user_verify(data)
  local EntityMod = require("entity.app_user_verify_entity")
  if data == nil then
    if self._app_user_verify == nil then
      self._app_user_verify = EntityMod.new(self, nil)
    end
    return self._app_user_verify
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:app_user_verify() instead.
function HostedRestSDK:AppUserVerify(data)
  local EntityMod = require("entity.app_user_verify_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:authentication():list() / client:authentication():load({ id = ... })
function HostedRestSDK:authentication(data)
  local EntityMod = require("entity.authentication_entity")
  if data == nil then
    if self._authentication == nil then
      self._authentication = EntityMod.new(self, nil)
    end
    return self._authentication
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:authentication() instead.
function HostedRestSDK:Authentication(data)
  local EntityMod = require("entity.authentication_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:collection():list() / client:collection():load({ id = ... })
function HostedRestSDK:collection(data)
  local EntityMod = require("entity.collection_entity")
  if data == nil then
    if self._collection == nil then
      self._collection = EntityMod.new(self, nil)
    end
    return self._collection
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:collection() instead.
function HostedRestSDK:Collection(data)
  local EntityMod = require("entity.collection_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:collection_record():list() / client:collection_record():load({ id = ... })
function HostedRestSDK:collection_record(data)
  local EntityMod = require("entity.collection_record_entity")
  if data == nil then
    if self._collection_record == nil then
      self._collection_record = EntityMod.new(self, nil)
    end
    return self._collection_record
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:collection_record() instead.
function HostedRestSDK:CollectionRecord(data)
  local EntityMod = require("entity.collection_record_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:collection_record_list():list() / client:collection_record_list():load({ id = ... })
function HostedRestSDK:collection_record_list(data)
  local EntityMod = require("entity.collection_record_list_entity")
  if data == nil then
    if self._collection_record_list == nil then
      self._collection_record_list = EntityMod.new(self, nil)
    end
    return self._collection_record_list
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:collection_record_list() instead.
function HostedRestSDK:CollectionRecordList(data)
  local EntityMod = require("entity.collection_record_list_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:custom():list() / client:custom():load({ id = ... })
function HostedRestSDK:custom(data)
  local EntityMod = require("entity.custom_entity")
  if data == nil then
    if self._custom == nil then
      self._custom = EntityMod.new(self, nil)
    end
    return self._custom
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:custom() instead.
function HostedRestSDK:Custom(data)
  local EntityMod = require("entity.custom_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:legacy():list() / client:legacy():load({ id = ... })
function HostedRestSDK:legacy(data)
  local EntityMod = require("entity.legacy_entity")
  if data == nil then
    if self._legacy == nil then
      self._legacy = EntityMod.new(self, nil)
    end
    return self._legacy
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:legacy() instead.
function HostedRestSDK:Legacy(data)
  local EntityMod = require("entity.legacy_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:legacy_mutation():list() / client:legacy_mutation():load({ id = ... })
function HostedRestSDK:legacy_mutation(data)
  local EntityMod = require("entity.legacy_mutation_entity")
  if data == nil then
    if self._legacy_mutation == nil then
      self._legacy_mutation = EntityMod.new(self, nil)
    end
    return self._legacy_mutation
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:legacy_mutation() instead.
function HostedRestSDK:LegacyMutation(data)
  local EntityMod = require("entity.legacy_mutation_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:legacy_unknown():list() / client:legacy_unknown():load({ id = ... })
function HostedRestSDK:legacy_unknown(data)
  local EntityMod = require("entity.legacy_unknown_entity")
  if data == nil then
    if self._legacy_unknown == nil then
      self._legacy_unknown = EntityMod.new(self, nil)
    end
    return self._legacy_unknown
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:legacy_unknown() instead.
function HostedRestSDK:LegacyUnknown(data)
  local EntityMod = require("entity.legacy_unknown_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:legacy_unknown_list():list() / client:legacy_unknown_list():load({ id = ... })
function HostedRestSDK:legacy_unknown_list(data)
  local EntityMod = require("entity.legacy_unknown_list_entity")
  if data == nil then
    if self._legacy_unknown_list == nil then
      self._legacy_unknown_list = EntityMod.new(self, nil)
    end
    return self._legacy_unknown_list
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:legacy_unknown_list() instead.
function HostedRestSDK:LegacyUnknownList(data)
  local EntityMod = require("entity.legacy_unknown_list_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:legacy_user():list() / client:legacy_user():load({ id = ... })
function HostedRestSDK:legacy_user(data)
  local EntityMod = require("entity.legacy_user_entity")
  if data == nil then
    if self._legacy_user == nil then
      self._legacy_user = EntityMod.new(self, nil)
    end
    return self._legacy_user
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:legacy_user() instead.
function HostedRestSDK:LegacyUser(data)
  local EntityMod = require("entity.legacy_user_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:legacy_user_list():list() / client:legacy_user_list():load({ id = ... })
function HostedRestSDK:legacy_user_list(data)
  local EntityMod = require("entity.legacy_user_list_entity")
  if data == nil then
    if self._legacy_user_list == nil then
      self._legacy_user_list = EntityMod.new(self, nil)
    end
    return self._legacy_user_list
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:legacy_user_list() instead.
function HostedRestSDK:LegacyUserList(data)
  local EntityMod = require("entity.legacy_user_list_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:login():list() / client:login():load({ id = ... })
function HostedRestSDK:login(data)
  local EntityMod = require("entity.login_entity")
  if data == nil then
    if self._login == nil then
      self._login = EntityMod.new(self, nil)
    end
    return self._login
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:login() instead.
function HostedRestSDK:Login(data)
  local EntityMod = require("entity.login_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:register():list() / client:register():load({ id = ... })
function HostedRestSDK:register(data)
  local EntityMod = require("entity.register_entity")
  if data == nil then
    if self._register == nil then
      self._register = EntityMod.new(self, nil)
    end
    return self._register
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:register() instead.
function HostedRestSDK:Register(data)
  local EntityMod = require("entity.register_entity")
  return EntityMod.new(self, data)
end




function HostedRestSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = HostedRestSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return HostedRestSDK
