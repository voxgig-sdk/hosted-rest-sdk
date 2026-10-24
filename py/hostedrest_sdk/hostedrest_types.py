# Typed models for the HostedRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
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


class AgentUser(TypedDict):
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


class AgentUserLoadMatchRequired(TypedDict):
    id: str


class AgentUserLoadMatch(AgentUserLoadMatchRequired, total=False):
    expand: str


class AgentUserListMatch(TypedDict, total=False):
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


class AppUserCreateData(AppUserCreateDataRequired, total=False):
    metadata: dict


class AppUserUpdateDataRequired(TypedDict):
    id: str


class AppUserUpdateData(AppUserUpdateDataRequired, total=False):
    email: str
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
    name: str


class CollectionCreateData(CollectionCreateDataRequired, total=False):
    project_id: str
    schema: dict
    slug: str
    visibility: str


class CollectionUpdateDataRequired(TypedDict):
    id: str


class CollectionUpdateData(CollectionUpdateDataRequired, total=False):
    name: str
    schema: dict
    slug: str
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
    id: str
    slug: str


class CollectionRecordListMatchRequired(TypedDict):
    slug: str


class CollectionRecordListMatch(CollectionRecordListMatchRequired, total=False):
    created_after: str
    created_before: str
    data_contain: str
    include_deleted: bool
    limit: int
    order: str
    page: int
    search: str


class CollectionRecordCreateData(TypedDict):
    slug: str
    data: dict


class CollectionRecordUpdateDataRequired(TypedDict):
    id: str
    slug: str


class CollectionRecordUpdateData(CollectionRecordUpdateDataRequired, total=False):
    data: dict


class CollectionRecordRemoveMatch(TypedDict):
    id: str
    slug: str


class Custom(TypedDict, total=False):
    id: str


class CustomLoadMatch(TypedDict):
    id: str


class CustomCreateData(TypedDict):
    id: str


class CustomUpdateData(TypedDict):
    id: str


class CustomPatchData(TypedDict):
    id: str


class CustomRemoveMatch(TypedDict):
    id: str


class LegacyMutationRequired(TypedDict):
    avatar: str
    email: str
    first_name: str
    last_name: str


class LegacyMutation(LegacyMutationRequired, total=False):
    createdAt: str
    id: str
    updatedAt: str


class LegacyMutationListMatch(TypedDict, total=False):
    page: int
    per_page: int


class LegacyMutationCreateData(TypedDict):
    pass


class LegacyMutationUpdateData(TypedDict):
    id: int


class LegacyMutationPatchData(TypedDict):
    id: int


class LegacyUnknownRequired(TypedDict):
    color: str
    data: dict
    id: int
    name: str
    pantone_value: str
    year: int


class LegacyUnknown(LegacyUnknownRequired, total=False):
    support: dict


class LegacyUnknownLoadMatch(TypedDict):
    id: int


class LegacyUnknownListMatch(TypedDict, total=False):
    page: int
    per_page: int


class LegacyUserRequired(TypedDict):
    data: dict


class LegacyUser(LegacyUserRequired, total=False):
    id: str
    support: dict


class LegacyUserLoadMatch(TypedDict):
    id: int


class LegacyUserRemoveMatch(TypedDict):
    id: int


class Login(TypedDict):
    email: str
    password: str
    token: str


class LoginCreateData(TypedDict):
    email: str
    password: str


class RegisterRequired(TypedDict):
    email: str
    password: str
    token: str


class Register(RegisterRequired, total=False):
    id: int


class RegisterCreateData(TypedDict):
    email: str
    password: str
