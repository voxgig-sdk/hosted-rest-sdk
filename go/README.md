# HostedRest Golang SDK



The Golang SDK for the HostedRest API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.AgentHealth(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`, `Patch`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/hosted-rest-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/hosted-rest-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/hosted-rest-sdk/go=../hosted-rest-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/hosted-rest-sdk/go"
)

func main() {
    client := sdk.NewHostedRestSDK(map[string]any{
        "apikey": os.Getenv("HOSTED_REST_APIKEY"),
    })

    // Load a single agentHealth — the value is the loaded record.
    agentHealth, err := client.AgentHealth(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(agentHealth)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
agenthealth, err := client.AgentHealth(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = agenthealth
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
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
client := sdk.Test()

agentHealth, err := client.AgentHealth(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(agentHealth) // the returned mock data
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
HOSTED_REST_TEST_LIVE=TRUE
HOSTED_REST_APIKEY=<your-key>
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
| `AgentHealth` | `(data map[string]any) HostedRestEntity` | Create an AgentHealth entity instance. |
| `AgentSandbox` | `(data map[string]any) HostedRestEntity` | Create an AgentSandbox entity instance. |
| `AgentUserDetail` | `(data map[string]any) HostedRestEntity` | Create an AgentUserDetail entity instance. |
| `AgentUserList` | `(data map[string]any) HostedRestEntity` | Create an AgentUserList entity instance. |
| `AppUser` | `(data map[string]any) HostedRestEntity` | Create an AppUser entity instance. |
| `AppUserLogin` | `(data map[string]any) HostedRestEntity` | Create an AppUserLogin entity instance. |
| `AppUserSession` | `(data map[string]any) HostedRestEntity` | Create an AppUserSession entity instance. |
| `AppUserTotal` | `(data map[string]any) HostedRestEntity` | Create an AppUserTotal entity instance. |
| `AppUserVerify` | `(data map[string]any) HostedRestEntity` | Create an AppUserVerify entity instance. |
| `Authentication` | `(data map[string]any) HostedRestEntity` | Create an Authentication entity instance. |
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

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    agentHealth, err := client.AgentHealth(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // agentHealth is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### AgentHealth

| Field | Description |
| --- | --- |
| `"deprecations"` |  |
| `"rate_limit_status"` |  |
| `"status"` |  |
| `"uptime_seconds"` |  |
| `"version"` |  |

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
| `"created_at"` |  |
| `"email"` |  |
| `"full_name"` |  |
| `"id"` |  |
| `"locale"` |  |
| `"preferences"` |  |
| `"profile"` |  |
| `"status"` |  |
| `"timezone"` |  |
| `"updated_at"` |  |

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
| `"preferences"` |  |
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
| `"email"` |  |
| `"metadata"` |  |
| `"project_id"` |  |

Operations: Create.

API path: `/api/app-users/login`

#### AppUserSession

| Field | Description |
| --- | --- |

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
| `"app_user_id"` |  |
| `"collection_id"` |  |
| `"created_at"` |  |
| `"created_by"` |  |
| `"data"` |  |
| `"deleted_at"` |  |
| `"id"` |  |
| `"project_id"` |  |
| `"updated_at"` |  |

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
| `"createdAt"` |  |
| `"id"` |  |
| `"updatedAt"` |  |

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

Create an instance: `agentHealth := client.AgentHealth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecations` | `[]any` |  |
| `rate_limit_status` | `map[string]any` |  |
| `status` | `string` |  |
| `uptime_seconds` | `int` |  |
| `version` | `string` |  |

#### Example: Load

```go
agentHealth, err := client.AgentHealth(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentHealth) // the loaded record
```


### AgentSandbox

Create an instance: `agentSandbox := client.AgentSandbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `password` | `string` |  |

#### Example: Load

```go
agentSandbox, err := client.AgentSandbox(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentSandbox) // the loaded record
```

#### Example: Create

```go
result, err := client.AgentSandbox(nil).Create(map[string]any{
    "email": "example_email",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### AgentUserDetail

Create an instance: `agentUserDetail := client.AgentUserDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `email` | `string` |  |
| `full_name` | `string` |  |
| `id` | `string` |  |
| `locale` | `string` |  |
| `preferences` | `map[string]any` |  |
| `profile` | `map[string]any` |  |
| `status` | `string` |  |
| `timezone` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
agentUserDetail, err := client.AgentUserDetail(nil).Load(map[string]any{"id": "agent_user_detail_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentUserDetail) // the loaded record
```


### AgentUserList

Create an instance: `agentUserList := client.AgentUserList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `email` | `string` |  |
| `full_name` | `string` |  |
| `id` | `string` |  |
| `locale` | `string` |  |
| `preferences` | `map[string]any` |  |
| `profile` | `map[string]any` |  |
| `status` | `string` |  |
| `timezone` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```go
agentUserLists, err := client.AgentUserList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentUserLists) // the array of records
```


### AppUser

Create an instance: `appUser := client.AppUser(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `last_login_at` | `string` |  |
| `metadata` | `map[string]any` |  |
| `status` | `string` |  |

#### Example: Load

```go
appUser, err := client.AppUser(nil).Load(map[string]any{"id": "app_user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appUser) // the loaded record
```

#### Example: List

```go
appUsers, err := client.AppUser(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(appUsers) // the array of records
```

#### Example: Create

```go
result, err := client.AppUser(nil).Create(map[string]any{
    "email": "example_email",
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### AppUserLogin

Create an instance: `appUserLogin := client.AppUserLogin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `metadata` | `map[string]any` |  |
| `project_id` | `string` |  |

#### Example: Create

```go
result, err := client.AppUserLogin(nil).Create(map[string]any{
    "email": "example_email",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### AppUserSession

Create an instance: `appUserSession := client.AppUserSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
appUserSession, err := client.AppUserSession(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(appUserSession) // the loaded record
```


### AppUserTotal

Create an instance: `appUserTotal := client.AppUserTotal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `total` | `int` |  |

#### Example: Load

```go
appUserTotal, err := client.AppUserTotal(nil).Load(map[string]any{"project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appUserTotal) // the loaded record
```


### AppUserVerify

Create an instance: `appUserVerify := client.AppUserVerify(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `token` | `string` |  |

#### Example: Create

```go
result, err := client.AppUserVerify(nil).Create(map[string]any{
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Collection

Create an instance: `collection := client.Collection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `schema` | `map[string]any` |  |
| `slug` | `string` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `visibility` | `string` |  |

#### Example: Load

```go
collection, err := client.Collection(nil).Load(map[string]any{"id": "collection_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(collection) // the loaded record
```

#### Example: List

```go
collections, err := client.Collection(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(collections) // the array of records
```

#### Example: Create

```go
result, err := client.Collection(nil).Create(map[string]any{
    "id": "example_id",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### CollectionRecord

Create an instance: `collectionRecord := client.CollectionRecord(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_user_id` | `string` |  |
| `collection_id` | `string` |  |
| `created_at` | `string` |  |
| `created_by` | `string` |  |
| `data` | `map[string]any` |  |
| `deleted_at` | `string` |  |
| `id` | `string` |  |
| `project_id` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
collectionRecord, err := client.CollectionRecord(nil).Load(map[string]any{"id": "collection_record_id", "collection_id": "collection_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(collectionRecord) // the loaded record
```

#### Example: Create

```go
result, err := client.CollectionRecord(nil).Create(map[string]any{
    "slug": "example_slug",
    "data": map[string]any{},
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### CollectionRecordList

Create an instance: `collectionRecordList := client.CollectionRecordList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_user_id` | `string` |  |
| `collection_id` | `string` |  |
| `created_at` | `string` |  |
| `created_by` | `string` |  |
| `data` | `map[string]any` |  |
| `deleted_at` | `string` |  |
| `id` | `string` |  |
| `project_id` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```go
collectionRecordLists, err := client.CollectionRecordList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(collectionRecordLists) // the array of records
```


### Custom

Create an instance: `custom := client.Custom(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Example: Load

```go
custom, err := client.Custom(nil).Load(map[string]any{"id": "custom_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(custom) // the loaded record
```

#### Example: Create

```go
result, err := client.Custom(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Legacy

Create an instance: `legacy := client.Legacy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### LegacyMutation

Create an instance: `legacyMutation := client.LegacyMutation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `id` | `string` |  |
| `updatedAt` | `string` |  |

#### Example: Create

```go
result, err := client.LegacyMutation(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### LegacyUnknown

Create an instance: `legacyUnknown := client.LegacyUnknown(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `support` | `map[string]any` |  |

#### Example: Load

```go
legacyUnknown, err := client.LegacyUnknown(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(legacyUnknown) // the loaded record
```


### LegacyUnknownList

Create an instance: `legacyUnknownList := client.LegacyUnknownList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `pantone_value` | `string` |  |
| `year` | `int` |  |

#### Example: List

```go
legacyUnknownLists, err := client.LegacyUnknownList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(legacyUnknownLists) // the array of records
```


### LegacyUser

Create an instance: `legacyUser := client.LegacyUser(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `support` | `map[string]any` |  |

#### Example: Load

```go
legacyUser, err := client.LegacyUser(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(legacyUser) // the loaded record
```


### LegacyUserList

Create an instance: `legacyUserList := client.LegacyUserList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | `string` |  |
| `email` | `string` |  |
| `first_name` | `string` |  |
| `id` | `int` |  |
| `last_name` | `string` |  |

#### Example: List

```go
legacyUserLists, err := client.LegacyUserList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(legacyUserLists) // the array of records
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
| `email` | `string` |  |
| `password` | `string` |  |
| `token` | `string` |  |

#### Example: Create

```go
result, err := client.Login(nil).Create(map[string]any{
    "email": "example_email",
    "password": "example_password",
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
| `email` | `string` |  |
| `id` | `int` |  |
| `password` | `string` |  |
| `token` | `string` |  |

#### Example: Create

```go
result, err := client.Register(nil).Create(map[string]any{
    "email": "example_email",
    "password": "example_password",
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
github.com/voxgig-sdk/hosted-rest-sdk/go/
├── hosted-rest.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/hosted-rest-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
agenthealth := client.AgentHealth(nil)
agenthealth.Load(nil, nil)

// agenthealth.Data() now returns the agenthealth data from the last load
// agenthealth.Match() returns the last match criteria
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
