# frozen_string_literal: true

# Typed models for the HostedRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AgentHealth entity data model.
#
# @!attribute [rw] deprecations
#   @return [Array]
#
# @!attribute [rw] rate_limit_status
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] uptime_seconds
#   @return [Integer]
#
# @!attribute [rw] version
#   @return [String]
AgentHealth = Struct.new(
  :deprecations,
  :rate_limit_status,
  :status,
  :uptime_seconds,
  :version,
  keyword_init: true
)

# Request payload for AgentHealth#load.
#
# @!attribute [rw] deprecations
#   @return [Array, nil]
#
# @!attribute [rw] rate_limit_status
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] uptime_seconds
#   @return [Integer, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
AgentHealthLoadMatch = Struct.new(
  :deprecations,
  :rate_limit_status,
  :status,
  :uptime_seconds,
  :version,
  keyword_init: true
)

# AgentSandbox entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
AgentSandbox = Struct.new(
  :email,
  :password,
  keyword_init: true
)

# Request payload for AgentSandbox#load.
#
# @!attribute [rw] scenario
#   @return [String]
AgentSandboxLoadMatch = Struct.new(
  :scenario,
  keyword_init: true
)

# Request payload for AgentSandbox#create.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
AgentSandboxCreateData = Struct.new(
  :email,
  :password,
  keyword_init: true
)

# AgentUserDetail entity data model.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] full_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] locale
#   @return [String]
#
# @!attribute [rw] preferences
#   @return [Hash]
#
# @!attribute [rw] profile
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] timezone
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
AgentUserDetail = Struct.new(
  :created_at,
  :email,
  :full_name,
  :id,
  :locale,
  :preferences,
  :profile,
  :status,
  :timezone,
  :updated_at,
  keyword_init: true
)

# Request payload for AgentUserDetail#load.
#
# @!attribute [rw] id
#   @return [String]
AgentUserDetailLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# AgentUserList entity data model.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] full_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] locale
#   @return [String]
#
# @!attribute [rw] preferences
#   @return [Hash]
#
# @!attribute [rw] profile
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] timezone
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String]
AgentUserList = Struct.new(
  :created_at,
  :email,
  :full_name,
  :id,
  :locale,
  :preferences,
  :profile,
  :status,
  :timezone,
  :updated_at,
  keyword_init: true
)

# Request payload for AgentUserList#list.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] preferences
#   @return [Hash, nil]
#
# @!attribute [rw] profile
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
AgentUserListListMatch = Struct.new(
  :created_at,
  :email,
  :full_name,
  :id,
  :locale,
  :preferences,
  :profile,
  :status,
  :timezone,
  :updated_at,
  keyword_init: true
)

# AppUser entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_login_at
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AppUser = Struct.new(
  :created_at,
  :email,
  :id,
  :last_login_at,
  :metadata,
  :status,
  keyword_init: true
)

# Request payload for AppUser#load.
#
# @!attribute [rw] id
#   @return [String]
AppUserLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for AppUser#list.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_login_at
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AppUserListMatch = Struct.new(
  :created_at,
  :email,
  :id,
  :last_login_at,
  :metadata,
  :status,
  keyword_init: true
)

# Request payload for AppUser#create.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] last_login_at
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AppUserCreateData = Struct.new(
  :created_at,
  :email,
  :id,
  :last_login_at,
  :metadata,
  :status,
  keyword_init: true
)

# Request payload for AppUser#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] last_login_at
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AppUserUpdateData = Struct.new(
  :id,
  :created_at,
  :email,
  :last_login_at,
  :metadata,
  :status,
  keyword_init: true
)

# Request payload for AppUser#remove.
#
# @!attribute [rw] id
#   @return [String]
AppUserRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# AppUserLogin entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
AppUserLogin = Struct.new(
  :email,
  :metadata,
  :project_id,
  keyword_init: true
)

