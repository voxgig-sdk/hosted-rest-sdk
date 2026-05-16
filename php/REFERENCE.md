# HostedRest PHP SDK Reference

Complete API reference for the HostedRest PHP SDK.


## HostedRestSDK

### Constructor

```php
require_once __DIR__ . '/hosted-rest_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## AgentHealthEntity

```php
$agent_health = $client->AgentHealth();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->AgentHealth()->load(["id" => "agent_health_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AgentHealthEntity`

Create a new `AgentHealthEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AgentSandboxEntity

```php
$agent_sandbox = $client->AgentSandbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | Yes |  |
| `password` | ``$STRING`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->AgentSandbox()->create([
  "email" => /* `$STRING` */,
  "password" => /* `$STRING` */,
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->AgentSandbox()->load(["id" => "agent_sandbox_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AgentSandboxEntity`

Create a new `AgentSandboxEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AgentUserDetailEntity

```php
$agent_user_detail = $client->AgentUserDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->AgentUserDetail()->load(["id" => "agent_user_detail_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AgentUserDetailEntity`

Create a new `AgentUserDetailEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AgentUserListEntity

```php
$agent_user_list = $client->AgentUserList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `full_name` | ``$STRING`` | Yes |  |
| `id` | ``$STRING`` | Yes |  |
| `locale` | ``$STRING`` | Yes |  |
| `preference` | ``$OBJECT`` | Yes |  |
| `profile` | ``$OBJECT`` | Yes |  |
| `status` | ``$STRING`` | Yes |  |
| `timezone` | ``$STRING`` | Yes |  |
| `updated_at` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->AgentUserList()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AgentUserListEntity`

Create a new `AgentUserListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AppUserEntity

```php
$app_user = $client->AppUser();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `data` | ``$OBJECT`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `id` | ``$STRING`` | Yes |  |
| `last_login_at` | ``$STRING`` | No |  |
| `metadata` | ``$OBJECT`` | No |  |
| `status` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `data` | - | - | - | - | - |
| `email` | - | - | - | Yes | - |
| `id` | - | - | - | - | - |
| `last_login_at` | - | - | - | - | - |
| `metadata` | - | - | - | - | - |
| `status` | - | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->AppUser()->create([
  "data" => /* `$OBJECT` */,
  "email" => /* `$STRING` */,
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->AppUser()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->AppUser()->load(["id" => "app_user_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->AppUser()->remove(["id" => "app_user_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->AppUser()->update([
  "id" => "app_user_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AppUserEntity`

Create a new `AppUserEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AppUserLoginEntity

```php
$app_user_login = $client->AppUserLogin();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `metadata` | ``$OBJECT`` | No |  |
| `project_id` | ``$STRING`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->AppUserLogin()->create([
  "data" => /* `$OBJECT` */,
  "email" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AppUserLoginEntity`

Create a new `AppUserLoginEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AppUserSessionEntity

```php
$app_user_session = $client->AppUserSession();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->AppUserSession()->load(["id" => "app_user_session_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AppUserSessionEntity`

Create a new `AppUserSessionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AppUserTotalEntity

```php
$app_user_total = $client->AppUserTotal();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `total` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->AppUserTotal()->load(["id" => "app_user_total_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AppUserTotalEntity`

Create a new `AppUserTotalEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AppUserVerifyEntity

```php
$app_user_verify = $client->AppUserVerify();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->AppUserVerify()->create([
  "data" => /* `$OBJECT` */,
  "token" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AppUserVerifyEntity`

Create a new `AppUserVerifyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AuthenticationEntity

```php
$authentication = $client->Authentication();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Authentication()->create([
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AuthenticationEntity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CollectionEntity

```php
$collection = $client->Collection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `data` | ``$OBJECT`` | Yes |  |
| `id` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `project_id` | ``$STRING`` | No |  |
| `schema` | ``$OBJECT`` | No |  |
| `slug` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `user_id` | ``$STRING`` | No |  |
| `visibility` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `data` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `project_id` | - | - | - | - | - |
| `schema` | - | - | - | - | - |
| `slug` | - | Yes | - | - | - |
| `updated_at` | - | - | - | - | - |
| `user_id` | - | - | - | - | - |
| `visibility` | - | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Collection()->create([
  "data" => /* `$OBJECT` */,
  "name" => /* `$STRING` */,
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Collection()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Collection()->load(["id" => "collection_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->Collection()->remove(["id" => "collection_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->Collection()->update([
  "id" => "collection_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CollectionEntity`

Create a new `CollectionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CollectionRecordEntity

```php
$collection_record = $client->CollectionRecord();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->CollectionRecord()->create([
  "data" => /* `$OBJECT` */,
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->CollectionRecord()->load(["id" => "collection_record_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->CollectionRecord()->update([
  "id" => "collection_record_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CollectionRecordEntity`

Create a new `CollectionRecordEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CollectionRecordListEntity

```php
$collection_record_list = $client->CollectionRecordList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_user_id` | ``$STRING`` | No |  |
| `collection_id` | ``$STRING`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `created_by` | ``$STRING`` | No |  |
| `data` | ``$OBJECT`` | Yes |  |
| `deleted_at` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | Yes |  |
| `project_id` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->CollectionRecordList()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CollectionRecordListEntity`

Create a new `CollectionRecordListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CustomEntity

```php
$custom = $client->Custom();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Custom()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Custom()->load(["id" => "custom_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->Custom()->remove(["id" => "custom_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->Custom()->update([
  "id" => "custom_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CustomEntity`

Create a new `CustomEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LegacyEntity

```php
$legacy = $client->Legacy();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->Legacy()->remove(["id" => "legacy_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LegacyEntity`

Create a new `LegacyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LegacyMutationEntity

```php
$legacy_mutation = $client->LegacyMutation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->LegacyMutation()->create([
]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->LegacyMutation()->update([
  "id" => "legacy_mutation_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LegacyMutationEntity`

Create a new `LegacyMutationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LegacyUnknownEntity

```php
$legacy_unknown = $client->LegacyUnknown();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `support` | ``$OBJECT`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->LegacyUnknown()->load(["id" => "legacy_unknown_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LegacyUnknownEntity`

Create a new `LegacyUnknownEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LegacyUnknownListEntity

```php
$legacy_unknown_list = $client->LegacyUnknownList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | ``$STRING`` | Yes |  |
| `id` | ``$INTEGER`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `pantone_value` | ``$STRING`` | Yes |  |
| `year` | ``$INTEGER`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->LegacyUnknownList()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LegacyUnknownListEntity`

Create a new `LegacyUnknownListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LegacyUserEntity

```php
$legacy_user = $client->LegacyUser();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `support` | ``$OBJECT`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->LegacyUser()->load(["id" => "legacy_user_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LegacyUserEntity`

Create a new `LegacyUserEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LegacyUserListEntity

```php
$legacy_user_list = $client->LegacyUserList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | ``$STRING`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `first_name` | ``$STRING`` | Yes |  |
| `id` | ``$INTEGER`` | Yes |  |
| `last_name` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->LegacyUserList()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LegacyUserListEntity`

Create a new `LegacyUserListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LoginEntity

```php
$login = $client->Login();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | Yes |  |
| `password` | ``$STRING`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Login()->create([
  "email" => /* `$STRING` */,
  "password" => /* `$STRING` */,
  "token" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LoginEntity`

Create a new `LoginEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RegisterEntity

```php
$register = $client->Register();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | Yes |  |
| `id` | ``$INTEGER`` | No |  |
| `password` | ``$STRING`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Register()->create([
  "email" => /* `$STRING` */,
  "password" => /* `$STRING` */,
  "token" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RegisterEntity`

Create a new `RegisterEntity` instance with the same client and
options.

#### `getName(): string`

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

