# HostedRest Golang SDK Reference

Complete API reference for the HostedRest Golang SDK.


## HostedRestSDK

### Constructor

```go
func NewHostedRestSDK(options map[string]any) *HostedRestSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TestSDK(testopts, sdkopts map[string]any) *HostedRestSDK`

Create a test client with mock features active. Both arguments may be `nil`.

```go
client := sdk.TestSDK(nil, nil)
```


### Instance Methods

#### `AgentHealth(data map[string]any) HostedRestEntity`

Create a new `AgentHealth` entity instance. Pass `nil` for no initial data.

#### `AgentSandbox(data map[string]any) HostedRestEntity`

Create a new `AgentSandbox` entity instance. Pass `nil` for no initial data.

#### `AgentUserDetail(data map[string]any) HostedRestEntity`

Create a new `AgentUserDetail` entity instance. Pass `nil` for no initial data.

#### `AgentUserList(data map[string]any) HostedRestEntity`

Create a new `AgentUserList` entity instance. Pass `nil` for no initial data.

#### `AppUser(data map[string]any) HostedRestEntity`

Create a new `AppUser` entity instance. Pass `nil` for no initial data.

#### `AppUserLogin(data map[string]any) HostedRestEntity`

Create a new `AppUserLogin` entity instance. Pass `nil` for no initial data.

#### `AppUserSession(data map[string]any) HostedRestEntity`

Create a new `AppUserSession` entity instance. Pass `nil` for no initial data.

#### `AppUserTotal(data map[string]any) HostedRestEntity`

Create a new `AppUserTotal` entity instance. Pass `nil` for no initial data.

#### `AppUserVerify(data map[string]any) HostedRestEntity`

Create a new `AppUserVerify` entity instance. Pass `nil` for no initial data.

#### `Authentication(data map[string]any) HostedRestEntity`

Create a new `Authentication` entity instance. Pass `nil` for no initial data.

#### `Collection(data map[string]any) HostedRestEntity`

Create a new `Collection` entity instance. Pass `nil` for no initial data.

#### `CollectionRecord(data map[string]any) HostedRestEntity`

Create a new `CollectionRecord` entity instance. Pass `nil` for no initial data.

#### `CollectionRecordList(data map[string]any) HostedRestEntity`

Create a new `CollectionRecordList` entity instance. Pass `nil` for no initial data.

#### `Custom(data map[string]any) HostedRestEntity`

Create a new `Custom` entity instance. Pass `nil` for no initial data.

#### `Legacy(data map[string]any) HostedRestEntity`

Create a new `Legacy` entity instance. Pass `nil` for no initial data.

#### `LegacyMutation(data map[string]any) HostedRestEntity`

Create a new `LegacyMutation` entity instance. Pass `nil` for no initial data.

#### `LegacyUnknown(data map[string]any) HostedRestEntity`

Create a new `LegacyUnknown` entity instance. Pass `nil` for no initial data.

#### `LegacyUnknownList(data map[string]any) HostedRestEntity`

Create a new `LegacyUnknownList` entity instance. Pass `nil` for no initial data.

#### `LegacyUser(data map[string]any) HostedRestEntity`

Create a new `LegacyUser` entity instance. Pass `nil` for no initial data.

#### `LegacyUserList(data map[string]any) HostedRestEntity`

Create a new `LegacyUserList` entity instance. Pass `nil` for no initial data.

#### `Login(data map[string]any) HostedRestEntity`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `Register(data map[string]any) HostedRestEntity`

Create a new `Register` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AgentHealthEntity

