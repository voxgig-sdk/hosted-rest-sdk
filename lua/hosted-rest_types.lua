-- Typed models for the HostedRest SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AgentHealth
---@field deprecations table
---@field rate_limit_status table
---@field status string
---@field uptime_seconds number
---@field version string

---@class AgentHealthLoadMatch
---@field deprecations? table
---@field rate_limit_status? table
---@field status? string
---@field uptime_seconds? number
---@field version? string

---@class AgentSandbox
---@field email string
---@field password string

---@class AgentSandboxLoadMatch
---@field scenario string

---@class AgentSandboxCreateData
---@field email string
---@field password string

---@class AgentUserDetail
---@field created_at string
---@field email string
---@field full_name string
---@field id string
---@field locale string
---@field preferences table
---@field profile table
---@field status string
---@field timezone string
---@field updated_at string

---@class AgentUserDetailLoadMatch
---@field id string

---@class AgentUserList
---@field created_at string
---@field email string
---@field full_name string
---@field id string
---@field locale string
---@field preferences table
---@field profile table
---@field status string
---@field timezone string
---@field updated_at string

---@class AgentUserListListMatch
---@field created_at? string
---@field email? string
---@field full_name? string
---@field id? string
---@field locale? string
---@field preferences? table
---@field profile? table
---@field status? string
---@field timezone? string
---@field updated_at? string

---@class AppUser
---@field created_at? string
---@field email string
---@field id string
---@field last_login_at? string
---@field metadata? table
---@field status? string

---@class AppUserLoadMatch
---@field id string

---@class AppUserListMatch
---@field created_at? string
---@field email? string
---@field id? string
---@field last_login_at? string
---@field metadata? table
---@field status? string

---@class AppUserCreateData
---@field created_at? string
---@field email string
---@field id string
---@field last_login_at? string
---@field metadata? table
---@field status? string

---@class AppUserUpdateData
---@field id string
---@field created_at? string
---@field email? string
---@field last_login_at? string
---@field metadata? table
---@field status? string

---@class AppUserRemoveMatch
---@field id string

---@class AppUserLogin
---@field email string
---@field metadata? table
---@field project_id? string

---@class AppUserLoginCreateData
---@field email string
---@field metadata? table
---@field project_id? string

---@class AppUserSession

---@class AppUserSessionLoadMatch

---@class AppUserTotal
---@field total number

---@class AppUserTotalLoadMatch
---@field project_id string

---@class AppUserVerify
---@field token string

---@class AppUserVerifyCreateData
---@field token string

---@class Authentication

---@class AuthenticationCreateData

---@class Collection
---@field created_at? string
---@field id string
---@field name string
---@field project_id? string
---@field schema? table
---@field slug string
---@field updated_at? string
---@field user_id? string
---@field visibility? string

---@class CollectionLoadMatch
---@field id string

---@class CollectionListMatch
---@field created_at? string
---@field id? string
---@field name? string
---@field project_id? string
---@field schema? table
---@field slug? string
---@field updated_at? string
---@field user_id? string
---@field visibility? string

---@class CollectionCreateData
---@field created_at? string
---@field id string
---@field name string
---@field project_id? string
---@field schema? table
---@field slug string
---@field updated_at? string
---@field user_id? string
---@field visibility? string

---@class CollectionUpdateData
---@field id string
---@field created_at? string
---@field name? string
---@field project_id? string
---@field schema? table
---@field slug? string
---@field updated_at? string
---@field user_id? string
---@field visibility? string

---@class CollectionRemoveMatch
---@field id string

---@class CollectionRecord
---@field app_user_id? string
---@field collection_id? string
---@field created_at? string
---@field created_by? string
---@field data table
---@field deleted_at? string
---@field id string
---@field project_id? string
---@field updated_at? string

---@class CollectionRecordLoadMatch
---@field collection_id string
---@field id string

---@class CollectionRecordCreateData
---@field slug string
---@field app_user_id? string
---@field collection_id? string
---@field created_at? string
---@field created_by? string
---@field data table
---@field deleted_at? string
---@field id string
---@field project_id? string
---@field updated_at? string

---@class CollectionRecordUpdateData
---@field collection_id string
---@field id string
---@field app_user_id? string
---@field created_at? string
---@field created_by? string
---@field data? table
---@field deleted_at? string
---@field project_id? string
---@field updated_at? string

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
---@field createdAt? string
---@field id? string
---@field updatedAt? string

---@class LegacyMutationCreateData
---@field createdAt? string
---@field id? string
---@field updatedAt? string

---@class LegacyMutationUpdateData
---@field id number
---@field createdAt? string
---@field updatedAt? string

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
---@field color? string
---@field id? number
---@field name? string
---@field pantone_value? string
---@field year? number

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
---@field avatar? string
---@field email? string
---@field first_name? string
---@field id? number
---@field last_name? string

---@class Login
---@field email string
---@field password string
---@field token string

---@class LoginCreateData
---@field email string
---@field password string
---@field token string

---@class Register
---@field email string
---@field id? number
---@field password string
---@field token string

---@class RegisterCreateData
---@field email string
---@field id? number
---@field password string
---@field token string

local M = {}

return M
