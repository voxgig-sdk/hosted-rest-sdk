-- Typed models for the HostedRest SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AgentHealth
---@field data table

---@class AgentHealthLoadMatch

---@class AgentSandbox
---@field email string
---@field password string

---@class AgentSandboxLoadMatch
---@field scenario string

---@class AgentSandboxCreateData

---@class AgentUserDetail
---@field data table

---@class AgentUserDetailLoadMatch
---@field id string

---@class AgentUserList
---@field created_at string
---@field email string
---@field full_name string
---@field id string
---@field locale string
---@field preference table
---@field profile table
---@field status string
---@field timezone string
---@field updated_at string

---@class AgentUserListListMatch

---@class AppUser
---@field created_at? string
---@field data table
---@field email string
---@field id string
---@field last_login_at? string
---@field metadata? table
---@field status? string

---@class AppUserLoadMatch
---@field id string

---@class AppUserListMatch
---@field project_id string

---@class AppUserCreateData
---@field id string

---@class AppUserUpdateData
---@field id string

---@class AppUserRemoveMatch
---@field collection_id string
---@field record_id string
---@field id string

---@class AppUserLogin
---@field data table
---@field email string
---@field metadata? table
---@field project_id? string

---@class AppUserLoginCreateData

---@class AppUserSession
---@field data table

---@class AppUserSessionLoadMatch

---@class AppUserTotal
---@field total number

---@class AppUserTotalLoadMatch
---@field project_id string

---@class AppUserVerify
---@field data table
---@field token string

---@class AppUserVerifyCreateData

---@class Authentication

---@class AuthenticationCreateData

---@class Collection
---@field created_at? string
---@field data table
---@field id string
---@field name string
---@field project_id? string
---@field schema? table
---@field slug? string
---@field updated_at? string
---@field user_id? string
---@field visibility? string

---@class CollectionLoadMatch
---@field id string

---@class CollectionListMatch

---@class CollectionCreateData

---@class CollectionUpdateData
---@field id string

---@class CollectionRemoveMatch
---@field collection_id string
---@field record_id string
---@field id string

---@class CollectionRecord
---@field data table

---@class CollectionRecordLoadMatch
---@field collection_id string
---@field id string

---@class CollectionRecordCreateData
---@field slug string

---@class CollectionRecordUpdateData
---@field collection_id string
---@field id string

---@class CollectionRecordList
---@field app_user_id? string
---@field collection_id? string
---@field created_at? string
---@field created_by? string
---@field data table
---@field deleted_at? string
---@field id string
---@field project_id? string
---@field updated_at? string

---@class CollectionRecordListListMatch
---@field slug string

---@class Custom

---@class CustomLoadMatch
---@field id string

---@class CustomCreateData
---@field id string

---@class CustomUpdateData
---@field id string

---@class CustomRemoveMatch
---@field id string

---@class Legacy

---@class LegacyRemoveMatch
---@field id number

---@class LegacyMutation
---@field created_at? string
---@field id? string
---@field updated_at? string

---@class LegacyMutationCreateData

---@class LegacyMutationUpdateData
---@field id number

---@class LegacyUnknown
---@field data table
---@field support? table

---@class LegacyUnknownLoadMatch
---@field id number

---@class LegacyUnknownList
---@field color string
---@field id number
---@field name string
---@field pantone_value string
---@field year number

---@class LegacyUnknownListListMatch

---@class LegacyUser
---@field data table
---@field support? table

---@class LegacyUserLoadMatch
---@field id number

---@class LegacyUserList
---@field avatar string
---@field email string
---@field first_name string
---@field id number
---@field last_name string

---@class LegacyUserListListMatch

---@class Login
---@field email string
---@field password string
---@field token string

---@class LoginCreateData

---@class Register
---@field email string
---@field id? number
---@field password string
---@field token string

---@class RegisterCreateData

local M = {}

return M
