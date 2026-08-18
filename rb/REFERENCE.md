# HostedRest Ruby SDK Reference

Complete API reference for the HostedRest Ruby SDK.


## HostedRestSDK

### Constructor

```ruby
require_relative 'HostedRest_sdk'

client = HostedRestSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HostedRestSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = HostedRestSDK.test
```


### Instance Methods

#### `AgentHealth(data = nil)`

Create a new `AgentHealth` entity instance. Pass `nil` for no initial data.

#### `AgentSandbox(data = nil)`

Create a new `AgentSandbox` entity instance. Pass `nil` for no initial data.

#### `AgentUserDetail(data = nil)`

Create a new `AgentUserDetail` entity instance. Pass `nil` for no initial data.

#### `AgentUserList(data = nil)`

Create a new `AgentUserList` entity instance. Pass `nil` for no initial data.

#### `AppUser(data = nil)`

Create a new `AppUser` entity instance. Pass `nil` for no initial data.

#### `AppUserLogin(data = nil)`

Create a new `AppUserLogin` entity instance. Pass `nil` for no initial data.

#### `AppUserSession(data = nil)`

Create a new `AppUserSession` entity instance. Pass `nil` for no initial data.

#### `AppUserTotal(data = nil)`

Create a new `AppUserTotal` entity instance. Pass `nil` for no initial data.

#### `AppUserVerify(data = nil)`

Create a new `AppUserVerify` entity instance. Pass `nil` for no initial data.

#### `Authentication(data = nil)`

Create a new `Authentication` entity instance. Pass `nil` for no initial data.

#### `Collection(data = nil)`

Create a new `Collection` entity instance. Pass `nil` for no initial data.

#### `CollectionRecord(data = nil)`

Create a new `CollectionRecord` entity instance. Pass `nil` for no initial data.

#### `CollectionRecordList(data = nil)`

Create a new `CollectionRecordList` entity instance. Pass `nil` for no initial data.

#### `Custom(data = nil)`

Create a new `Custom` entity instance. Pass `nil` for no initial data.

#### `Legacy(data = nil)`

Create a new `Legacy` entity instance. Pass `nil` for no initial data.

#### `LegacyMutation(data = nil)`

Create a new `LegacyMutation` entity instance. Pass `nil` for no initial data.

#### `LegacyUnknown(data = nil)`

Create a new `LegacyUnknown` entity instance. Pass `nil` for no initial data.

#### `LegacyUnknownList(data = nil)`

Create a new `LegacyUnknownList` entity instance. Pass `nil` for no initial data.

#### `LegacyUser(data = nil)`

Create a new `LegacyUser` entity instance. Pass `nil` for no initial data.

#### `LegacyUserList(data = nil)`

Create a new `LegacyUserList` entity instance. Pass `nil` for no initial data.

#### `Login(data = nil)`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `Register(data = nil)`

Create a new `Register` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AgentHealthEntity

```ruby
agent_health = client.AgentHealth
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecations` | `Array` | Yes |  |
| `rate_limit_status` | `Hash` | Yes |  |
| `status` | `String` | Yes |  |
| `uptime_seconds` | `Integer` | Yes |  |
| `version` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.AgentHealth.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentHealthEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentSandboxEntity

```ruby
agent_sandbox = client.AgentSandbox
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `password` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.AgentSandbox.create({
  "email" => "example_email", # String
  "password" => "example_password", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.AgentSandbox.load({ "scenario" => "scenario" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentSandboxEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentUserDetailEntity

```ruby
agent_user_detail = client.AgentUserDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | Yes |  |
| `email` | `String` | Yes |  |
| `full_name` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `locale` | `String` | Yes |  |
| `preferences` | `Hash` | Yes |  |
| `profile` | `Hash` | Yes |  |
| `status` | `String` | Yes |  |
| `timezone` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.AgentUserDetail.load({ "id" => "agent_user_detail_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentUserDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentUserListEntity

```ruby
agent_user_list = client.AgentUserList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | Yes |  |
| `email` | `String` | Yes |  |
| `full_name` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `locale` | `String` | Yes |  |
| `preferences` | `Hash` | Yes |  |
| `profile` | `Hash` | Yes |  |
| `status` | `String` | Yes |  |
| `timezone` | `String` | Yes |  |
| `updated_at` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.AgentUserList.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentUserListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppUserEntity

```ruby
app_user = client.AppUser
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No |  |
| `email` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `last_login_at` | `String` | No |  |
| `metadata` | `Hash` | No |  |
| `status` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.AppUser.create({
  "email" => "example_email", # String
  "id" => "example_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.AppUser.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.AppUser.load({ "id" => "app_user_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.AppUser.remove({ "id" => "app_user_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.AppUser.update({
  "id" => "app_user_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppUserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppUserLoginEntity

```ruby
app_user_login = client.AppUserLogin
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `metadata` | `Hash` | No |  |
| `project_id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.AppUserLogin.create({
  "email" => "example_email", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppUserLoginEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppUserSessionEntity

```ruby
app_user_session = client.AppUserSession
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.AppUserSession.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppUserSessionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppUserTotalEntity

```ruby
app_user_total = client.AppUserTotal
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `total` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.AppUserTotal.load({ "project_id" => "project_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppUserTotalEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AppUserVerifyEntity

```ruby
app_user_verify = client.AppUserVerify
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.AppUserVerify.create({
  "token" => "example_token", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AppUserVerifyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AuthenticationEntity

```ruby
authentication = client.Authentication
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Authentication.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CollectionEntity

```ruby
collection = client.Collection
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `project_id` | `String` | No |  |
| `schema` | `Hash` | No |  |
| `slug` | `String` | Yes |  |
| `updated_at` | `String` | No |  |
| `user_id` | `String` | No |  |
| `visibility` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Collection.create({
  "id" => "example_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Collection.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Collection.load({ "id" => "collection_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Collection.remove({ "id" => "collection_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Collection.update({
  "id" => "collection_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CollectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CollectionRecordEntity

```ruby
collection_record = client.CollectionRecord
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_user_id` | `String` | No |  |
| `collection_id` | `String` | No |  |
| `created_at` | `String` | No |  |
| `created_by` | `String` | No |  |
| `data` | `Hash` | Yes |  |
| `deleted_at` | `String` | No |  |
| `id` | `String` | Yes |  |
| `project_id` | `String` | No |  |
| `updated_at` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CollectionRecord.create({
  "slug" => "example_slug", # String
  "data" => {}, # Hash
  "id" => "example_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CollectionRecord.load({ "id" => "collection_record_id", "collection_id" => "collection_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.CollectionRecord.update({
  "id" => "collection_record_id",
  "collection_id" => "collection_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CollectionRecordEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CollectionRecordListEntity

```ruby
collection_record_list = client.CollectionRecordList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_user_id` | `String` | No |  |
| `collection_id` | `String` | No |  |
| `created_at` | `String` | No |  |
| `created_by` | `String` | No |  |
| `data` | `Hash` | Yes |  |
| `deleted_at` | `String` | No |  |
| `id` | `String` | Yes |  |
| `project_id` | `String` | No |  |
| `updated_at` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.CollectionRecordList.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CollectionRecordListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CustomEntity

```ruby
custom = client.Custom
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Custom.create({
  "id" => "example_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Custom.load({ "id" => "custom_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Custom.remove({ "id" => "custom_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Custom.update({
  "id" => "custom_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CustomEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LegacyEntity

```ruby
legacy = client.Legacy
```

### Operations

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Legacy.remove({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LegacyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LegacyMutationEntity

```ruby
legacy_mutation = client.LegacyMutation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | No |  |
| `id` | `String` | No |  |
| `updatedAt` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.LegacyMutation.create({
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.LegacyMutation.update({
  "id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LegacyMutationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LegacyUnknownEntity

```ruby
legacy_unknown = client.LegacyUnknown
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Hash` | Yes |  |
| `support` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.LegacyUnknown.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LegacyUnknownEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LegacyUnknownListEntity

```ruby
legacy_unknown_list = client.LegacyUnknownList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `String` | Yes |  |
| `id` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `pantone_value` | `String` | Yes |  |
| `year` | `Integer` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.LegacyUnknownList.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LegacyUnknownListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LegacyUserEntity

```ruby
legacy_user = client.LegacyUser
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Hash` | Yes |  |
| `support` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.LegacyUser.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LegacyUserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LegacyUserListEntity

```ruby
legacy_user_list = client.LegacyUserList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `String` | Yes |  |
| `email` | `String` | Yes |  |
| `first_name` | `String` | Yes |  |
| `id` | `Integer` | Yes |  |
| `last_name` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.LegacyUserList.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LegacyUserListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LoginEntity

```ruby
login = client.Login
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `password` | `String` | Yes |  |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Login.create({
  "email" => "example_email", # String
  "password" => "example_password", # String
  "token" => "example_token", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegisterEntity

```ruby
register = client.Register
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `id` | `Integer` | No |  |
| `password` | `String` | Yes |  |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Register.create({
  "email" => "example_email", # String
  "password" => "example_password", # String
  "token" => "example_token", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegisterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = HostedRestSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

