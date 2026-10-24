<?php
declare(strict_types=1);

// Typed models for the HostedRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
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

/** AgentUser entity data model. */
class AgentUser
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

/** Request payload for AgentUser#load. */
class AgentUserLoadMatch
{
    public string $id;
    public ?string $expand = null;
}

/** Request payload for AgentUser#list. */
class AgentUserListMatch
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
    public string $email;
    public ?array $metadata = null;
}

/** Request payload for AppUser#update. */
class AppUserUpdateData
{
    public string $id;
    public ?string $email = null;
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
    public string $name;
    public ?string $project_id = null;
    public ?array $schema = null;
    public ?string $slug = null;
    public ?string $visibility = null;
}

/** Request payload for Collection#update. */
class CollectionUpdateData
{
    public string $id;
    public ?string $name = null;
    public ?array $schema = null;
    public ?string $slug = null;
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
    public string $id;
    public string $slug;
}

/** Request payload for CollectionRecord#list. */
class CollectionRecordListMatch
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

/** Request payload for CollectionRecord#create. */
class CollectionRecordCreateData
{
    public string $slug;
    public array $data;
}

/** Request payload for CollectionRecord#update. */
class CollectionRecordUpdateData
{
    public string $id;
    public string $slug;
    public ?array $data = null;
}

/** Request payload for CollectionRecord#remove. */
class CollectionRecordRemoveMatch
{
    public string $id;
    public string $slug;
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

/** Request payload for Custom#patch. */
class CustomPatchData
{
    public string $id;
}

/** Request payload for Custom#remove. */
class CustomRemoveMatch
{
    public string $id;
}

/** LegacyMutation entity data model. */
class LegacyMutation
{
    public string $avatar;
    public ?string $createdAt = null;
    public string $email;
    public string $first_name;
    public ?string $id = null;
    public string $last_name;
    public ?string $updatedAt = null;
}

/** Request payload for LegacyMutation#list. */
class LegacyMutationListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Request payload for LegacyMutation#create. */
class LegacyMutationCreateData
{
}

/** Request payload for LegacyMutation#update. */
class LegacyMutationUpdateData
{
    public int $id;
}

/** Request payload for LegacyMutation#patch. */
class LegacyMutationPatchData
{
    public int $id;
}

/** LegacyUnknown entity data model. */
class LegacyUnknown
{
    public string $color;
    public array $data;
    public int $id;
    public string $name;
    public string $pantone_value;
    public ?array $support = null;
    public int $year;
}

/** Request payload for LegacyUnknown#load. */
class LegacyUnknownLoadMatch
{
    public int $id;
}

/** Request payload for LegacyUnknown#list. */
class LegacyUnknownListMatch
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

/** Request payload for LegacyUser#remove. */
class LegacyUserRemoveMatch
{
    public int $id;
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
    public string $password;
}

