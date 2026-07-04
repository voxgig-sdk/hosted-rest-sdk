# Typed models for the HostedRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class AgentHealth:
    data: dict


@dataclass
class AgentHealthLoadMatch:
    data: Optional[dict] = None


@dataclass
class AgentSandbox:
    email: str
    password: str


@dataclass
class AgentSandboxLoadMatch:
    scenario: str


@dataclass
class AgentSandboxCreateData:
    email: Optional[str] = None
    password: Optional[str] = None


@dataclass
class AgentUserDetail:
    data: dict


@dataclass
class AgentUserDetailLoadMatch:
    id: str


@dataclass
class AgentUserList:
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


@dataclass
class AgentUserListListMatch:
    created_at: Optional[str] = None
    email: Optional[str] = None
    full_name: Optional[str] = None
    id: Optional[str] = None
    locale: Optional[str] = None
    preference: Optional[dict] = None
    profile: Optional[dict] = None
    status: Optional[str] = None
    timezone: Optional[str] = None
    updated_at: Optional[str] = None


@dataclass
class AppUser:
    data: dict
    email: str
    id: str
    created_at: Optional[str] = None
    last_login_at: Optional[str] = None
    metadata: Optional[dict] = None
    status: Optional[str] = None


@dataclass
class AppUserLoadMatch:
    id: str


@dataclass
class AppUserListMatch:
    project_id: str


@dataclass
class AppUserCreateData:
    id: str


@dataclass
class AppUserUpdateData:
    id: str


@dataclass
class AppUserRemoveMatch:
    collection_id: str
    record_id: str
    id: str


@dataclass
class AppUserLogin:
    data: dict
    email: str
    metadata: Optional[dict] = None
    project_id: Optional[str] = None


@dataclass
class AppUserLoginCreateData:
    data: Optional[dict] = None
    email: Optional[str] = None
    metadata: Optional[dict] = None
    project_id: Optional[str] = None


@dataclass
class AppUserSession:
    data: dict


@dataclass
class AppUserSessionLoadMatch:
    data: Optional[dict] = None


@dataclass
class AppUserTotal:
    total: int


@dataclass
class AppUserTotalLoadMatch:
    project_id: str


@dataclass
class AppUserVerify:
    data: dict
    token: str


@dataclass
class AppUserVerifyCreateData:
    data: Optional[dict] = None
    token: Optional[str] = None


@dataclass
class Authentication:
    pass


@dataclass
class AuthenticationCreateData:
    pass


@dataclass
class Collection:
    data: dict
    id: str
    name: str
    created_at: Optional[str] = None
    project_id: Optional[str] = None
    schema: Optional[dict] = None
    slug: Optional[str] = None
    updated_at: Optional[str] = None
    user_id: Optional[str] = None
    visibility: Optional[str] = None


@dataclass
class CollectionLoadMatch:
    id: str


@dataclass
class CollectionListMatch:
    created_at: Optional[str] = None
    data: Optional[dict] = None
    id: Optional[str] = None
    name: Optional[str] = None
    project_id: Optional[str] = None
    schema: Optional[dict] = None
    slug: Optional[str] = None
    updated_at: Optional[str] = None
    user_id: Optional[str] = None
    visibility: Optional[str] = None


@dataclass
class CollectionCreateData:
    created_at: Optional[str] = None
    data: Optional[dict] = None
    id: Optional[str] = None
    name: Optional[str] = None
    project_id: Optional[str] = None
    schema: Optional[dict] = None
    slug: Optional[str] = None
    updated_at: Optional[str] = None
    user_id: Optional[str] = None
    visibility: Optional[str] = None


@dataclass
class CollectionUpdateData:
    id: str


@dataclass
class CollectionRemoveMatch:
    collection_id: str
    record_id: str
    id: str


@dataclass
class CollectionRecord:
    data: dict


@dataclass
class CollectionRecordLoadMatch:
    collection_id: str
    id: str


@dataclass
class CollectionRecordCreateData:
    slug: str


@dataclass
class CollectionRecordUpdateData:
    collection_id: str
    id: str


@dataclass
class CollectionRecordList:
    data: dict
    id: str
    app_user_id: Optional[str] = None
    collection_id: Optional[str] = None
    created_at: Optional[str] = None
    created_by: Optional[str] = None
    deleted_at: Optional[str] = None
    project_id: Optional[str] = None
    updated_at: Optional[str] = None


@dataclass
class CollectionRecordListListMatch:
    slug: str


@dataclass
class Custom:
    pass


@dataclass
class CustomLoadMatch:
    id: str


@dataclass
class CustomCreateData:
    id: str


@dataclass
class CustomUpdateData:
    id: str


@dataclass
class CustomRemoveMatch:
    id: str


@dataclass
class Legacy:
    pass


@dataclass
class LegacyRemoveMatch:
    id: int


@dataclass
class LegacyMutation:
    created_at: Optional[str] = None
    id: Optional[str] = None
    updated_at: Optional[str] = None


@dataclass
class LegacyMutationCreateData:
    created_at: Optional[str] = None
    id: Optional[str] = None
    updated_at: Optional[str] = None


@dataclass
class LegacyMutationUpdateData:
    id: int


@dataclass
class LegacyUnknown:
    data: dict
    support: Optional[dict] = None


@dataclass
class LegacyUnknownLoadMatch:
    id: int


@dataclass
class LegacyUnknownList:
    color: str
    id: int
    name: str
    pantone_value: str
    year: int


@dataclass
class LegacyUnknownListListMatch:
    color: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    pantone_value: Optional[str] = None
    year: Optional[int] = None


@dataclass
class LegacyUser:
    data: dict
    support: Optional[dict] = None


@dataclass
class LegacyUserLoadMatch:
    id: int


@dataclass
class LegacyUserList:
    avatar: str
    email: str
    first_name: str
    id: int
    last_name: str


@dataclass
class LegacyUserListListMatch:
    avatar: Optional[str] = None
    email: Optional[str] = None
    first_name: Optional[str] = None
    id: Optional[int] = None
    last_name: Optional[str] = None


@dataclass
class Login:
    email: str
    password: str
    token: str


@dataclass
class LoginCreateData:
    email: Optional[str] = None
    password: Optional[str] = None
    token: Optional[str] = None


@dataclass
class Register:
    email: str
    password: str
    token: str
    id: Optional[int] = None


@dataclass
class RegisterCreateData:
    email: Optional[str] = None
    id: Optional[int] = None
    password: Optional[str] = None
    token: Optional[str] = None