# Request payload for AppUserLogin#create.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
AppUserLoginCreateData = Struct.new(
  :email,
  :metadata,
  :project_id,
  keyword_init: true
)

# AppUserSession entity data model.
class AppUserSession
end

# Request payload for AppUserSession#load.
class AppUserSessionLoadMatch
end

# AppUserTotal entity data model.
#
# @!attribute [rw] total
#   @return [Integer]
AppUserTotal = Struct.new(
  :total,
  keyword_init: true
)

# Request payload for AppUserTotal#load.
#
# @!attribute [rw] project_id
#   @return [String]
AppUserTotalLoadMatch = Struct.new(
  :project_id,
  keyword_init: true
)

# AppUserVerify entity data model.
#
# @!attribute [rw] token
#   @return [String]
AppUserVerify = Struct.new(
  :token,
  keyword_init: true
)

# Request payload for AppUserVerify#create.
#
# @!attribute [rw] token
#   @return [String]
AppUserVerifyCreateData = Struct.new(
  :token,
  keyword_init: true
)

# Authentication entity data model.
class Authentication
end

# Request payload for Authentication#create.
class AuthenticationCreateData
end

# Collection entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] schema
#   @return [Hash, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
Collection = Struct.new(
  :created_at,
  :id,
  :name,
  :project_id,
  :schema,
  :slug,
  :updated_at,
  :user_id,
  :visibility,
  keyword_init: true
)

# Request payload for Collection#load.
#
# @!attribute [rw] id
#   @return [String]
CollectionLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Collection#list.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] schema
#   @return [Hash, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
CollectionListMatch = Struct.new(
  :created_at,
  :id,
  :name,
  :project_id,
  :schema,
  :slug,
  :updated_at,
  :user_id,
  :visibility,
  keyword_init: true
)

# Request payload for Collection#create.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] schema
#   @return [Hash, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
CollectionCreateData = Struct.new(
  :created_at,
  :id,
  :name,
  :project_id,
  :schema,
  :slug,
  :updated_at,
  :user_id,
  :visibility,
  keyword_init: true
)

# Request payload for Collection#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] schema
#   @return [Hash, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
CollectionUpdateData = Struct.new(
  :id,
  :created_at,
  :name,
  :project_id,
  :schema,
  :slug,
  :updated_at,
  :user_id,
  :visibility,
  keyword_init: true
)

# Request payload for Collection#remove.
#
# @!attribute [rw] id
#   @return [String]
CollectionRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# CollectionRecord entity data model.
#
# @!attribute [rw] app_user_id
#   @return [String, nil]
#
# @!attribute [rw] collection_id
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] created_by
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] deleted_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
CollectionRecord = Struct.new(
  :app_user_id,
  :collection_id,
  :created_at,
  :created_by,
  :data,
  :deleted_at,
  :id,
  :project_id,
  :updated_at,
  keyword_init: true
)

# Request payload for CollectionRecord#load.
#
# @!attribute [rw] collection_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
CollectionRecordLoadMatch = Struct.new(
  :collection_id,
  :id,
  keyword_init: true
)

# Request payload for CollectionRecord#create.
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] app_user_id
#   @return [String, nil]
#
# @!attribute [rw] collection_id
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] created_by
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] deleted_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
CollectionRecordCreateData = Struct.new(
  :slug,
  :app_user_id,
  :collection_id,
  :created_at,
  :created_by,
  :data,
  :deleted_at,
  :id,
  :project_id,
  :updated_at,
  keyword_init: true
)

# Request payload for CollectionRecord#update.
#
# @!attribute [rw] collection_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] app_user_id
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] created_by
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] deleted_at
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
CollectionRecordUpdateData = Struct.new(
  :collection_id,
  :id,
  :app_user_id,
  :created_at,
  :created_by,
  :data,
  :deleted_at,
  :project_id,
  :updated_at,
  keyword_init: true
)

