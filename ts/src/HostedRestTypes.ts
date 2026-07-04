// Typed models for the HostedRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AgentHealth {
  data: Record<string, any>
}

export type AgentHealthLoadMatch = Partial<AgentHealth>

export interface AgentSandbox {
  email: string
  password: string
}

export interface AgentSandboxLoadMatch {
  scenario: string
}

export type AgentSandboxCreateData = Partial<AgentSandbox>

export interface AgentUserDetail {
  data: Record<string, any>
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
  preference: Record<string, any>
  profile: Record<string, any>
  status: string
  timezone: string
  updated_at: string
}

export type AgentUserListListMatch = Partial<AgentUserList>

export interface AppUser {
  created_at?: string
  data: Record<string, any>
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
  project_id: string
}

export interface AppUserCreateData {
  id: string
}

export interface AppUserUpdateData {
  id: string
}

export interface AppUserRemoveMatch {
  collection_id: string
  record_id: string
  id: string
}

export interface AppUserLogin {
  data: Record<string, any>
  email: string
  metadata?: Record<string, any>
  project_id?: string
}

export type AppUserLoginCreateData = Partial<AppUserLogin>

export interface AppUserSession {
  data: Record<string, any>
}

export type AppUserSessionLoadMatch = Partial<AppUserSession>

export interface AppUserTotal {
  total: number
}

export interface AppUserTotalLoadMatch {
  project_id: string
}

export interface AppUserVerify {
  data: Record<string, any>
  token: string
}

export type AppUserVerifyCreateData = Partial<AppUserVerify>

export interface Authentication {
}

export type AuthenticationCreateData = Partial<Authentication>

export interface Collection {
  created_at?: string
  data: Record<string, any>
  id: string
  name: string
  project_id?: string
  schema?: Record<string, any>
  slug?: string
  updated_at?: string
  user_id?: string
  visibility?: string
}

export interface CollectionLoadMatch {
  id: string
}

export type CollectionListMatch = Partial<Collection>

export type CollectionCreateData = Partial<Collection>

export interface CollectionUpdateData {
  id: string
}

export interface CollectionRemoveMatch {
  collection_id: string
  record_id: string
  id: string
}

export interface CollectionRecord {
  data: Record<string, any>
}

export interface CollectionRecordLoadMatch {
  collection_id: string
  id: string
}

export interface CollectionRecordCreateData {
  slug: string
}

export interface CollectionRecordUpdateData {
  collection_id: string
  id: string
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
  created_at?: string
  id?: string
  updated_at?: string
}

export type LegacyMutationCreateData = Partial<LegacyMutation>

export interface LegacyMutationUpdateData {
  id: number
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

export type LegacyUnknownListListMatch = Partial<LegacyUnknownList>

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

export type LegacyUserListListMatch = Partial<LegacyUserList>

export interface Login {
  email: string
  password: string
  token: string
}

export type LoginCreateData = Partial<Login>

export interface Register {
  email: string
  id?: number
  password: string
  token: string
}

export type RegisterCreateData = Partial<Register>

