# HostedRest PHP SDK



The PHP SDK for the HostedRest API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->AgentHealth()` — with named operations (`list`/`load`/`create`/`update`/`remove`/`patch`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/hosted-rest-sdk/releases](https://github.com/voxgig-sdk/hosted-rest-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'hostedrest_sdk.php';

$client = new HostedRestSDK([
    "apikey" => getenv("HOSTED_REST_APIKEY"),
]);
```

### 3. Load an appusertotal

AppUserTotal is nested under project, so provide the `project_id`.

```php
try {
    // load() returns the bare AppUserTotal record (throws on error).
    $appusertotal = $client->AppUserTotal()->load(["project_id" => "example_project_id"]);
    print_r($appusertotal);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $agenthealth = $client->AgentHealth()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = HostedRestSDK::test();

// Entity ops return the bare mock record (throws on error).
$agenthealth = $client->AgentHealth()->load();
print_r($agenthealth);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new HostedRestSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
HOSTED_REST_TEST_LIVE=TRUE
HOSTED_REST_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### HostedRestSDK

```php
require_once 'hostedrest_sdk.php';
$client = new HostedRestSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = HostedRestSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### HostedRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `AgentHealth` | `($data): AgentHealthEntity` | Create an AgentHealth entity instance. |
| `AgentSandbox` | `($data): AgentSandboxEntity` | Create an AgentSandbox entity instance. |
| `AgentUserDetail` | `($data): AgentUserDetailEntity` | Create an AgentUserDetail entity instance. |
| `AgentUserList` | `($data): AgentUserListEntity` | Create an AgentUserList entity instance. |
| `AppUser` | `($data): AppUserEntity` | Create an AppUser entity instance. |
| `AppUserLogin` | `($data): AppUserLoginEntity` | Create an AppUserLogin entity instance. |
| `AppUserSession` | `($data): AppUserSessionEntity` | Create an AppUserSession entity instance. |
| `AppUserTotal` | `($data): AppUserTotalEntity` | Create an AppUserTotal entity instance. |
| `AppUserVerify` | `($data): AppUserVerifyEntity` | Create an AppUserVerify entity instance. |
| `Authentication` | `($data): AuthenticationEntity` | Create an Authentication entity instance. |
| `Collection` | `($data): CollectionEntity` | Create a Collection entity instance. |
| `CollectionRecord` | `($data): CollectionRecordEntity` | Create a CollectionRecord entity instance. |
| `CollectionRecordList` | `($data): CollectionRecordListEntity` | Create a CollectionRecordList entity instance. |
| `Custom` | `($data): CustomEntity` | Create a Custom entity instance. |
| `Legacy` | `($data): LegacyEntity` | Create a Legacy entity instance. |
| `LegacyMutation` | `($data): LegacyMutationEntity` | Create a LegacyMutation entity instance. |
| `LegacyUnknown` | `($data): LegacyUnknownEntity` | Create a LegacyUnknown entity instance. |
| `LegacyUnknownList` | `($data): LegacyUnknownListEntity` | Create a LegacyUnknownList entity instance. |
| `LegacyUser` | `($data): LegacyUserEntity` | Create a LegacyUser entity instance. |
| `LegacyUserList` | `($data): LegacyUserListEntity` | Create a LegacyUserList entity instance. |
| `Login` | `($data): LoginEntity` | Create a Login entity instance. |
| `Register` | `($data): RegisterEntity` | Create a Register entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### AgentHealth

| Field | Description |
| --- | --- |
| `data` |  |

Operations: Load.

API path: `/agent/v1/health`

#### AgentSandbox

| Field | Description |
| --- | --- |
| `email` |  |
| `password` |  |

Operations: Create, Load.

API path: `/agent/v1/auth/login`

#### AgentUserDetail

| Field | Description |
| --- | --- |
| `data` |  |

Operations: Load.

API path: `/agent/v1/users/{id}`

#### AgentUserList

| Field | Description |
| --- | --- |
| `created_at` |  |
| `email` |  |
| `full_name` |  |
| `id` |  |
| `locale` |  |
| `preference` |  |
| `profile` |  |
| `status` |  |
| `timezone` |  |
| `updated_at` |  |

Operations: List.

API path: `/agent/v1/users`

#### AppUser

| Field | Description |
| --- | --- |
| `created_at` |  |
| `data` |  |
| `email` |  |
| `id` |  |
| `last_login_at` |  |
| `metadata` |  |
| `status` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/app-users/{id}/sessions/simulate`

#### AppUserLogin

| Field | Description |
| --- | --- |
| `data` |  |
| `email` |  |
| `metadata` |  |
| `project_id` |  |

Operations: Create.

API path: `/api/app-users/login`

#### AppUserSession

| Field | Description |
| --- | --- |
| `data` |  |

Operations: Load.

API path: `/api/app-users/me`

#### AppUserTotal

| Field | Description |
| --- | --- |
| `total` |  |

Operations: Load.

API path: `/api/projects/{projectId}/app-users/total`

#### AppUserVerify

| Field | Description |
| --- | --- |
| `data` |  |
| `token` |  |

Operations: Create.

API path: `/api/app-users/verify`

#### Authentication

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/logout`

