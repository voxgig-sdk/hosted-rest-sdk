# Typed models for the HostedRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AgentHealth(TypedDict):
    deprecations: list
    rate_limit_status: dict
    status: str
    uptime_seconds: int
    version: str


class AgentHealthLoadMatch(TypedDict, total=False):
    deprecations: list
    rate_limit_status: dict
    status: str
    uptime_seconds: int
    version: str


class AgentSandbox(TypedDict):
    email: str
    password: str


class AgentSandboxLoadMatch(TypedDict):
    scenario: str


class AgentSandboxCreateData(TypedDict):
    email: str
    password: str


class AgentUserDetail(TypedDict):
    created_at: str
    email: str
    full_name: str
    id: str
    locale: str
    preferences: dict
    profile: dict
    status: str
    timezone: str
    updated_at: str


class AgentUserDetailLoadMatchRequired(TypedDict):
    id: str


class AgentUserDetailLoadMatch(AgentUserDetailLoadMatchRequired, total=False):
    expand: str


class AgentUserList(TypedDict):
    created_at: str
    email: str
    full_name: str
    id: str
    locale: str
    preferences: dict
    profile: dict
    status: str
    timezone: str
    updated_at: str


class AgentUserListListMatch(TypedDict, total=False):
    cursor: str
    field: str
    limit: int
    seed: int


class AppUserRequired(TypedDict):
    email: str
    id: str


class AppUser(AppUserRequired, total=False):
    created_at: str
    last_login_at: str
    metadata: dict
    status: str


class AppUserLoadMatch(TypedDict):
    id: str


class AppUserListMatch(TypedDict, total=False):
    limit: int


class AppUserCreateDataRequired(TypedDict):
    email: str
    id: str


class AppUserCreateData(AppUserCreateDataRequired, total=False):
    created_at: str
    last_login_at: str
    metadata: dict
    status: str


class AppUserUpdateDataRequired(TypedDict):
    id: str


class AppUserUpdateData(AppUserUpdateDataRequired, total=False):
    created_at: str
    email: str
    last_login_at: str
    metadata: dict
    status: str


class AppUserRemoveMatch(TypedDict):
    id: str


class AppUserLoginRequired(TypedDict):
    email: str


class AppUserLogin(AppUserLoginRequired, total=False):
    metadata: dict
    project_id: str


class AppUserLoginCreateDataRequired(TypedDict):
    email: str


class AppUserLoginCreateData(AppUserLoginCreateDataRequired, total=False):
    metadata: dict
    project_id: str


class AppUserSession(TypedDict):
    pass


class AppUserSessionLoadMatch(TypedDict):
    pass


class AppUserTotal(TypedDict):
    total: int


class AppUserTotalLoadMatch(TypedDict):
    project_id: str


class AppUserVerify(TypedDict):
    token: str


class AppUserVerifyCreateData(TypedDict):
    token: str


class Authentication(TypedDict):
    pass


class AuthenticationCreateData(TypedDict):
    pass


class CollectionRequired(TypedDict):
    id: str
    name: str
    slug: str


class Collection(CollectionRequired, total=False):
    created_at: str
    project_id: str
    schema: dict
    updated_at: str
    user_id: str
    visibility: str


class CollectionLoadMatch(TypedDict):
    id: str


class CollectionListMatch(TypedDict, total=False):
    created_at: str
    id: str
    name: str
    project_id: str
    schema: dict
    slug: str
    updated_at: str
    user_id: str
    visibility: str


class CollectionCreateDataRequired(TypedDict):
    id: str
    name: str
    slug: str


class CollectionCreateData(CollectionCreateDataRequired, total=False):
    created_at: str
    project_id: str
    schema: dict
    updated_at: str
    user_id: str
    visibility: str


class CollectionUpdateDataRequired(TypedDict):
    id: str


