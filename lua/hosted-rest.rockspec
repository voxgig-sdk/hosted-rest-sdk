package = "voxgig-sdk-hosted-rest"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/hosted-rest-sdk.git"
}
description = {
  summary = "HostedRest SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["hosted-rest_sdk"] = "hosted-rest_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
