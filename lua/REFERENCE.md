# HostedRest Lua SDK Reference

Complete API reference for the HostedRest Lua SDK.


## HostedRestSDK

### Constructor

```lua
local sdk = require("hosted-rest_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts, sdkopts)`

Create a test client with mock features active. Both arguments may be `nil`.

```lua
local client = sdk.test(nil, nil)
```


### Instance Methods

#### `AgentHealth(data)`

Create a new `AgentHealth` entity instance. Pass `nil` for no initial data.

#### `AgentSandbox(data)`

Create a new `AgentSandbox` entity instance. Pass `nil` for no initial data.

#### `AgentUserDetail(data)`

Create a new `AgentUserDetail` entity instance. Pass `nil` for no initial data.

#### `AgentUserList(data)`

Create a new `AgentUserList` entity instance. Pass `nil` for no initial data.

#### `AppUser(data)`

Create a new `AppUser` entity instance. Pass `nil` for no initial data.

#### `AppUserLogin(data)`

Create a new `AppUserLogin` entity instance. Pass `nil` for no initial data.

#### `AppUserSession(data)`

Create a new `AppUserSession` entity instance. Pass `nil` for no initial data.

#### `AppUserTotal(data)`

Create a new `AppUserTotal` entity instance. Pass `nil` for no initial data.

#### `AppUserVerify(data)`

Create a new `AppUserVerify` entity instance. Pass `nil` for no initial data.

#### `Authentication(data)`

Create a new `Authentication` entity instance. Pass `nil` for no initial data.

#### `Collection(data)`

Create a new `Collection` entity instance. Pass `nil` for no initial data.

#### `CollectionRecord(data)`

Create a new `CollectionRecord` entity instance. Pass `nil` for no initial data.

#### `CollectionRecordList(data)`

Create a new `CollectionRecordList` entity instance. Pass `nil` for no initial data.

#### `Custom(data)`

Create a new `Custom` entity instance. Pass `nil` for no initial data.

#### `Legacy(data)`

Create a new `Legacy` entity instance. Pass `nil` for no initial data.

#### `LegacyMutation(data)`

Create a new `LegacyMutation` entity instance. Pass `nil` for no initial data.

#### `LegacyUnknown(data)`

Create a new `LegacyUnknown` entity instance. Pass `nil` for no initial data.

#### `LegacyUnknownList(data)`

Create a new `LegacyUnknownList` entity instance. Pass `nil` for no initial data.

#### `LegacyUser(data)`

Create a new `LegacyUser` entity instance. Pass `nil` for no initial data.

#### `LegacyUserList(data)`

Create a new `LegacyUserList` entity instance. Pass `nil` for no initial data.

#### `Login(data)`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `Register(data)`

Create a new `Register` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AgentHealthEntity