#### Collection

| Field | Description |
| --- | --- |
| `created_at` |  |
| `data` |  |
| `id` |  |
| `name` |  |
| `project_id` |  |
| `schema` |  |
| `slug` |  |
| `updated_at` |  |
| `user_id` |  |
| `visibility` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/collections`

#### CollectionRecord

| Field | Description |
| --- | --- |
| `data` |  |

Operations: Create, Load, Update.

API path: `/api/collections/{slug}/records`

#### CollectionRecordList

| Field | Description |
| --- | --- |
| `app_user_id` |  |
| `collection_id` |  |
| `created_at` |  |
| `created_by` |  |
| `data` |  |
| `deleted_at` |  |
| `id` |  |
| `project_id` |  |
| `updated_at` |  |

Operations: List.

API path: `/api/collections/{slug}/records`

#### Custom

| Field | Description |
| --- | --- |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/custom/{path}`

#### Legacy

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/api/users/{id}`

#### LegacyMutation

| Field | Description |
| --- | --- |
| `created_at` |  |
| `id` |  |
| `updated_at` |  |

Operations: Create, Patch, Update.

API path: `/api/users`

#### LegacyUnknown

| Field | Description |
| --- | --- |
| `data` |  |
| `support` |  |

Operations: Load.

API path: `/api/unknown/{id}`

#### LegacyUnknownList

| Field | Description |
| --- | --- |
| `color` |  |
| `id` |  |
| `name` |  |
| `pantone_value` |  |
| `year` |  |

Operations: List.

API path: `/api/unknown`

#### LegacyUser

| Field | Description |
| --- | --- |
| `data` |  |
| `support` |  |

Operations: Load.

API path: `/api/users/{id}`

#### LegacyUserList

| Field | Description |
| --- | --- |
| `avatar` |  |
| `email` |  |
| `first_name` |  |
| `id` |  |
| `last_name` |  |

Operations: List.

API path: `/api/users`

#### Login

| Field | Description |
| --- | --- |
| `email` |  |
| `password` |  |
| `token` |  |

Operations: Create.

API path: `/api/login`

#### Register

| Field | Description |
| --- | --- |
| `email` |  |
| `id` |  |
| `password` |  |
| `token` |  |

Operations: Create.

API path: `/api/register`



## Entities


### AgentHealth

Create an instance: `$agent_health = $client->AgentHealth();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |

#### Example: Load

```php
// load() returns the bare AgentHealth record (throws on error).
$agent_health = $client->AgentHealth()->load();
```


### AgentSandbox

Create an instance: `$agent_sandbox = $client->AgentSandbox();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `password` | `string` |  |

#### Example: Load

```php
// load() returns the bare AgentSandbox record (throws on error).
$agent_sandbox = $client->AgentSandbox()->load();
```

#### Example: Create

```php
$agent_sandbox = $client->AgentSandbox()->create([
    "email" => null, // string
    "password" => null, // string
]);
```


### AgentUserDetail

Create an instance: `$agent_user_detail = $client->AgentUserDetail();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |

#### Example: Load

```php
// load() returns the bare AgentUserDetail record (throws on error).
$agent_user_detail = $client->AgentUserDetail()->load(["id" => "agent_user_detail_id"]);
```


### AgentUserList

Create an instance: `$agent_user_list = $client->AgentUserList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `email` | `string` |  |
| `full_name` | `string` |  |
| `id` | `string` |  |
| `locale` | `string` |  |
| `preference` | `array` |  |
| `profile` | `array` |  |
| `status` | `string` |  |
| `timezone` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentUserList records (throws on error).
$agent_user_lists = $client->AgentUserList()->list();
```


### AppUser

Create an instance: `$app_user = $client->AppUser();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `data` | `array` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `last_login_at` | `string` |  |
| `metadata` | `array` |  |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the bare AppUser record (throws on error).
$app_user = $client->AppUser()->load(["id" => "app_user_id"]);
```

#### Example: List

```php
// list() returns an array of AppUser records (throws on error).
$app_users = $client->AppUser()->list();
```

#### Example: Create

```php
$app_user = $client->AppUser()->create([
    "data" => null, // array
    "email" => null, // string
    "id" => null, // string
]);
```


### AppUserLogin

Create an instance: `$app_user_login = $client->AppUserLogin();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `email` | `string` |  |
| `metadata` | `array` |  |
| `project_id` | `string` |  |

#### Example: Create

```php
$app_user_login = $client->AppUserLogin()->create([
    "data" => null, // array
    "email" => null, // string
]);
```


### AppUserSession

Create an instance: `$app_user_session = $client->AppUserSession();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |

#### Example: Load

```php
// load() returns the bare AppUserSession record (throws on error).
$app_user_session = $client->AppUserSession()->load();
```


### AppUserTotal

Create an instance: `$app_user_total = $client->AppUserTotal();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `total` | `int` |  |

#### Example: Load

```php
// load() returns the bare AppUserTotal record (throws on error).
$app_user_total = $client->AppUserTotal()->load(["project_id" => "project_id"]);
```


### AppUserVerify

Create an instance: `$app_user_verify = $client->AppUserVerify();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `token` | `string` |  |

#### Example: Create

```php
$app_user_verify = $client->AppUserVerify()->create([
    "data" => null, // array
    "token" => null, // string
]);
```


### Authentication

Create an instance: `$authentication = $client->Authentication();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$authentication = $client->Authentication()->create([
]);
```


### Collection

Create an instance: `$collection = $client->Collection();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `data` | `array` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `schema` | `array` |  |
| `slug` | `string` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `visibility` | `string` |  |

#### Example: Load

```php
// load() returns the bare Collection record (throws on error).
$collection = $client->Collection()->load(["id" => "collection_id"]);
```

#### Example: List

```php
// list() returns an array of Collection records (throws on error).
$collections = $client->Collection()->list();
```

#### Example: Create

```php
$collection = $client->Collection()->create([
    "data" => null, // array
    "id" => null, // string
    "name" => null, // string
]);
```


### CollectionRecord

Create an instance: `$collection_record = $client->CollectionRecord();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |

#### Example: Load

```php
// load() returns the bare CollectionRecord record (throws on error).
$collection_record = $client->CollectionRecord()->load(["id" => "collection_record_id", "collection_id" => "collection_id"]);
```

#### Example: Create

```php
$collection_record = $client->CollectionRecord()->create([
    "slug" => null, // string
]);
```


### CollectionRecordList

Create an instance: `$collection_record_list = $client->CollectionRecordList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_user_id` | `string` |  |
| `collection_id` | `string` |  |
| `created_at` | `string` |  |
| `created_by` | `string` |  |
| `data` | `array` |  |
| `deleted_at` | `string` |  |
| `id` | `string` |  |
| `project_id` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```php
// list() returns an array of CollectionRecordList records (throws on error).
$collection_record_lists = $client->CollectionRecordList()->list();
```


### Custom

Create an instance: `$custom = $client->Custom();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```php
// load() returns the bare Custom record (throws on error).
$custom = $client->Custom()->load(["id" => "custom_id"]);
```

#### Example: Create

```php
$custom = $client->Custom()->create([
    "id" => null, // string
]);
```


### Legacy

Create an instance: `$legacy = $client->Legacy();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### LegacyMutation

Create an instance: `$legacy_mutation = $client->LegacyMutation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Create

```php
$legacy_mutation = $client->LegacyMutation()->create([
]);
```


### LegacyUnknown

Create an instance: `$legacy_unknown = $client->LegacyUnknown();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `support` | `array` |  |

#### Example: Load

```php
// load() returns the bare LegacyUnknown record (throws on error).
$legacy_unknown = $client->LegacyUnknown()->load(["id" => 1]);
```


### LegacyUnknownList

Create an instance: `$legacy_unknown_list = $client->LegacyUnknownList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `pantone_value` | `string` |  |
| `year` | `int` |  |

#### Example: List

```php
// list() returns an array of LegacyUnknownList records (throws on error).
$legacy_unknown_lists = $client->LegacyUnknownList()->list();
```


### LegacyUser

Create an instance: `$legacy_user = $client->LegacyUser();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `support` | `array` |  |

#### Example: Load

```php
// load() returns the bare LegacyUser record (throws on error).
$legacy_user = $client->LegacyUser()->load(["id" => 1]);
```


### LegacyUserList

Create an instance: `$legacy_user_list = $client->LegacyUserList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | `string` |  |
| `email` | `string` |  |
| `first_name` | `string` |  |
| `id` | `int` |  |
| `last_name` | `string` |  |

#### Example: List

```php
// list() returns an array of LegacyUserList records (throws on error).
$legacy_user_lists = $client->LegacyUserList()->list();
```


### Login

Create an instance: `$login = $client->Login();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `password` | `string` |  |
| `token` | `string` |  |

#### Example: Create

```php
$login = $client->Login()->create([
    "email" => null, // string
    "password" => null, // string
    "token" => null, // string
]);
```


### Register

Create an instance: `$register = $client->Register();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `id` | `int` |  |
| `password` | `string` |  |
| `token` | `string` |  |

#### Example: Create

```php
$register = $client->Register()->create([
    "email" => null, // string
    "password" => null, // string
    "token" => null, // string
]);
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── hostedrest_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`hostedrest_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$agenthealth = $client->AgentHealth();
$agenthealth->load();

// $agenthealth->data_get() now returns the agenthealth data from the last load
// $agenthealth->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
