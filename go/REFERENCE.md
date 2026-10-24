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

#### `Test() *HostedRestSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *HostedRestSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `AgentHealth(data map[string]any) HostedRestEntity`

Create a new `AgentHealth` entity instance. Pass `nil` for no initial data.

#### `AgentSandbox(data map[string]any) HostedRestEntity`

Create a new `AgentSandbox` entity instance. Pass `nil` for no initial data.

#### `AgentUser(data map[string]any) HostedRestEntity`

Create a new `AgentUser` entity instance. Pass `nil` for no initial data.

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

#### `Custom(data map[string]any) HostedRestEntity`

Create a new `Custom` entity instance. Pass `nil` for no initial data.

#### `LegacyMutation(data map[string]any) HostedRestEntity`

Create a new `LegacyMutation` entity instance. Pass `nil` for no initial data.

#### `LegacyUnknown(data map[string]any) HostedRestEntity`

Create a new `LegacyUnknown` entity instance. Pass `nil` for no initial data.

#### `LegacyUser(data map[string]any) HostedRestEntity`

Create a new `LegacyUser` entity instance. Pass `nil` for no initial data.

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
agentHealth := client.AgentHealth(nil)
fmt.Println(agentHealth.GetName()) // "agent_health"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecations` | `[]any` | Yes |  |
| `rate_limit_status` | `map[string]any` | Yes |  |
| `status` | `string` | Yes |  |
| `uptime_seconds` | `int` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentHealth(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentSandboxEntity

```go
agentSandbox := client.AgentSandbox(nil)
fmt.Println(agentSandbox.GetName()) // "agent_sandbox"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `password` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentSandbox(nil).Load(map[string]any{"scenario": "scenario"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AgentSandbox(nil).Create(map[string]any{
    "email": "example_email",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AgentUserEntity

```go
agentUser := client.AgentUser(nil)
fmt.Println(agentUser.GetName()) // "agent_user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `full_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `locale` | `string` | Yes |  |
| `preferences` | `map[string]any` | Yes |  |
| `profile` | `map[string]any` | Yes |  |
| `status` | `string` | Yes |  |
| `timezone` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AgentUser(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AgentUser(nil).Load(map[string]any{"id": "agent_user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentUserEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppUserEntity

```go
appUser := client.AppUser(nil)
fmt.Println(appUser.GetName()) // "app_user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `email` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_login_at` | `string` | No |  |
| `metadata` | `map[string]any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AppUser(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppUser(nil).Load(map[string]any{"id": "app_user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppUser(nil).Create(map[string]any{
    "email": "example_email",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AppUser(nil).Update(map[string]any{
    "id": "app_user_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AppUser(nil).Remove(map[string]any{"id": "app_user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppUserLoginEntity

```go
appUserLogin := client.AppUserLogin(nil)
fmt.Println(appUserLogin.GetName()) // "app_user_login"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `metadata` | `map[string]any` | No |  |
| `project_id` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppUserLogin(nil).Create(map[string]any{
    "email": "example_email",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppUserSessionEntity

```go
appUserSession := client.AppUserSession(nil)
fmt.Println(appUserSession.GetName()) // "app_user_session"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppUserSession(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppUserTotalEntity

```go
appUserTotal := client.AppUserTotal(nil)
fmt.Println(appUserTotal.GetName()) // "app_user_total"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `total` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AppUserTotal(nil).Load(map[string]any{"project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AppUserVerifyEntity

```go
appUserVerify := client.AppUserVerify(nil)
fmt.Println(appUserVerify.GetName()) // "app_user_verify"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AppUserVerify(nil).Create(map[string]any{
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AuthenticationEntity

```go
authentication := client.Authentication(nil)
fmt.Println(authentication.GetName()) // "authentication"
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Authentication(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CollectionEntity

```go
collection := client.Collection(nil)
fmt.Println(collection.GetName()) // "collection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `project_id` | `string` | No |  |
| `schema` | `map[string]any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Collection(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Collection(nil).Load(map[string]any{"id": "collection_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Collection(nil).Create(map[string]any{
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Collection(nil).Update(map[string]any{
    "id": "collection_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Collection(nil).Remove(map[string]any{"id": "collection_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CollectionRecordEntity

```go
collectionRecord := client.CollectionRecord(nil)
fmt.Println(collectionRecord.GetName()) // "collection_record"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_user_id` | `string` | No |  |
| `collection_id` | `string` | No |  |
| `created_at` | `string` | No |  |
| `created_by` | `string` | No |  |
| `data` | `map[string]any` | Yes |  |
| `deleted_at` | `string` | No |  |
| `id` | `string` | Yes |  |
| `project_id` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CollectionRecord(nil).List(map[string]any{"slug": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CollectionRecord(nil).Load(map[string]any{"id": "collection_record_id", "slug": "slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.CollectionRecord(nil).Create(map[string]any{
    "slug": "example_slug",
    "data": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.CollectionRecord(nil).Update(map[string]any{
    "id": "collection_record_id",
    "slug": "slug",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.CollectionRecord(nil).Remove(map[string]any{"id": "collection_record_id", "slug": "slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CustomEntity

```go
custom := client.Custom(nil)
fmt.Println(custom.GetName()) // "custom"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Custom(nil).Load(map[string]any{"id": "custom_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Custom(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Custom(nil).Update(map[string]any{
    "id": "custom_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.Custom(nil).Patch(map[string]any{
    "id": "custom_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Custom(nil).Remove(map[string]any{"id": "custom_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LegacyMutationEntity

```go
legacyMutation := client.LegacyMutation(nil)
fmt.Println(legacyMutation.GetName()) // "legacy_mutation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `string` | Yes |  |
| `createdAt` | `string` | No |  |
| `email` | `string` | Yes |  |
| `first_name` | `string` | Yes |  |
| `id` | `string` | No |  |
| `last_name` | `string` | Yes |  |
| `updatedAt` | `string` | No |  |

### Field Usage by Operation

| Field | list | create | update | patch |
| --- | --- | --- | --- | --- |
| `avatar` | - | - | - | - |
| `createdAt` | - | - | - | - |
| `email` | - | - | - | - |
| `first_name` | - | - | - | - |
| `id` | Yes | - | - | - |
| `last_name` | - | - | - | - |
| `updatedAt` | - | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LegacyMutation(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LegacyMutation(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.LegacyMutation(nil).Update(map[string]any{
    "id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.LegacyMutation(nil).Patch(map[string]any{
    "id": 1,
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LegacyUnknownEntity

```go
legacyUnknown := client.LegacyUnknown(nil)
fmt.Println(legacyUnknown.GetName()) // "legacy_unknown"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `string` | Yes |  |
| `data` | `map[string]any` | Yes |  |
| `id` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `pantone_value` | `string` | Yes |  |
| `support` | `map[string]any` | No |  |
| `year` | `int` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LegacyUnknown(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LegacyUnknown(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LegacyUserEntity

```go
legacyUser := client.LegacyUser(nil)
fmt.Println(legacyUser.GetName()) // "legacy_user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `map[string]any` | Yes |  |
| `id` | `string` | No |  |
| `support` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LegacyUser(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.LegacyUser(nil).Remove(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LoginEntity

```go
login := client.Login(nil)
fmt.Println(login.GetName()) // "login"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Login(nil).Create(map[string]any{
    "email": "example_email",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RegisterEntity

```go
register := client.Register(nil)
fmt.Println(register.GetName()) // "register"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `id` | `int` | No |  |
| `password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Register(nil).Create(map[string]any{
    "email": "example_email",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```go
client := sdk.NewHostedRestSDK(map[string]any{
    "feature": map[string]any{
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