# CollectionRecordList entity data model.
#
# @!attribute [rw] app_user_id
#   @return [String, nil]
#
# @!attribute [rw] collection_id
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] created_by
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] deleted_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
CollectionRecordList = Struct.new(
  :app_user_id,
  :collection_id,
  :created_at,
  :created_by,
  :data,
  :deleted_at,
  :id,
  :project_id,
  :updated_at,
  keyword_init: true
)

# Request payload for CollectionRecordList#list.
#
# @!attribute [rw] slug
#   @return [String]
CollectionRecordListListMatch = Struct.new(
  :slug,
  keyword_init: true
)

# Custom entity data model.
class Custom
end

# Request payload for Custom#load.
#
# @!attribute [rw] id
#   @return [String]
CustomLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Custom#create.
#
# @!attribute [rw] id
#   @return [String]
CustomCreateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Custom#update.
#
# @!attribute [rw] id
#   @return [String]
CustomUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Custom#remove.
#
# @!attribute [rw] id
#   @return [String]
CustomRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Legacy entity data model.
class Legacy
end

# Request payload for Legacy#remove.
#
# @!attribute [rw] id
#   @return [Integer]
LegacyRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# LegacyMutation entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
LegacyMutation = Struct.new(
  :createdAt,
  :id,
  :updatedAt,
  keyword_init: true
)

# Request payload for LegacyMutation#create.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
LegacyMutationCreateData = Struct.new(
  :createdAt,
  :id,
  :updatedAt,
  keyword_init: true
)

# Request payload for LegacyMutation#update.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
LegacyMutationUpdateData = Struct.new(
  :id,
  :createdAt,
  :updatedAt,
  keyword_init: true
)

# LegacyUnknown entity data model.
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] support
#   @return [Hash, nil]
LegacyUnknown = Struct.new(
  :data,
  :support,
  keyword_init: true
)

# Request payload for LegacyUnknown#load.
#
# @!attribute [rw] id
#   @return [Integer]
LegacyUnknownLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# LegacyUnknownList entity data model.
#
# @!attribute [rw] color
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] pantone_value
#   @return [String]
#
# @!attribute [rw] year
#   @return [Integer]
LegacyUnknownList = Struct.new(
  :color,
  :id,
  :name,
  :pantone_value,
  :year,
  keyword_init: true
)

# Request payload for LegacyUnknownList#list.
#
# @!attribute [rw] color
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pantone_value
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
LegacyUnknownListListMatch = Struct.new(
  :color,
  :id,
  :name,
  :pantone_value,
  :year,
  keyword_init: true
)

# LegacyUser entity data model.
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] support
#   @return [Hash, nil]
LegacyUser = Struct.new(
  :data,
  :support,
  keyword_init: true
)

# Request payload for LegacyUser#load.
#
# @!attribute [rw] id
#   @return [Integer]
LegacyUserLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# LegacyUserList entity data model.
#
# @!attribute [rw] avatar
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] first_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] last_name
#   @return [String]
LegacyUserList = Struct.new(
  :avatar,
  :email,
  :first_name,
  :id,
  :last_name,
  keyword_init: true
)

# Request payload for LegacyUserList#list.
#
# @!attribute [rw] avatar
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] first_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_name
#   @return [String, nil]
LegacyUserListListMatch = Struct.new(
  :avatar,
  :email,
  :first_name,
  :id,
  :last_name,
  keyword_init: true
)

# Login entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] token
#   @return [String]
Login = Struct.new(
  :email,
  :password,
  :token,
  keyword_init: true
)

# Request payload for Login#create.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] token
#   @return [String]
LoginCreateData = Struct.new(
  :email,
  :password,
  :token,
  keyword_init: true
)

# Register entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] token
#   @return [String]
Register = Struct.new(
  :email,
  :id,
  :password,
  :token,
  keyword_init: true
)

# Request payload for Register#create.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] token
#   @return [String]
RegisterCreateData = Struct.new(
  :email,
  :id,
  :password,
  :token,
  keyword_init: true
)

