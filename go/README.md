# HostedRest Golang SDK

The Golang SDK for the HostedRest API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/hosted-rest-sdk
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/hosted-rest-sdk=../path/to/github.com/voxgig-sdk/hosted-rest-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/hosted-rest-sdk"
    "github.com/voxgig-sdk/hosted-rest-sdk/core"
)

func main() {
    client := sdk.NewHostedRestSDK(map[string]any{
        "apikey": os.Getenv("HOSTED-REST_APIKEY"),
    })
```

### 3. Load a agenthealth

```go
    result, err = client.AgentHealth(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewHostedRestSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
HOSTED-REST_TEST_LIVE=TRUE
HOSTED-REST_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewHostedRestSDK

```go
func NewHostedRestSDK(options map[string]any) *HostedRestSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *HostedRestSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### HostedRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `AgentHealth` | `(data map[string]any) HostedRestEntity` | Create a AgentHealth entity instance. |
| `AgentSandbox` | `(data map[string]any) HostedRestEntity` | Create a AgentSandbox entity instance. |
| `AgentUserDetail` | `(data map[string]any) HostedRestEntity` | Create a AgentUserDetail entity instance. |
| `AgentUserList` | `(data map[string]any) HostedRestEntity` | Create a AgentUserList entity instance. |
| `AppUser` | `(data map[string]any) HostedRestEntity` | Create a AppUser entity instance. |
| `AppUserLogin` | `(data map[string]any) HostedRestEntity` | Create a AppUserLogin entity instance. |
| `AppUserSession` | `(data map[string]any) HostedRestEntity` | Create a AppUserSession entity instance. |
| `AppUserTotal` | `(data map[string]any) HostedRestEntity` | Create a AppUserTotal entity instance. |
| `AppUserVerify` | `(data map[string]any) HostedRestEntity` | Create a AppUserVerify entity instance. |
| `Authentication` | `(data map[string]any) HostedRestEntity` | Create a Authentication entity instance. |
| `Collection` | `(data map[string]any) HostedRestEntity` | Create a Collection entity instance. |
| `CollectionRecord` | `(data map[string]any) HostedRestEntity` | Create a CollectionRecord entity instance. |
| `CollectionRecordList` | `(data map[string]any) HostedRestEntity` | Create a CollectionRecordList entity instance. |
| `Custom` | `(data map[string]any) HostedRestEntity` | Create a Custom entity instance. |
| `Legacy` | `(data map[string]any) HostedRestEntity` | Create a Legacy entity instance. |
| `LegacyMutation` | `(data map[string]any) HostedRestEntity` | Create a LegacyMutation entity instance. |
| `LegacyUnknown` | `(data map[string]any) HostedRestEntity` | Create a LegacyUnknown entity instance. |
| `LegacyUnknownList` | `(data map[string]any) HostedRestEntity` | Create a LegacyUnknownList entity instance. |
| `LegacyUser` | `(data map[string]any) HostedRestEntity` | Create a LegacyUser entity instance. |
| `LegacyUserList` | `(data map[string]any) HostedRestEntity` | Create a LegacyUserList entity instance. |
| `Login` | `(data map[string]any) HostedRestEntity` | Create a Login entity instance. |
| `Register` | `(data map[string]any) HostedRestEntity` | Create a Register entity instance. |

### Entity interface (HostedRestEntity)

All entities implement the `HostedRestEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### AgentHealth

| Field | Description |
| --- | --- |
| `"data"` |  |

Operations: Load.

API path: `/agent/v1/health`

#### AgentSandbox

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"password"` |  |

Operations: Create, Load.

API path: `/agent/v1/auth/login`

#### AgentUserDetail

| Field | Description |
| --- | --- |
| `"data"` |  |

Operations: Load.

API path: `/agent/v1/users/{id}`

#### AgentUserList

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"email"` |  |
| `"full_name"` |  |
| `"id"` |  |
| `"locale"` |  |
| `"preference"` |  |
| `"profile"` |  |
| `"status"` |  |
| `"timezone"` |  |
| `"updated_at"` |  |

Operations: List.

API path: `/agent/v1/users`

#### AppUser

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"data"` |  |
| `"email"` |  |
| `"id"` |  |
| `"last_login_at"` |  |
| `"metadata"` |  |
| `"status"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/app-users/{id}/sessions/simulate`

#### AppUserLogin

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"email"` |  |
| `"metadata"` |  |
| `"project_id"` |  |

Operations: Create.

API path: `/api/app-users/login`

#### AppUserSession

| Field | Description |
| --- | --- |
| `"data"` |  |

Operations: Load.

API path: `/api/app-users/me`

#### AppUserTotal

| Field | Description |
| --- | --- |
| `"total"` |  |

Operations: Load.

API path: `/api/projects/{projectId}/app-users/total`

#### AppUserVerify

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"token"` |  |

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
| `"created_at"` |  |
| `"data"` |  |
| `"id"` |  |
| `"name"` |  |
| `"project_id"` |  |
| `"schema"` |  |
| `"slug"` |  |
| `"updated_at"` |  |
| `"user_id"` |  |
| `"visibility"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/collections`

#### CollectionRecord

| Field | Description |
| --- | --- |
| `"data"` |  |

Operations: Create, Load, Update.

API path: `/api/collections/{slug}/records`

#### CollectionRecordList

| Field | Description |
| --- | --- |
| `"app_user_id"` |  |
| `"collection_id"` |  |
| `"created_at"` |  |
| `"created_by"` |  |
| `"data"` |  |
| `"deleted_at"` |  |
| `"id"` |  |
| `"project_id"` |  |
| `"updated_at"` |  |

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
| `"created_at"` |  |
| `"id"` |  |
| `"updated_at"` |  |

Operations: Create, Patch, Update.

API path: `/api/users`

#### LegacyUnknown

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"support"` |  |

Operations: Load.

API path: `/api/unknown/{id}`

#### LegacyUnknownList

| Field | Description |
| --- | --- |
| `"color"` |  |
| `"id"` |  |
| `"name"` |  |
| `"pantone_value"` |  |
| `"year"` |  |

Operations: List.

API path: `/api/unknown`

#### LegacyUser

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"support"` |  |

Operations: Load.

API path: `/api/users/{id}`

#### LegacyUserList

| Field | Description |
| --- | --- |
| `"avatar"` |  |
| `"email"` |  |
| `"first_name"` |  |
| `"id"` |  |
| `"last_name"` |  |

Operations: List.

API path: `/api/users`

#### Login

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"password"` |  |
| `"token"` |  |

Operations: Create.

API path: `/api/login`

#### Register

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"id"` |  |
| `"password"` |  |
| `"token"` |  |

Operations: Create.

API path: `/api/register`



## Entities


### AgentHealth

Create an instance: `agent_health := client.AgentHealth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.AgentHealth(nil).Load(map[string]any{"id": "agent_health_id"}, nil)
```


### AgentSandbox

Create an instance: `agent_sandbox := client.AgentSandbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | ``$STRING`` |  |
| `password` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.AgentSandbox(nil).Load(map[string]any{"id": "agent_sandbox_id"}, nil)
```

#### Example: Create

```go
result, err := client.AgentSandbox(nil).Create(map[string]any{
    "email": /* `$STRING` */,
    "password": /* `$STRING` */,
}, nil)
```


### AgentUserDetail

Create an instance: `agent_user_detail := client.AgentUserDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.AgentUserDetail(nil).Load(map[string]any{"id": "agent_user_detail_id"}, nil)
```


### AgentUserList

Create an instance: `agent_user_list := client.AgentUserList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `full_name` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `locale` | ``$STRING`` |  |
| `preference` | ``$OBJECT`` |  |
| `profile` | ``$OBJECT`` |  |
| `status` | ``$STRING`` |  |
| `timezone` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.AgentUserList(nil).List(nil, nil)
```


### AppUser

Create an instance: `app_user := client.AppUser(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `data` | ``$OBJECT`` |  |
| `email` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `last_login_at` | ``$STRING`` |  |
| `metadata` | ``$OBJECT`` |  |
| `status` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.AppUser(nil).Load(map[string]any{"id": "app_user_id"}, nil)
```

#### Example: List

```go
results, err := client.AppUser(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.AppUser(nil).Create(map[string]any{
    "data": /* `$OBJECT` */,
    "email": /* `$STRING` */,
}, nil)
```


### AppUserLogin

Create an instance: `app_user_login := client.AppUserLogin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `email` | ``$STRING`` |  |
| `metadata` | ``$OBJECT`` |  |
| `project_id` | ``$STRING`` |  |

#### Example: Create

```go
result, err := client.AppUserLogin(nil).Create(map[string]any{
    "data": /* `$OBJECT` */,
    "email": /* `$STRING` */,
}, nil)
```


### AppUserSession

Create an instance: `app_user_session := client.AppUserSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.AppUserSession(nil).Load(map[string]any{"id": "app_user_session_id"}, nil)
```


### AppUserTotal

Create an instance: `app_user_total := client.AppUserTotal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.AppUserTotal(nil).Load(map[string]any{"id": "app_user_total_id"}, nil)
```


### AppUserVerify

Create an instance: `app_user_verify := client.AppUserVerify(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `token` | ``$STRING`` |  |

#### Example: Create

```go
result, err := client.AppUserVerify(nil).Create(map[string]any{
    "data": /* `$OBJECT` */,
    "token": /* `$STRING` */,
}, nil)
```


### Authentication

Create an instance: `authentication := client.Authentication(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.Authentication(nil).Create(map[string]any{
}, nil)
```


### Collection

Create an instance: `collection := client.Collection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `data` | ``$OBJECT`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `project_id` | ``$STRING`` |  |
| `schema` | ``$OBJECT`` |  |
| `slug` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |
| `user_id` | ``$STRING`` |  |
| `visibility` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Collection(nil).Load(map[string]any{"id": "collection_id"}, nil)
```

#### Example: List

```go
results, err := client.Collection(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Collection(nil).Create(map[string]any{
    "data": /* `$OBJECT` */,
    "name": /* `$STRING` */,
}, nil)
```


### CollectionRecord

Create an instance: `collection_record := client.CollectionRecord(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.CollectionRecord(nil).Load(map[string]any{"id": "collection_record_id"}, nil)
```

#### Example: Create

```go
result, err := client.CollectionRecord(nil).Create(map[string]any{
    "data": /* `$OBJECT` */,
}, nil)
```


### CollectionRecordList

Create an instance: `collection_record_list := client.CollectionRecordList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_user_id` | ``$STRING`` |  |
| `collection_id` | ``$STRING`` |  |
| `created_at` | ``$STRING`` |  |
| `created_by` | ``$STRING`` |  |
| `data` | ``$OBJECT`` |  |
| `deleted_at` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `project_id` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.CollectionRecordList(nil).List(nil, nil)
```


### Custom

Create an instance: `custom := client.Custom(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Example: Load

```go
result, err := client.Custom(nil).Load(map[string]any{"id": "custom_id"}, nil)
```

#### Example: Create

```go
result, err := client.Custom(nil).Create(map[string]any{
}, nil)
```


### Legacy

Create an instance: `legacy := client.Legacy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### LegacyMutation

Create an instance: `legacy_mutation := client.LegacyMutation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |

#### Example: Create

```go
result, err := client.LegacyMutation(nil).Create(map[string]any{
}, nil)
```


### LegacyUnknown

Create an instance: `legacy_unknown := client.LegacyUnknown(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `support` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.LegacyUnknown(nil).Load(map[string]any{"id": "legacy_unknown_id"}, nil)
```


### LegacyUnknownList

Create an instance: `legacy_unknown_list := client.LegacyUnknownList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `pantone_value` | ``$STRING`` |  |
| `year` | ``$INTEGER`` |  |

#### Example: List

```go
results, err := client.LegacyUnknownList(nil).List(nil, nil)
```


### LegacyUser

Create an instance: `legacy_user := client.LegacyUser(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `support` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.LegacyUser(nil).Load(map[string]any{"id": "legacy_user_id"}, nil)
```


### LegacyUserList

Create an instance: `legacy_user_list := client.LegacyUserList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `first_name` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `last_name` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.LegacyUserList(nil).List(nil, nil)
```


### Login

Create an instance: `login := client.Login(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | ``$STRING`` |  |
| `password` | ``$STRING`` |  |
| `token` | ``$STRING`` |  |

#### Example: Create

```go
result, err := client.Login(nil).Create(map[string]any{
    "email": /* `$STRING` */,
    "password": /* `$STRING` */,
    "token": /* `$STRING` */,
}, nil)
```


### Register

Create an instance: `register := client.Register(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `password` | ``$STRING`` |  |
| `token` | ``$STRING`` |  |

#### Example: Create

```go
result, err := client.Register(nil).Create(map[string]any{
    "email": /* `$STRING` */,
    "password": /* `$STRING` */,
    "token": /* `$STRING` */,
}, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/hosted-rest-sdk/
├── hosted-rest.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/hosted-rest-sdk`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
