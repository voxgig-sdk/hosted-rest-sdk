// Typed models for the HostedRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AgentHealth {
  deprecations: any[]
  rate_limit_status: Record<string, any>
  status: string
  uptime_seconds: number
  version: string
}

export interface AgentHealthLoadMatch {
  deprecations?: any[]
  rate_limit_status?: Record<string, any>
  status?: string
  uptime_seconds?: number
  version?: string
}

export interface AgentSandbox {
  email: string
  password: string
}

export interface AgentSandboxLoadMatch {
  scenario?: string
}

export interface AgentSandboxCreateData {
  email: string
  password: string
}

export interface AgentUserDetail {
  created_at: string
  email: string
  full_name: string
  id: string
  locale: string
  preferences: Record<string, any>
  profile: Record<string, any>
  status: string
  timezone: string
  updated_at: string
}

export interface AgentUserDetailLoadMatch {
  id: string
}

export interface AgentUserList {
  created_at: string
  email: string
  full_name: string
  id: string
  locale: string
  preferences: Record<string, any>
  profile: Record<string, any>
  status: string
  timezone: string
  updated_at: string
}

export interface AgentUserListListMatch {
  created_at?: string
  email?: string
  full_name?: string
  id?: string
  locale?: string
  preferences?: Record<string, any>
  profile?: Record<string, any>
  status?: string
  timezone?: string
  updated_at?: string
}

export interface AppUser {
  created_at?: string
  email: string
  id: string
  last_login_at?: string
  metadata?: Record<string, any>
  status?: string
}

export interface AppUserLoadMatch {
  id: string
}

export interface AppUserListMatch {
  project_id?: string
}

export interface AppUserCreateData {
  created_at?: string
  email: string
  id: string
  last_login_at?: string
  metadata?: Record<string, any>
  status?: string

  // Selects a custom action instead of the plain create:
  //   'session_simulate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppUserUpdateData {
  id: string
  created_at?: string
  email?: string
  last_login_at?: string
  metadata?: Record<string, any>
  status?: string
}

export interface AppUserRemoveMatch {
  collection_id?: string
  record_id?: string
  id?: string
}

export interface AppUserLogin {
  email: string
  metadata?: Record<string, any>
  project_id?: string
}

export interface AppUserLoginCreateData {
  email: string
  metadata?: Record<string, any>
  project_id?: string
}

export interface AppUserSession {
}

export interface AppUserSessionLoadMatch {
}

export interface AppUserTotal {
  total: number
}

export interface AppUserTotalLoadMatch {
  project_id: string
}

export interface AppUserVerify {
  token: string
}

export interface AppUserVerifyCreateData {
  token: string
}

export interface Authentication {
}

export interface AuthenticationCreateData {
}

export interface Collection {
  created_at?: string
  id: string
  name: string
  project_id?: string
  schema?: Record<string, any>
  slug: string
  updated_at?: string
  user_id?: string
  visibility?: string
}

export interface CollectionLoadMatch {
  id: string
}

export interface CollectionListMatch {
  created_at?: string
  id?: string
  name?: string
  project_id?: string
  schema?: Record<string, any>
  slug?: string
  updated_at?: string
  user_id?: string
  visibility?: string
}

export interface CollectionCreateData {
  created_at?: string
  id: string
  name: string
  project_id?: string
  schema?: Record<string, any>
  slug: string
  updated_at?: string
  user_id?: string
  visibility?: string
}

export interface CollectionUpdateData {
  id: string
  created_at?: string
  name?: string
  project_id?: string
  schema?: Record<string, any>
  slug?: string
  updated_at?: string
  user_id?: string
  visibility?: string
}

export interface CollectionRemoveMatch {
  collection_id?: string
  record_id?: string
  id?: string
}

export interface CollectionRecord {
  app_user_id?: string
  collection_id?: string
  created_at?: string
  created_by?: string
  data: Record<string, any>
  deleted_at?: string
  id: string
  project_id?: string
  updated_at?: string
}

export interface CollectionRecordLoadMatch {
  collection_id: string
  id: string
}

export interface CollectionRecordCreateData {
  slug: string
  app_user_id?: string
  collection_id?: string
  created_at?: string
  created_by?: string
  data: Record<string, any>
  deleted_at?: string
  id: string
  project_id?: string
  updated_at?: string
}

export interface CollectionRecordUpdateData {
  collection_id: string
  id: string
  app_user_id?: string
  created_at?: string
  created_by?: string
  data?: Record<string, any>
  deleted_at?: string
  project_id?: string
  updated_at?: string
}

export interface CollectionRecordList {
  app_user_id?: string
  collection_id?: string
  created_at?: string
  created_by?: string
  data: Record<string, any>
  deleted_at?: string
  id: string
  project_id?: string
  updated_at?: string
}

export interface CollectionRecordListListMatch {
  slug: string
}

export interface Custom {
}

export interface CustomLoadMatch {
  id: string
}

export interface CustomCreateData {
  id: string
}

export interface CustomUpdateData {
  id: string
}

export interface CustomRemoveMatch {
  id: string
}

export interface Legacy {
}

export interface LegacyRemoveMatch {
  id: number
}

export interface LegacyMutation {
  createdAt?: string
  id?: string
  updatedAt?: string
}

export interface LegacyMutationCreateData {
  createdAt?: string
  id?: string
  updatedAt?: string
}

export interface LegacyMutationUpdateData {
  id: number
  createdAt?: string
  updatedAt?: string
}

export interface LegacyUnknown {
  data: Record<string, any>
  support?: Record<string, any>
}

export interface LegacyUnknownLoadMatch {
  id: number
}

export interface LegacyUnknownList {
  color: string
  id: number
  name: string
  pantone_value: string
  year: number
}

export interface LegacyUnknownListListMatch {
  color?: string
  id?: number
  name?: string
  pantone_value?: string
  year?: number
}

export interface LegacyUser {
  data: Record<string, any>
  support?: Record<string, any>
}

export interface LegacyUserLoadMatch {
  id: number
}

export interface LegacyUserList {
  avatar: string
  email: string
  first_name: string
  id: number
  last_name: string
}

export interface LegacyUserListListMatch {
  avatar?: string
  email?: string
  first_name?: string
  id?: number
  last_name?: string
}

export interface Login {
  email: string
  password: string
  token: string
}

export interface LoginCreateData {
  email: string
  password: string
  token: string
}

export interface Register {
  email: string
  id?: number
  password: string
  token: string
}

export interface RegisterCreateData {
  email: string
  id?: number
  password: string
  token: string
}