```go
agent_health := client.AgentHealth(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.AgentHealth(nil).Load(map[string]any{"id": "agent_health_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentHealthEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AgentSandboxEntity

```go
agent_sandbox := client.AgentSandbox(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | Yes |  |
| `password` | ``$STRING`` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.AgentSandbox(nil).Create(map[string]any{
    "email": /* `$STRING` */,
    "password": /* `$STRING` */,
}, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.AgentSandbox(nil).Load(map[string]any{"id": "agent_sandbox_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentSandboxEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AgentUserDetailEntity

```go
agent_user_detail := client.AgentUserDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.AgentUserDetail(nil).Load(map[string]any{"id": "agent_user_detail_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentUserDetailEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AgentUserListEntity

```go
agent_user_list := client.AgentUserList(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AgentUserList(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentUserListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AppUserEntity

```go
app_user := client.AppUser(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.AppUser(nil).Create(map[string]any{
    "data": /* `$OBJECT` */,
    "email": /* `$STRING` */,
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AppUser(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.AppUser(nil).Load(map[string]any{"id": "app_user_id"}, nil)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.AppUser(nil).Remove(map[string]any{"id": "app_user_id"}, nil)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.AppUser(nil).Update(map[string]any{
    "id": "app_user_id",
    // Fields to update
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppUserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AppUserLoginEntity

```go
app_user_login := client.AppUserLogin(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `metadata` | ``$OBJECT`` | No |  |
| `project_id` | ``$STRING`` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.AppUserLogin(nil).Create(map[string]any{
    "data": /* `$OBJECT` */,
    "email": /* `$STRING` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppUserLoginEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AppUserSessionEntity

```go
app_user_session := client.AppUserSession(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.AppUserSession(nil).Load(map[string]any{"id": "app_user_session_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppUserSessionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AppUserTotalEntity

```go
app_user_total := client.AppUserTotal(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `total` | ``$INTEGER`` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.AppUserTotal(nil).Load(map[string]any{"id": "app_user_total_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppUserTotalEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AppUserVerifyEntity

```go
app_user_verify := client.AppUserVerify(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.AppUserVerify(nil).Create(map[string]any{
    "data": /* `$OBJECT` */,
    "token": /* `$STRING` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AppUserVerifyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AuthenticationEntity

```go
authentication := client.Authentication(nil)
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Authentication(nil).Create(map[string]any{
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CollectionEntity

```go
collection := client.Collection(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Collection(nil).Create(map[string]any{
    "data": /* `$OBJECT` */,
    "name": /* `$STRING` */,
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Collection(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Collection(nil).Load(map[string]any{"id": "collection_id"}, nil)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Collection(nil).Remove(map[string]any{"id": "collection_id"}, nil)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Collection(nil).Update(map[string]any{
    "id": "collection_id",
    // Fields to update
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CollectionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CollectionRecordEntity

```go
collection_record := client.CollectionRecord(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CollectionRecord(nil).Create(map[string]any{
    "data": /* `$OBJECT` */,
}, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CollectionRecord(nil).Load(map[string]any{"id": "collection_record_id"}, nil)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.CollectionRecord(nil).Update(map[string]any{
    "id": "collection_record_id",
    // Fields to update
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CollectionRecordEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CollectionRecordListEntity

```go
collection_record_list := client.CollectionRecordList(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CollectionRecordList(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CollectionRecordListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CustomEntity

```go
custom := client.Custom(nil)
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Custom(nil).Create(map[string]any{
}, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Custom(nil).Load(map[string]any{"id": "custom_id"}, nil)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Custom(nil).Remove(map[string]any{"id": "custom_id"}, nil)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Custom(nil).Update(map[string]any{
    "id": "custom_id",
    // Fields to update
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CustomEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LegacyEntity

```go
legacy := client.Legacy(nil)
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Legacy(nil).Remove(map[string]any{"id": "legacy_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LegacyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LegacyMutationEntity

```go
legacy_mutation := client.LegacyMutation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.LegacyMutation(nil).Create(map[string]any{
}, nil)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.LegacyMutation(nil).Update(map[string]any{
    "id": "legacy_mutation_id",
    // Fields to update
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LegacyMutationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LegacyUnknownEntity

```go
legacy_unknown := client.LegacyUnknown(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `support` | ``$OBJECT`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.LegacyUnknown(nil).Load(map[string]any{"id": "legacy_unknown_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LegacyUnknownEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LegacyUnknownListEntity

```go
legacy_unknown_list := client.LegacyUnknownList(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.LegacyUnknownList(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LegacyUnknownListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LegacyUserEntity

```go
legacy_user := client.LegacyUser(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `support` | ``$OBJECT`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.LegacyUser(nil).Load(map[string]any{"id": "legacy_user_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LegacyUserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LegacyUserListEntity

```go
legacy_user_list := client.LegacyUserList(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.LegacyUserList(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LegacyUserListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LoginEntity

```go
login := client.Login(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | Yes |  |
| `password` | ``$STRING`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Login(nil).Create(map[string]any{
    "email": /* `$STRING` */,
    "password": /* `$STRING` */,
    "token": /* `$STRING` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RegisterEntity

```go
register := client.Register(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | Yes |  |
| `id` | ``$INTEGER`` | No |  |
| `password` | ``$STRING`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Register(nil).Create(map[string]any{
    "email": /* `$STRING` */,
    "password": /* `$STRING` */,
    "token": /* `$STRING` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RegisterEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewHostedRestSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

