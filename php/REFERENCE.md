# HostedRest PHP SDK Reference

Complete API reference for the HostedRest PHP SDK.


## HostedRestSDK

### Constructor

```php
require_once __DIR__ . '/hostedrest_sdk.php';

$client = new HostedRestSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HostedRestSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = HostedRestSDK::test();
```


### Instance Methods

#### `AgentHealth($data = null)`

Create a new `AgentHealthEntity` instance. Pass `null` for no initial data.

#### `AgentSandbox($data = null)`

Create a new `AgentSandboxEntity` instance. Pass `null` for no initial data.

#### `AgentUserDetail($data = null)`

Create a new `AgentUserDetailEntity` instance. Pass `null` for no initial data.

#### `AgentUserList($data = null)`

Create a new `AgentUserListEntity` instance. Pass `null` for no initial data.

#### `AppUser($data = null)`

Create a new `AppUserEntity` instance. Pass `null` for no initial data.

#### `AppUserLogin($data = null)`

Create a new `AppUserLoginEntity` instance. Pass `null` for no initial data.

#### `AppUserSession($data = null)`

Create a new `AppUserSessionEntity` instance. Pass `null` for no initial data.

#### `AppUserTotal($data = null)`

Create a new `AppUserTotalEntity` instance. Pass `null` for no initial data.

#### `AppUserVerify($data = null)`

Create a new `AppUserVerifyEntity` instance. Pass `null` for no initial data.

#### `Authentication($data = null)`

Create a new `AuthenticationEntity` instance. Pass `null` for no initial data.

#### `Collection($data = null)`

Create a new `CollectionEntity` instance. Pass `null` for no initial data.

#### `CollectionRecord($data = null)`

Create a new `CollectionRecordEntity` instance. Pass `null` for no initial data.

#### `CollectionRecordList($data = null)`

Create a new `CollectionRecordListEntity` instance. Pass `null` for no initial data.

#### `Custom($data = null)`

Create a new `CustomEntity` instance. Pass `null` for no initial data.

#### `Legacy($data = null)`

Create a new `LegacyEntity` instance. Pass `null` for no initial data.

#### `LegacyMutation($data = null)`

Create a new `LegacyMutationEntity` instance. Pass `null` for no initial data.

#### `LegacyUnknown($data = null)`

Create a new `LegacyUnknownEntity` instance. Pass `null` for no initial data.

#### `LegacyUnknownList($data = null)`

Create a new `LegacyUnknownListEntity` instance. Pass `null` for no initial data.

#### `LegacyUser($data = null)`

Create a new `LegacyUserEntity` instance. Pass `null` for no initial data.

#### `LegacyUserList($data = null)`

Create a new `LegacyUserListEntity` instance. Pass `null` for no initial data.

#### `Login($data = null)`

Create a new `LoginEntity` instance. Pass `null` for no initial data.

#### `Register($data = null)`

Create a new `RegisterEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): HostedRestUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AgentHealthEntity

```php
$agent_health = $client->AgentHealth();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecations` | `array` | Yes |  |
| `rate_limit_status` | `array` | Yes |  |
| `status` | `string` | Yes |  |
| `uptime_seconds` | `int` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->AgentHealth()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentHealthEntity`