```lua
local agent_health = client:AgentHealth(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:AgentHealth(nil):load({ id = "agent_health_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentHealthEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentSandboxEntity

```lua
local agent_sandbox = client:AgentSandbox(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | Yes |  |
| `password` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:AgentSandbox(nil):create({
  email = --[[ `$STRING` ]],
  password = --[[ `$STRING` ]],
}, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:AgentSandbox(nil):load({ id = "agent_sandbox_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSandboxEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentUserDetailEntity

```lua
local agent_user_detail = client:AgentUserDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:AgentUserDetail(nil):load({ id = "agent_user_detail_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentUserDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentUserListEntity

```lua
local agent_user_list = client:AgentUserList(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:AgentUserList(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentUserListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppUserEntity

```lua
local app_user = client:AppUser(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:AppUser(nil):create({
  data = --[[ `$OBJECT` ]],
  email = --[[ `$STRING` ]],
}, nil)
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:AppUser(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:AppUser(nil):load({ id = "app_user_id" }, nil)
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:AppUser(nil):remove({ id = "app_user_id" }, nil)
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:AppUser(nil):update({
  id = "app_user_id",
  -- Fields to update
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppUserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppUserLoginEntity

```lua
local app_user_login = client:AppUserLogin(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `metadata` | ``$OBJECT`` | No |  |
| `project_id` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:AppUserLogin(nil):create({
  data = --[[ `$OBJECT` ]],
  email = --[[ `$STRING` ]],
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppUserLoginEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppUserSessionEntity

```lua
local app_user_session = client:AppUserSession(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:AppUserSession(nil):load({ id = "app_user_session_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppUserSessionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppUserTotalEntity

```lua
local app_user_total = client:AppUserTotal(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `total` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:AppUserTotal(nil):load({ id = "app_user_total_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppUserTotalEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppUserVerifyEntity

```lua
local app_user_verify = client:AppUserVerify(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:AppUserVerify(nil):create({
  data = --[[ `$OBJECT` ]],
  token = --[[ `$STRING` ]],
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppUserVerifyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AuthenticationEntity

```lua
local authentication = client:Authentication(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Authentication(nil):create({
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CollectionEntity

```lua
local collection = client:Collection(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Collection(nil):create({
  data = --[[ `$OBJECT` ]],
  name = --[[ `$STRING` ]],
}, nil)
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Collection(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Collection(nil):load({ id = "collection_id" }, nil)
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Collection(nil):remove({ id = "collection_id" }, nil)
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Collection(nil):update({
  id = "collection_id",
  -- Fields to update
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CollectionRecordEntity

```lua
local collection_record = client:CollectionRecord(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:CollectionRecord(nil):create({
  data = --[[ `$OBJECT` ]],
}, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:CollectionRecord(nil):load({ id = "collection_record_id" }, nil)
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:CollectionRecord(nil):update({
  id = "collection_record_id",
  -- Fields to update
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollectionRecordEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CollectionRecordListEntity

```lua
local collection_record_list = client:CollectionRecordList(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:CollectionRecordList(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollectionRecordListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CustomEntity

```lua
local custom = client:Custom(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Custom(nil):create({
}, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Custom(nil):load({ id = "custom_id" }, nil)
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Custom(nil):remove({ id = "custom_id" }, nil)
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Custom(nil):update({
  id = "custom_id",
  -- Fields to update
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CustomEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LegacyEntity

```lua
local legacy = client:Legacy(nil)
```

### Operations

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Legacy(nil):remove({ id = "legacy_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LegacyMutationEntity

```lua
local legacy_mutation = client:LegacyMutation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:LegacyMutation(nil):create({
}, nil)
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:LegacyMutation(nil):update({
  id = "legacy_mutation_id",
  -- Fields to update
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyMutationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LegacyUnknownEntity

```lua
local legacy_unknown = client:LegacyUnknown(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `support` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:LegacyUnknown(nil):load({ id = "legacy_unknown_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyUnknownEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LegacyUnknownListEntity

```lua
local legacy_unknown_list = client:LegacyUnknownList(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:LegacyUnknownList(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyUnknownListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LegacyUserEntity

```lua
local legacy_user = client:LegacyUser(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |
| `support` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:LegacyUser(nil):load({ id = "legacy_user_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyUserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LegacyUserListEntity

```lua
local legacy_user_list = client:LegacyUserList(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:LegacyUserList(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyUserListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LoginEntity

```lua
local login = client:Login(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | Yes |  |
| `password` | ``$STRING`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Login(nil):create({
  email = --[[ `$STRING` ]],
  password = --[[ `$STRING` ]],
  token = --[[ `$STRING` ]],
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RegisterEntity

```lua
local register = client:Register(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | Yes |  |
| `id` | ``$INTEGER`` | No |  |
| `password` | ``$STRING`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Register(nil):create({
  email = --[[ `$STRING` ]],
  password = --[[ `$STRING` ]],
  token = --[[ `$STRING` ]],
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegisterEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

