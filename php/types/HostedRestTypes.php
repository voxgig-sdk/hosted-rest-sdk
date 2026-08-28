<?php
declare(strict_types=1);

// Typed models for the HostedRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AgentHealth entity data model. */
class AgentHealth
{
    public array $deprecations;
    public array $rate_limit_status;
    public string $status;
    public int $uptime_seconds;
    public string $version;
}

/** Request payload for AgentHealth#load. */
class AgentHealthLoadMatch
{
    public ?array $deprecations = null;
    public ?array $rate_limit_status = null;
    public ?string $status = null;
    public ?int $uptime_seconds = null;
    public ?string $version = null;
}

/** AgentSandbox entity data model. */
class AgentSandbox
{
    public string $email;
    public string $password;
}

/** Request payload for AgentSandbox#load. */
class AgentSandboxLoadMatch
{
    public string $scenario;
}

/** Request payload for AgentSandbox#create. */
class AgentSandboxCreateData
{
    public string $email;
    public string $password;
}

/** AgentUserDetail entity data model. */
class AgentUserDetail
{
    public string $created_at;
    public string $email;
    public string $full_name;
    public string $id;
    public string $locale;
    public array $preferences;
    public array $profile;
    public string $status;
    public string $timezone;
    public string $updated_at;
}

/** Request payload for AgentUserDetail#load. */
class AgentUserDetailLoadMatch
{
    public string $id;
    public ?string $expand = null;
}

/** AgentUserList entity data model. */
class AgentUserList
{
    public string $created_at;
    public string $email;
    public string $full_name;
    public string $id;
    public string $locale;
    public array $preferences;
    public array $profile;
    public string $status;
    public string $timezone;
    public string $updated_at;
}

/** Request payload for AgentUserList#list. */
class AgentUserListListMatch
{
    public ?string $cursor = null;
    public ?string $field = null;
    public ?int $limit = null;
    public ?int $seed = null;
}

/** AppUser entity data model. */
class AppUser
{
    public ?string $created_at = null;
    public string $email;
    public string $id;
    public ?string $last_login_at = null;
    public ?array $metadata = null;
    public ?string $status = null;
}

/** Request payload for AppUser#load. */
class AppUserLoadMatch
{
    public string $id;
}

/** Request payload for AppUser#list. */
class AppUserListMatch
{
    public ?int $limit = null;
}

/** Request payload for AppUser#create. */
class AppUserCreateData
{
    public ?string $created_at = null;
    public string $email;
    public string $id;
    public ?string $last_login_at = null;
    public ?array $metadata = null;
    public ?string $status = null;
}

/** Request payload for AppUser#update. */
class AppUserUpdateData
{
    public string $id;
    public ?string $created_at = null;
    public ?string $email = null;
    public ?string $last_login_at = null;
    public ?array $metadata = null;
    public ?string $status = null;
}

/** Request payload for AppUser#remove. */
class AppUserRemoveMatch
{
    public string $id;
}

/** AppUserLogin entity data model. */
class AppUserLogin
{
    public string $email;
    public ?array $metadata = null;
    public ?string $project_id = null;
}

/** Request payload for AppUserLogin#create. */
class AppUserLoginCreateData
{
    public string $email;
    public ?array $metadata = null;
    public ?string $project_id = null;
}

/** AppUserSession entity data model. */
class AppUserSession
{
}

/** Request payload for AppUserSession#load. */
class AppUserSessionLoadMatch
{
}

/** AppUserTotal entity data model. */
class AppUserTotal
{
    public int $total;
}

/** Request payload for AppUserTotal#load. */
class AppUserTotalLoadMatch
{
    public string $project_id;
}

/** AppUserVerify entity data model. */
class AppUserVerify
{
    public string $token;
}

/** Request payload for AppUserVerify#create. */
class AppUserVerifyCreateData
{
    public string $token;
}

/** Authentication entity data model. */
class Authentication
{
}

/** Request payload for Authentication#create. */
class AuthenticationCreateData
{
}

/** Collection entity data model. */
class Collection
{
    public ?string $created_at = null;
    public string $id;
    public string $name;
    public ?string $project_id = null;
    public ?array $schema = null;
    public string $slug;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?string $visibility = null;
}

/** Request payload for Collection#load. */
class CollectionLoadMatch
{
    public string $id;
}

/** Request payload for Collection#list. */
class CollectionListMatch
{
    public ?string $created_at = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $project_id = null;
    public ?array $schema = null;
    public ?string $slug = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?string $visibility = null;
}

/** Request payload for Collection#create. */
class CollectionCreateData
{
    public ?string $created_at = null;
    public string $id;
    public string $name;
    public ?string $project_id = null;
    public ?array $schema = null;
    public string $slug;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?string $visibility = null;
}

/** Request payload for Collection#update. */
class CollectionUpdateData
{
    public string $id;
    public ?string $created_at = null;
    public ?string $name = null;
    public ?string $project_id = null;
    public ?array $schema = null;
    public ?string $slug = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?string $visibility = null;
}

