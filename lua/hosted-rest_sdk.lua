-- HostedRest SDK

local json = require("dkjson")
local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("hosted-rest_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local HostedRestSDK = {}

-- The options and the root context both hold the credential. They live in
-- a side table rather than in the client, so a dump or an encoder walking
-- the client's fields never reaches them; `sdk.options` still reads and
-- writes through the metamethods, and options_map() is the documented way
-- to read the credential back.
local HIDDEN = { options = true, _rootctx = true }
local SLOTS = setmetatable({}, { __mode = "k" })

HostedRestSDK.__index = function(self, key)
  local member = rawget(HostedRestSDK, key)
  if member ~= nil then
    return member
  end
  if HIDDEN[key] then
    local slots = SLOTS[self]
    return slots ~= nil and slots[key] or nil
  end
  return nil
end

HostedRestSDK.__newindex = function(self, key, val)
  if HIDDEN[key] then
    local slots = SLOTS[self]
    if slots == nil then
      slots = {}
      SLOTS[self] = slots
    end
    slots[key] = val
  else
    rawset(self, key, val)
  end
end

-- The client's own record: what a serialiser or clean's snapshot sees in
-- place of the client, so neither reaches the options through it.
function HostedRestSDK:to_record()
  return { sdk = "HostedRest", mode = self.mode }
end

HostedRestSDK.__tostring = function(self)
  return "HostedRestSDK mode=" .. tostring(self.mode)
end

HostedRestSDK.__tojson = function(self)
  return json.encode(self:to_record())
end


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

  local config = require("config_shared")()

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

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
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

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: ratelimit
  -- feature: retry
  -- feature: test
  -- feature: timeout


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


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function HostedRestSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function HostedRestSDK:_op_allowed(op)
  local allow = vs.getpath(self.options, "allow.op")
  return type(allow) == "string" and allow:find(op, 1, true) ~= nil
end


function HostedRestSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "HostedRestSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function HostedRestSDK:_raw_request(fetchargs)
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
    return { ok = false, err = utility.clean(ctx, fetch_err) }, nil
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


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function HostedRestSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "HostedRestSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:AgentHealth():list() / client:AgentHealth():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:AgentHealth(data)
  local EntityMod = require("entity.agent_health_entity")
  if data == nil then
    if self._agent_health == nil then
      self._agent_health = EntityMod.new(self, nil)
    end
    return self._agent_health
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentSandbox():list() / client:AgentSandbox():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:AgentSandbox(data)
  local EntityMod = require("entity.agent_sandbox_entity")
  if data == nil then
    if self._agent_sandbox == nil then
      self._agent_sandbox = EntityMod.new(self, nil)
    end
    return self._agent_sandbox
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentUser():list() / client:AgentUser():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:AgentUser(data)
  local EntityMod = require("entity.agent_user_entity")
  if data == nil then
    if self._agent_user == nil then
      self._agent_user = EntityMod.new(self, nil)
    end
    return self._agent_user
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppUser():list() / client:AppUser():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:AppUser(data)
  local EntityMod = require("entity.app_user_entity")
  if data == nil then
    if self._app_user == nil then
      self._app_user = EntityMod.new(self, nil)
    end
    return self._app_user
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppUserLogin():list() / client:AppUserLogin():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:AppUserLogin(data)
  local EntityMod = require("entity.app_user_login_entity")
  if data == nil then
    if self._app_user_login == nil then
      self._app_user_login = EntityMod.new(self, nil)
    end
    return self._app_user_login
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppUserSession():list() / client:AppUserSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:AppUserSession(data)
  local EntityMod = require("entity.app_user_session_entity")
  if data == nil then
    if self._app_user_session == nil then
      self._app_user_session = EntityMod.new(self, nil)
    end
    return self._app_user_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppUserTotal():list() / client:AppUserTotal():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:AppUserTotal(data)
  local EntityMod = require("entity.app_user_total_entity")
  if data == nil then
    if self._app_user_total == nil then
      self._app_user_total = EntityMod.new(self, nil)
    end
    return self._app_user_total
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppUserVerify():list() / client:AppUserVerify():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:AppUserVerify(data)
  local EntityMod = require("entity.app_user_verify_entity")
  if data == nil then
    if self._app_user_verify == nil then
      self._app_user_verify = EntityMod.new(self, nil)
    end
    return self._app_user_verify
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Authentication():list() / client:Authentication():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:Authentication(data)
  local EntityMod = require("entity.authentication_entity")
  if data == nil then
    if self._authentication == nil then
      self._authentication = EntityMod.new(self, nil)
    end
    return self._authentication
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Collection():list() / client:Collection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:Collection(data)
  local EntityMod = require("entity.collection_entity")
  if data == nil then
    if self._collection == nil then
      self._collection = EntityMod.new(self, nil)
    end
    return self._collection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CollectionRecord():list() / client:CollectionRecord():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:CollectionRecord(data)
  local EntityMod = require("entity.collection_record_entity")
  if data == nil then
    if self._collection_record == nil then
      self._collection_record = EntityMod.new(self, nil)
    end
    return self._collection_record
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Custom():list() / client:Custom():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:Custom(data)
  local EntityMod = require("entity.custom_entity")
  if data == nil then
    if self._custom == nil then
      self._custom = EntityMod.new(self, nil)
    end
    return self._custom
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Legacy():list() / client:Legacy():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:Legacy(data)
  local EntityMod = require("entity.legacy_entity")
  if data == nil then
    if self._legacy == nil then
      self._legacy = EntityMod.new(self, nil)
    end
    return self._legacy
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LegacyMutation():list() / client:LegacyMutation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:LegacyMutation(data)
  local EntityMod = require("entity.legacy_mutation_entity")
  if data == nil then
    if self._legacy_mutation == nil then
      self._legacy_mutation = EntityMod.new(self, nil)
    end
    return self._legacy_mutation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LegacyUnknown():list() / client:LegacyUnknown():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:LegacyUnknown(data)
  local EntityMod = require("entity.legacy_unknown_entity")
  if data == nil then
    if self._legacy_unknown == nil then
      self._legacy_unknown = EntityMod.new(self, nil)
    end
    return self._legacy_unknown
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LegacyUser():list() / client:LegacyUser():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:LegacyUser(data)
  local EntityMod = require("entity.legacy_user_entity")
  if data == nil then
    if self._legacy_user == nil then
      self._legacy_user = EntityMod.new(self, nil)
    end
    return self._legacy_user
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Login():list() / client:Login():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:Login(data)
  local EntityMod = require("entity.login_entity")
  if data == nil then
    if self._login == nil then
      self._login = EntityMod.new(self, nil)
    end
    return self._login
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Register():list() / client:Register():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HostedRestSDK:Register(data)
  local EntityMod = require("entity.register_entity")
  if data == nil then
    if self._register == nil then
      self._register = EntityMod.new(self, nil)
    end
    return self._register
  end
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