class CollectionUpdateData(CollectionUpdateDataRequired, total=False):
    created_at: str
    name: str
    project_id: str
    schema: dict
    slug: str
    updated_at: str
    user_id: str
    visibility: str


class CollectionRemoveMatch(TypedDict):
    id: str


class CollectionRecordRequired(TypedDict):
    data: dict
    id: str


class CollectionRecord(CollectionRecordRequired, total=False):
    app_user_id: str
    collection_id: str
    created_at: str
    created_by: str
    deleted_at: str
    project_id: str
    updated_at: str


class CollectionRecordLoadMatch(TypedDict):
    collection_id: str
    id: str


class CollectionRecordCreateDataRequired(TypedDict):
    slug: str
    data: dict
    id: str


class CollectionRecordCreateData(CollectionRecordCreateDataRequired, total=False):
    app_user_id: str
    collection_id: str
    created_at: str
    created_by: str
    deleted_at: str
    project_id: str
    updated_at: str


class CollectionRecordUpdateDataRequired(TypedDict):
    collection_id: str
    id: str


class CollectionRecordUpdateData(CollectionRecordUpdateDataRequired, total=False):
    app_user_id: str
    created_at: str
    created_by: str
    data: dict
    deleted_at: str
    project_id: str
    updated_at: str


class CollectionRecordListRequired(TypedDict):
    data: dict
    id: str


class CollectionRecordList(CollectionRecordListRequired, total=False):
    app_user_id: str
    collection_id: str
    created_at: str
    created_by: str
    deleted_at: str
    project_id: str
    updated_at: str


class CollectionRecordListListMatchRequired(TypedDict):
    slug: str


class CollectionRecordListListMatch(CollectionRecordListListMatchRequired, total=False):
    created_after: str
    created_before: str
    data_contain: str
    include_deleted: bool
    limit: int
    order: str
    page: int
    search: str


class Custom(TypedDict, total=False):
    id: str


class CustomLoadMatch(TypedDict):
    id: str


class CustomCreateData(TypedDict):
    id: str


class CustomUpdateData(TypedDict):
    id: str


class CustomRemoveMatch(TypedDict):
    id: str


class Legacy(TypedDict, total=False):
    id: str


class LegacyRemoveMatch(TypedDict):
    id: int


class LegacyMutation(TypedDict, total=False):
    createdAt: str
    id: str
    updatedAt: str


class LegacyMutationCreateData(TypedDict, total=False):
    createdAt: str
    id: str
    updatedAt: str


class LegacyMutationUpdateDataRequired(TypedDict):
    id: int


class LegacyMutationUpdateData(LegacyMutationUpdateDataRequired, total=False):
    createdAt: str
    updatedAt: str


class LegacyUnknownRequired(TypedDict):
    data: dict


class LegacyUnknown(LegacyUnknownRequired, total=False):
    id: str
    support: dict


class LegacyUnknownLoadMatch(TypedDict):
    id: int


class LegacyUnknownList(TypedDict):
    color: str
    id: int
    name: str
    pantone_value: str
    year: int


class LegacyUnknownListListMatch(TypedDict, total=False):
    page: int
    per_page: int


class LegacyUserRequired(TypedDict):
    data: dict


class LegacyUser(LegacyUserRequired, total=False):
    id: str
    support: dict


class LegacyUserLoadMatch(TypedDict):
    id: int


class LegacyUserList(TypedDict):
    avatar: str
    email: str
    first_name: str
    id: int
    last_name: str


class LegacyUserListListMatch(TypedDict, total=False):
    page: int
    per_page: int


class Login(TypedDict):
    email: str
    password: str
    token: str


class LoginCreateData(TypedDict):
    email: str
    password: str
    token: str


class RegisterRequired(TypedDict):
    email: str
    password: str
    token: str


class Register(RegisterRequired, total=False):
    id: int


class RegisterCreateDataRequired(TypedDict):
    email: str
    password: str
    token: str


class RegisterCreateData(RegisterCreateDataRequired, total=False):
    id: int
