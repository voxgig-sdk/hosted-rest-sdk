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
    data: dict


class AgentHealthLoadMatch(TypedDict, total=False):
    data: dict


class AgentSandbox(TypedDict):
    email: str
    password: str


class AgentSandboxLoadMatch(TypedDict):
    scenario: str


class AgentSandboxCreateData(TypedDict):
    email: str
    password: str


class AgentUserDetail(TypedDict):
    data: dict


class AgentUserDetailLoadMatch(TypedDict):
    id: str


class AgentUserList(TypedDict):
    created_at: str
    email: str
    full_name: str
    id: str
    locale: str
    preference: dict
    profile: dict
    status: str
    timezone: str
    updated_at: str


class AgentUserListListMatch(TypedDict, total=False):
    created_at: str
    email: str
    full_name: str
    id: str
    locale: str
    preference: dict
    profile: dict
    status: str
    timezone: str
    updated_at: str


class AppUserRequired(TypedDict):
    data: dict
    email: str
    id: str


class AppUser(AppUserRequired, total=False):
    created_at: str
    last_login_at: str
    metadata: dict
    status: str


class AppUserLoadMatch(TypedDict):
    id: str


class AppUserListMatch(TypedDict):
    project_id: str


class AppUserCreateData(TypedDict):
    id: str


class AppUserUpdateData(TypedDict):
    id: str


class AppUserRemoveMatch(TypedDict):
    collection_id: str
    record_id: str
    id: str


class AppUserLoginRequired(TypedDict):
    data: dict
    email: str


class AppUserLogin(AppUserLoginRequired, total=False):
    metadata: dict
    project_id: str


class AppUserLoginCreateDataRequired(TypedDict):
    data: dict
    email: str


class AppUserLoginCreateData(AppUserLoginCreateDataRequired, total=False):
    metadata: dict
    project_id: str


class AppUserSession(TypedDict):
    data: dict


class AppUserSessionLoadMatch(TypedDict, total=False):
    data: dict


class AppUserTotal(TypedDict):
    total: int


class AppUserTotalLoadMatch(TypedDict):
    project_id: str


class AppUserVerify(TypedDict):
    data: dict
    token: str


class AppUserVerifyCreateData(TypedDict):
    data: dict
    token: str


class Authentication(TypedDict):
    pass


class AuthenticationCreateData(TypedDict):
    pass


class CollectionRequired(TypedDict):
    data: dict
    id: str
    name: str


class Collection(CollectionRequired, total=False):
    created_at: str
    project_id: str
    schema: dict
    slug: str
    updated_at: str
    user_id: str
    visibility: str


class CollectionLoadMatch(TypedDict):
    id: str


class CollectionListMatch(TypedDict, total=False):
    created_at: str
    data: dict
    id: str
    name: str
    project_id: str
    schema: dict
    slug: str
    updated_at: str
    user_id: str
    visibility: str


class CollectionCreateDataRequired(TypedDict):
    data: dict
    id: str
    name: str


class CollectionCreateData(CollectionCreateDataRequired, total=False):
    created_at: str
    project_id: str
    schema: dict
    slug: str
    updated_at: str
    user_id: str
    visibility: str


class CollectionUpdateData(TypedDict):
    id: str


class CollectionRemoveMatch(TypedDict):
    collection_id: str
    record_id: str
    id: str


class CollectionRecord(TypedDict):
    data: dict


class CollectionRecordLoadMatch(TypedDict):
    collection_id: str
    id: str


class CollectionRecordCreateData(TypedDict):
    slug: str


class CollectionRecordUpdateData(TypedDict):
    collection_id: str
    id: str


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


class CollectionRecordListListMatch(TypedDict):
    slug: str


class Custom(TypedDict):
    pass


class CustomLoadMatch(TypedDict):
    id: str


class CustomCreateData(TypedDict):
    id: str


class CustomUpdateData(TypedDict):
    id: str


class CustomRemoveMatch(TypedDict):
    id: str


class Legacy(TypedDict):
    pass


class LegacyRemoveMatch(TypedDict):
    id: int


class LegacyMutation(TypedDict, total=False):
    created_at: str
    id: str
    updated_at: str


class LegacyMutationCreateData(TypedDict, total=False):
    created_at: str
    id: str
    updated_at: str


class LegacyMutationUpdateData(TypedDict):
    id: int


class LegacyUnknownRequired(TypedDict):
    data: dict


class LegacyUnknown(LegacyUnknownRequired, total=False):
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
    color: str
    id: int
    name: str
    pantone_value: str
    year: int


class LegacyUserRequired(TypedDict):
    data: dict


class LegacyUser(LegacyUserRequired, total=False):
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
    avatar: str
    email: str
    first_name: str
    id: int
    last_name: str


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