Create a new `AgentHealthEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentSandboxEntity

```php
$agent_sandbox = $client->AgentSandbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `password` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->AgentSandbox()->create([
  "email" => null, // string
  "password" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->AgentSandbox()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentSandboxEntity`

Create a new `AgentSandboxEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentUserDetailEntity

```php
$agent_user_detail = $client->AgentUserDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `full_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `locale` | `string` | Yes |  |
| `preferences` | `array` | Yes |  |
| `profile` | `array` | Yes |  |
| `status` | `string` | Yes |  |
| `timezone` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->AgentUserDetail()->load(["id" => "agent_user_detail_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentUserDetailEntity`

Create a new `AgentUserDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentUserListEntity

```php
$agent_user_list = $client->AgentUserList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `full_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `locale` | `string` | Yes |  |
| `preferences` | `array` | Yes |  |
| `profile` | `array` | Yes |  |
| `status` | `string` | Yes |  |
| `timezone` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->AgentUserList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentUserListEntity`

Create a new `AgentUserListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppUserEntity

```php
$app_user = $client->AppUser();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `email` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_login_at` | `string` | No |  |
| `metadata` | `array` | No |  |
| `status` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `email` | - | - | - | Yes | - |
| `id` | - | - | - | - | - |
| `last_login_at` | - | - | - | - | - |
| `metadata` | - | - | - | - | - |
| `status` | - | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->AppUser()->create([
  "email" => null, // string
  "id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->AppUser()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->AppUser()->load(["id" => "app_user_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->AppUser()->remove(["id" => "app_user_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->AppUser()->update([
  "id" => "app_user_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppUserEntity`

Create a new `AppUserEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppUserLoginEntity

```php
$app_user_login = $client->AppUserLogin();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `metadata` | `array` | No |  |
| `project_id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->AppUserLogin()->create([
  "email" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppUserLoginEntity`

Create a new `AppUserLoginEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppUserSessionEntity

```php
$app_user_session = $client->AppUserSession();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->AppUserSession()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppUserSessionEntity`

Create a new `AppUserSessionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppUserTotalEntity

```php
$app_user_total = $client->AppUserTotal();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `total` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->AppUserTotal()->load(["project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppUserTotalEntity`

Create a new `AppUserTotalEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppUserVerifyEntity

```php
$app_user_verify = $client->AppUserVerify();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->AppUserVerify()->create([
  "token" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppUserVerifyEntity`

Create a new `AppUserVerifyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AuthenticationEntity

```php
$authentication = $client->Authentication();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Authentication()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AuthenticationEntity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CollectionEntity

```php
$collection = $client->Collection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `project_id` | `string` | No |  |
| `schema` | `array` | No |  |
| `slug` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `user_id` | `string` | No |  |
| `visibility` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `project_id` | - | - | - | - | - |
| `schema` | - | - | - | - | - |
| `slug` | - | - | Yes | Yes | - |
| `updated_at` | - | - | - | - | - |
| `user_id` | - | - | - | - | - |
| `visibility` | - | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Collection()->create([
  "id" => null, // string
  "name" => null, // string
  "slug" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Collection()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Collection()->load(["id" => "collection_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Collection()->remove(["id" => "collection_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Collection()->update([
  "id" => "collection_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CollectionEntity`

Create a new `CollectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CollectionRecordEntity

```php
$collection_record = $client->CollectionRecord();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_user_id` | `string` | No |  |
| `collection_id` | `string` | No |  |
| `created_at` | `string` | No |  |
| `created_by` | `string` | No |  |
| `data` | `array` | Yes |  |
| `deleted_at` | `string` | No |  |
| `id` | `string` | Yes |  |
| `project_id` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CollectionRecord()->create([
  "slug" => null, // string
  "data" => null, // array
  "id" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CollectionRecord()->load(["id" => "collection_record_id", "collection_id" => "collection_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->CollectionRecord()->update([
  "id" => "collection_record_id",
  "collection_id" => "collection_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CollectionRecordEntity`

Create a new `CollectionRecordEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CollectionRecordListEntity

```php
$collection_record_list = $client->CollectionRecordList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_user_id` | `string` | No |  |
| `collection_id` | `string` | No |  |
| `created_at` | `string` | No |  |
| `created_by` | `string` | No |  |
| `data` | `array` | Yes |  |
| `deleted_at` | `string` | No |  |
| `id` | `string` | Yes |  |
| `project_id` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->CollectionRecordList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CollectionRecordListEntity`

Create a new `CollectionRecordListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CustomEntity

```php
$custom = $client->Custom();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Custom()->create([
  "id" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Custom()->load(["id" => "custom_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Custom()->remove(["id" => "custom_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Custom()->update([
  "id" => "custom_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CustomEntity`

Create a new `CustomEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LegacyEntity

```php
$legacy = $client->Legacy();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Legacy()->remove(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LegacyEntity`

Create a new `LegacyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LegacyMutationEntity

```php
$legacy_mutation = $client->LegacyMutation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `id` | `string` | No |  |
| `updatedAt` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->LegacyMutation()->create([
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->LegacyMutation()->update([
  "id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LegacyMutationEntity`

Create a new `LegacyMutationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LegacyUnknownEntity

```php
$legacy_unknown = $client->LegacyUnknown();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | Yes |  |
| `support` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->LegacyUnknown()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LegacyUnknownEntity`

Create a new `LegacyUnknownEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LegacyUnknownListEntity

```php
$legacy_unknown_list = $client->LegacyUnknownList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `string` | Yes |  |
| `id` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `pantone_value` | `string` | Yes |  |
| `year` | `int` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->LegacyUnknownList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LegacyUnknownListEntity`

Create a new `LegacyUnknownListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LegacyUserEntity

```php
$legacy_user = $client->LegacyUser();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | Yes |  |
| `support` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->LegacyUser()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LegacyUserEntity`

Create a new `LegacyUserEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LegacyUserListEntity

```php
$legacy_user_list = $client->LegacyUserList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `first_name` | `string` | Yes |  |
| `id` | `int` | Yes |  |
| `last_name` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->LegacyUserList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LegacyUserListEntity`

Create a new `LegacyUserListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LoginEntity

```php
$login = $client->Login();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Login()->create([
  "email" => null, // string
  "password" => null, // string
  "token" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LoginEntity`

Create a new `LoginEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RegisterEntity

```php
$register = $client->Register();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `id` | `int` | No |  |
| `password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Register()->create([
  "email" => null, // string
  "password" => null, // string
  "token" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RegisterEntity`

Create a new `RegisterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new HostedRestSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