/** Request payload for Collection#remove. */
class CollectionRemoveMatch
{
    public string $id;
}

/** CollectionRecord entity data model. */
class CollectionRecord
{
    public ?string $app_user_id = null;
    public ?string $collection_id = null;
    public ?string $created_at = null;
    public ?string $created_by = null;
    public array $data;
    public ?string $deleted_at = null;
    public string $id;
    public ?string $project_id = null;
    public ?string $updated_at = null;
}

/** Request payload for CollectionRecord#load. */
class CollectionRecordLoadMatch
{
    public string $collection_id;
    public string $id;
}

/** Request payload for CollectionRecord#create. */
class CollectionRecordCreateData
{
    public string $slug;
    public ?string $app_user_id = null;
    public ?string $collection_id = null;
    public ?string $created_at = null;
    public ?string $created_by = null;
    public array $data;
    public ?string $deleted_at = null;
    public string $id;
    public ?string $project_id = null;
    public ?string $updated_at = null;
}

/** Request payload for CollectionRecord#update. */
class CollectionRecordUpdateData
{
    public string $collection_id;
    public string $id;
    public ?string $app_user_id = null;
    public ?string $created_at = null;
    public ?string $created_by = null;
    public ?array $data = null;
    public ?string $deleted_at = null;
    public ?string $project_id = null;
    public ?string $updated_at = null;
}

/** CollectionRecordList entity data model. */
class CollectionRecordList
{
    public ?string $app_user_id = null;
    public ?string $collection_id = null;
    public ?string $created_at = null;
    public ?string $created_by = null;
    public array $data;
    public ?string $deleted_at = null;
    public string $id;
    public ?string $project_id = null;
    public ?string $updated_at = null;
}

/** Request payload for CollectionRecordList#list. */
class CollectionRecordListListMatch
{
    public string $slug;
    public ?string $created_after = null;
    public ?string $created_before = null;
    public ?string $data_contain = null;
    public ?bool $include_deleted = null;
    public ?int $limit = null;
    public ?string $order = null;
    public ?int $page = null;
    public ?string $search = null;
}

/** Custom entity data model. */
class Custom
{
    public ?string $id = null;
}

/** Request payload for Custom#load. */
class CustomLoadMatch
{
    public string $id;
}

/** Request payload for Custom#create. */
class CustomCreateData
{
    public string $id;
}

/** Request payload for Custom#update. */
class CustomUpdateData
{
    public string $id;
}

/** Request payload for Custom#remove. */
class CustomRemoveMatch
{
    public string $id;
}

/** Legacy entity data model. */
class Legacy
{
    public ?string $id = null;
}

/** Request payload for Legacy#remove. */
class LegacyRemoveMatch
{
    public int $id;
}

/** LegacyMutation entity data model. */
class LegacyMutation
{
    public ?string $createdAt = null;
    public ?string $id = null;
    public ?string $updatedAt = null;
}

/** Request payload for LegacyMutation#create. */
class LegacyMutationCreateData
{
    public ?string $createdAt = null;
    public ?string $id = null;
    public ?string $updatedAt = null;
}

/** Request payload for LegacyMutation#update. */
class LegacyMutationUpdateData
{
    public int $id;
    public ?string $createdAt = null;
    public ?string $updatedAt = null;
}

/** LegacyUnknown entity data model. */
class LegacyUnknown
{
    public array $data;
    public ?string $id = null;
    public ?array $support = null;
}

/** Request payload for LegacyUnknown#load. */
class LegacyUnknownLoadMatch
{
    public int $id;
}

/** LegacyUnknownList entity data model. */
class LegacyUnknownList
{
    public string $color;
    public int $id;
    public string $name;
    public string $pantone_value;
    public int $year;
}

/** Request payload for LegacyUnknownList#list. */
class LegacyUnknownListListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
}

/** LegacyUser entity data model. */
class LegacyUser
{
    public array $data;
    public ?string $id = null;
    public ?array $support = null;
}

/** Request payload for LegacyUser#load. */
class LegacyUserLoadMatch
{
    public int $id;
}

/** LegacyUserList entity data model. */
class LegacyUserList
{
    public string $avatar;
    public string $email;
    public string $first_name;
    public int $id;
    public string $last_name;
}

/** Request payload for LegacyUserList#list. */
class LegacyUserListListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Login entity data model. */
class Login
{
    public string $email;
    public string $password;
    public string $token;
}

/** Request payload for Login#create. */
class LoginCreateData
{
    public string $email;
    public string $password;
    public string $token;
}

/** Register entity data model. */
class Register
{
    public string $email;
    public ?int $id = null;
    public string $password;
    public string $token;
}

/** Request payload for Register#create. */
class RegisterCreateData
{
    public string $email;
    public ?int $id = null;
    public string $password;
    public string $token;
}

