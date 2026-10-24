export interface AgentHealth {
    deprecations: any[];
    rate_limit_status: Record<string, any>;
    status: string;
    uptime_seconds: number;
    version: string;
}
export interface AgentHealthLoadMatch {
    deprecations?: any[];
    rate_limit_status?: Record<string, any>;
    status?: string;
    uptime_seconds?: number;
    version?: string;
}
export interface AgentSandbox {
    email: string;
    password: string;
}
export interface AgentSandboxLoadMatch {
    scenario: string;
}
export interface AgentSandboxCreateData {
    email: string;
    password: string;
}
export interface AgentUser {
    created_at: string;
    email: string;
    full_name: string;
    id: string;
    locale: string;
    preferences: Record<string, any>;
    profile: Record<string, any>;
    status: string;
    timezone: string;
    updated_at: string;
}
export interface AgentUserLoadMatch {
    id: string;
    expand?: string;
}
export interface AgentUserListMatch {
    cursor?: string;
    field?: string;
    limit?: number;
    seed?: number;
}
export interface AppUser {
    created_at?: string;
    email: string;
    id: string;
    last_login_at?: string;
    metadata?: Record<string, any>;
    status?: string;
}
export interface AppUserLoadMatch {
    id: string;
}
export interface AppUserListMatch {
    limit?: number;
}
export interface AppUserCreateData {
    email: string;
    metadata?: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface AppUserUpdateData {
    id: string;
    email?: string;
    metadata?: Record<string, any>;
    status?: string;
}
export interface AppUserRemoveMatch {
    id: string;
}
export interface AppUserLogin {
    email: string;
    metadata?: Record<string, any>;
    project_id?: string;
}
export interface AppUserLoginCreateData {
    email: string;
    metadata?: Record<string, any>;
    project_id?: string;
}
export interface AppUserSession {
}
export interface AppUserSessionLoadMatch {
}
export interface AppUserTotal {
    total: number;
}
export interface AppUserTotalLoadMatch {
    project_id: string;
}
export interface AppUserVerify {
    token: string;
}
export interface AppUserVerifyCreateData {
    token: string;
}
export interface Authentication {
}
export interface AuthenticationCreateData {
}
export interface Collection {
    created_at?: string;
    id: string;
    name: string;
    project_id?: string;
    schema?: Record<string, any>;
    slug: string;
    updated_at?: string;
    user_id?: string;
    visibility?: string;
}
export interface CollectionLoadMatch {
    id: string;
}
export interface CollectionListMatch {
    created_at?: string;
    id?: string;
    name?: string;
    project_id?: string;
    schema?: Record<string, any>;
    slug?: string;
    updated_at?: string;
    user_id?: string;
    visibility?: string;
}
export interface CollectionCreateData {
    name: string;
    project_id?: string;
    schema?: Record<string, any>;
    slug?: string;
    visibility?: string;
}
export interface CollectionUpdateData {
    id: string;
    name?: string;
    schema?: Record<string, any>;
    slug?: string;
    visibility?: string;
}
export interface CollectionRemoveMatch {
    id: string;
}
export interface CollectionRecord {
    app_user_id?: string;
    collection_id?: string;
    created_at?: string;
    created_by?: string;
    data: Record<string, any>;
    deleted_at?: string;
    id: string;
    project_id?: string;
    updated_at?: string;
}
export interface CollectionRecordLoadMatch {
    id: string;
    slug: string;
}
export interface CollectionRecordListMatch {
    slug: string;
    created_after?: string;
    created_before?: string;
    data_contain?: string;
    include_deleted?: boolean;
    limit?: number;
    order?: string;
    page?: number;
    search?: string;
}
export interface CollectionRecordCreateData {
    slug: string;
    data: Record<string, any>;
}
export interface CollectionRecordUpdateData {
    id: string;
    slug: string;
    data?: Record<string, any>;
}
export interface CollectionRecordRemoveMatch {
    id: string;
    slug: string;
}
export interface Custom {
    id?: string;
}
export interface CustomLoadMatch {
    id: string;
}
export interface CustomCreateData {
    id: string;
}
export interface CustomUpdateData {
    id: string;
}
export interface CustomPatchData {
    id: string;
}
export interface CustomRemoveMatch {
    id: string;
}
export interface LegacyMutation {
    avatar: string;
    createdAt?: string;
    email: string;
    first_name: string;
    id?: string;
    last_name: string;
    updatedAt?: string;
}
export interface LegacyMutationListMatch {
    page?: number;
    per_page?: number;
}
export interface LegacyMutationCreateData {
}
export interface LegacyMutationUpdateData {
    id: number;
}
export interface LegacyMutationPatchData {
    id: number;
}
export interface LegacyUnknown {
    color: string;
    data: Record<string, any>;
    id: number;
    name: string;
    pantone_value: string;
    support?: Record<string, any>;
    year: number;
}
export interface LegacyUnknownLoadMatch {
    id: number;
}
export interface LegacyUnknownListMatch {
    page?: number;
    per_page?: number;
}
export interface LegacyUser {
    data: Record<string, any>;
    id?: string;
    support?: Record<string, any>;
}
export interface LegacyUserLoadMatch {
    id: number;
}
export interface LegacyUserRemoveMatch {
    id: number;
}
export interface Login {
    email: string;
    password: string;
    token: string;
}
export interface LoginCreateData {
    email: string;
    password: string;
}
export interface Register {
    email: string;
    id?: number;
    password: string;
    token: string;
}
export interface RegisterCreateData {
    email: string;
    password: string;
}
