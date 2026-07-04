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
    public array $data;
}

/** Match filter for AgentHealth#load (any subset of AgentHealth fields). */
class AgentHealthLoadMatch
{
    public ?array $data = null;
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

/** Match filter for AgentSandbox#create (any subset of AgentSandbox fields). */
class AgentSandboxCreateData
{
    public ?string $email = null;
    public ?string $password = null;
}

/** AgentUserDetail entity data model. */
class AgentUserDetail
{
    public array $data;
}

/** Request payload for AgentUserDetail#load. */
class AgentUserDetailLoadMatch
{
    public string $id;
}

/** AgentUserList entity data model. */
class AgentUserList
{
    public string $created_at;
    public string $email;
    public string $full_name;
    public string $id;
    public string $locale;
    public array $preference;
    public array $profile;
    public string $status;
    public string $timezone;
    public string $updated_at;
}

/** Match filter for AgentUserList#list (any subset of AgentUserList fields). */
class AgentUserListListMatch
{
    public ?string $created_at = null;
    public ?string $email = null;
    public ?string $full_name = null;
    public ?string $id = null;
    public ?string $locale = null;
    public ?array $preference = null;
    public ?array $profile = null;
    public ?string $status = null;
    public ?string $timezone = null;
    public ?string $updated_at = null;
}

/** AppUser entity data model. */
class AppUser
{
    public ?string $created_at = null;
    public array $data;
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
    public string $project_id;
}

/** Request payload for AppUser#create. */
class AppUserCreateData
{
    public string $id;
}

/** Request payload for AppUser#update. */
class AppUserUpdateData
{
    public string $id;
}

/** Request payload for AppUser#remove. */
class AppUserRemoveMatch
{
    public string $collection_id;
    public string $record_id;
    public string $id;
}

/** AppUserLogin entity data model. */
class AppUserLogin
{
    public array $data;
    public string $email;
    public ?array $metadata = null;
    public ?string $project_id = null;
}

/** Match filter for AppUserLogin#create (any subset of AppUserLogin fields). */
class AppUserLoginCreateData
{
    public ?array $data = null;
    public ?string $email = null;
    public ?array $metadata = null;
    public ?string $project_id = null;
}

/** AppUserSession entity data model. */
class AppUserSession
{
    public array $data;
}

/** Match filter for AppUserSession#load (any subset of AppUserSession fields). */
class AppUserSessionLoadMatch
{
    public ?array $data = null;
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
    public array $data;
    public string $token;
}

/** Match filter for AppUserVerify#create (any subset of AppUserVerify fields). */
class AppUserVerifyCreateData
{
    public ?array $data = null;
    public ?string $token = null;
}

/** Authentication entity data model. */
class Authentication
{
}

/** Match filter for Authentication#create (any subset of Authentication fields). */
class AuthenticationCreateData
{
}

/** Collection entity data model. */
class Collection
{
    public ?string $created_at = null;
    public array $data;
    public string $id;
    public string $name;
    public ?string $project_id = null;
    public ?array $schema = null;
    public ?string $slug = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?string $visibility = null;
}

/** Request payload for Collection#load. */
class CollectionLoadMatch
{
    public string $id;
}

/** Match filter for Collection#list (any subset of Collection fields). */
class CollectionListMatch
{
    public ?string $created_at = null;
    public ?array $data = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $project_id = null;
    public ?array $schema = null;
    public ?string $slug = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?string $visibility = null;
}

/** Match filter for Collection#create (any subset of Collection fields). */
class CollectionCreateData
{
    public ?string $created_at = null;
    public ?array $data = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $project_id = null;
    public ?array $schema = null;
    public ?string $slug = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?string $visibility = null;
}

/** Request payload for Collection#update. */
class CollectionUpdateData
{
    public string $id;
}

/** Request payload for Collection#remove. */
class CollectionRemoveMatch
{
    public string $collection_id;
    public string $record_id;
    public string $id;
}

/** CollectionRecord entity data model. */
class CollectionRecord
{
    public array $data;
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
}

/** Request payload for CollectionRecord#update. */
class CollectionRecordUpdateData
{
    public string $collection_id;
    public string $id;
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
}

/** Custom entity data model. */
class Custom
{
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
}

/** Request payload for Legacy#remove. */
class LegacyRemoveMatch
{
    public int $id;
}

/** LegacyMutation entity data model. */
class LegacyMutation
{
    public ?string $created_at = null;
    public ?string $id = null;
    public ?string $updated_at = null;
}

/** Match filter for LegacyMutation#create (any subset of LegacyMutation fields). */
class LegacyMutationCreateData
{
    public ?string $created_at = null;
    public ?string $id = null;
    public ?string $updated_at = null;
}

/** Request payload for LegacyMutation#update. */
class LegacyMutationUpdateData
{
    public int $id;
}

/** LegacyUnknown entity data model. */
class LegacyUnknown
{
    public array $data;
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

/** Match filter for LegacyUnknownList#list (any subset of LegacyUnknownList fields). */
class LegacyUnknownListListMatch
{
    public ?string $color = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $pantone_value = null;
    public ?int $year = null;
}

/** LegacyUser entity data model. */
class LegacyUser
{
    public array $data;
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

/** Match filter for LegacyUserList#list (any subset of LegacyUserList fields). */
class LegacyUserListListMatch
{
    public ?string $avatar = null;
    public ?string $email = null;
    public ?string $first_name = null;
    public ?int $id = null;
    public ?string $last_name = null;
}

/** Login entity data model. */
class Login
{
    public string $email;
    public string $password;
    public string $token;
}

/** Match filter for Login#create (any subset of Login fields). */
class LoginCreateData
{
    public ?string $email = null;
    public ?string $password = null;
    public ?string $token = null;
}

/** Register entity data model. */
class Register
{
    public string $email;
    public ?int $id = null;
    public string $password;
    public string $token;
}

/** Match filter for Register#create (any subset of Register fields). */
class RegisterCreateData
{
    public ?string $email = null;
    public ?int $id = null;
    public ?string $password = null;
    public ?string $token = null;
}

