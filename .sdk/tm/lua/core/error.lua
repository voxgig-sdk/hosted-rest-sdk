-- HostedRest SDK error

local HostedRestError = {}
HostedRestError.__index = HostedRestError


function HostedRestError.new(code, msg, ctx)
  local self = setmetatable({}, HostedRestError)
  self.is_sdk_error = true
  self.sdk = "HostedRest"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function HostedRestError:error()
  return self.msg
end


function HostedRestError:__tostring()
  return self.msg
end


return HostedRestError
