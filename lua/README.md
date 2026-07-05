# HostedRest Lua SDK



The Lua SDK for the HostedRest API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:AgentHealth()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/hosted-rest-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("hosted-rest_sdk")

local client = sdk.new({
  apikey = os.getenv("HOSTED_REST_APIKEY"),
})
```

### 3. Load an agenthealth

```lua
local agenthealth, err = client:AgentHealth():load()
if err then error(err) end
print(agenthealth)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local agenthealth, err = client:AgentHealth():load()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:AgentHealth():load()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### HostedRestSDK

```lua
local sdk = require("hosted-rest_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### HostedRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `AgentHealth` | `(data) -> AgentHealthEntity` | Create an AgentHealth entity instance. |
| `AgentSandbox` | `(data) -> AgentSandboxEntity` | Create an AgentSandbox entity instance. |
| `AgentUserDetail` | `(data) -> AgentUserDetailEntity` | Create an AgentUserDetail entity instance. |
| `AgentUserList` | `(data) -> AgentUserListEntity` | Create an AgentUserList entity instance. |
| `AppUser` | `(data) -> AppUserEntity` | Create an AppUser entity instance. |
| `AppUserLogin` | `(data) -> AppUserLoginEntity` | Create an AppUserLogin entity instance. |
| `AppUserSession` | `(data) -> AppUserSessionEntity` | Create an AppUserSession entity instance. |
| `AppUserTotal` | `(data) -> AppUserTotalEntity` | Create an AppUserTotal entity instance. |
| `AppUserVerify` | `(data) -> AppUserVerifyEntity` | Create an AppUserVerify entity instance. |
| `Authentication` | `(data) -> AuthenticationEntity` | Create an Authentication entity instance. |
| `Collection` | `(data) -> CollectionEntity` | Create a Collection entity instance. |
| `CollectionRecord` | `(data) -> CollectionRecordEntity` | Create a CollectionRecord entity instance. |
| `CollectionRecordList` | `(data) -> CollectionRecordListEntity` | Create a CollectionRecordList entity instance. |
| `Custom` | `(data) -> CustomEntity` | Create a Custom entity instance. |
| `Legacy` | `(data) -> LegacyEntity` | Create a Legacy entity instance. |
| `LegacyMutation` | `(data) -> LegacyMutationEntity` | Create a LegacyMutation entity instance. |
| `LegacyUnknown` | `(data) -> LegacyUnknownEntity` | Create a LegacyUnknown entity instance. |
| `LegacyUnknownList` | `(data) -> LegacyUnknownListEntity` | Create a LegacyUnknownList entity instance. |
| `LegacyUser` | `(data) -> LegacyUserEntity` | Create a LegacyUser entity instance. |
| `LegacyUserList` | `(data) -> LegacyUserListEntity` | Create a LegacyUserList entity instance. |
| `Login` | `(data) -> LoginEntity` | Create a Login entity instance. |
| `Register` | `(data) -> RegisterEntity` | Create a Register entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local agent_health, err = client:AgentHealth():load()
    if err then error(err) end
    -- agent_health is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local agent_health = client:AgentHealth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |

#### Example: Load

```lua
local agent_health, err = client:AgentHealth():load()
```


### AgentSandbox

Create an instance: `local agent_sandbox = client:AgentSandbox(nil)`

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

```lua
local agent_sandbox, err = client:AgentSandbox():load()
```

#### Example: Create

```lua
local agent_sandbox, err = client:AgentSandbox():create({
  email = nil, -- string
  password = nil, -- string
})
```


### AgentUserDetail

Create an instance: `local agent_user_detail = client:AgentUserDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |

#### Example: Load

```lua
local agent_user_detail, err = client:AgentUserDetail():load({ id = "agent_user_detail_id" })
```


### AgentUserList

Create an instance: `local agent_user_list = client:AgentUserList(nil)`

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
| `preference` | `table` |  |
| `profile` | `table` |  |
| `status` | `string` |  |
| `timezone` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```lua
local agent_user_lists, err = client:AgentUserList():list()
```


### AppUser

Create an instance: `local app_user = client:AppUser(nil)`

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
| `data` | `table` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `last_login_at` | `string` |  |
| `metadata` | `table` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local app_user, err = client:AppUser():load({ id = "app_user_id" })
```

#### Example: List

```lua
local app_users, err = client:AppUser():list()
```

#### Example: Create

```lua
local app_user, err = client:AppUser():create({
  data = nil, -- table
  email = nil, -- string
})
```


### AppUserLogin

Create an instance: `local app_user_login = client:AppUserLogin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `email` | `string` |  |
| `metadata` | `table` |  |
| `project_id` | `string` |  |

#### Example: Create

```lua
local app_user_login, err = client:AppUserLogin():create({
  data = nil, -- table
  email = nil, -- string
})
```


### AppUserSession

Create an instance: `local app_user_session = client:AppUserSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |

#### Example: Load

```lua
local app_user_session, err = client:AppUserSession():load()
```


### AppUserTotal

Create an instance: `local app_user_total = client:AppUserTotal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `total` | `number` |  |

#### Example: Load

```lua
local app_user_total, err = client:AppUserTotal():load()
```


### AppUserVerify

Create an instance: `local app_user_verify = client:AppUserVerify(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `token` | `string` |  |

#### Example: Create

```lua
local app_user_verify, err = client:AppUserVerify():create({
  data = nil, -- table
  token = nil, -- string
})
```


### Authentication

Create an instance: `local authentication = client:Authentication(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local authentication, err = client:Authentication():create({
})
```


### Collection

Create an instance: `local collection = client:Collection(nil)`

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
| `data` | `table` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `schema` | `table` |  |
| `slug` | `string` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `visibility` | `string` |  |

#### Example: Load

```lua
local collection, err = client:Collection():load({ id = "collection_id" })
```

#### Example: List

```lua
local collections, err = client:Collection():list()
```

#### Example: Create

```lua
local collection, err = client:Collection():create({
  data = nil, -- table
  name = nil, -- string
})
```


### CollectionRecord

Create an instance: `local collection_record = client:CollectionRecord(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |

#### Example: Load

```lua
local collection_record, err = client:CollectionRecord():load({ id = "collection_record_id" })
```

#### Example: Create

```lua
local collection_record, err = client:CollectionRecord():create({
  data = nil, -- table
})
```


### CollectionRecordList

Create an instance: `local collection_record_list = client:CollectionRecordList(nil)`

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
| `data` | `table` |  |
| `deleted_at` | `string` |  |
| `id` | `string` |  |
| `project_id` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```lua
local collection_record_lists, err = client:CollectionRecordList():list()
```


### Custom

Create an instance: `local custom = client:Custom(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```lua
local custom, err = client:Custom():load({ id = "custom_id" })
```

#### Example: Create

```lua
local custom, err = client:Custom():create({
})
```


### Legacy

Create an instance: `local legacy = client:Legacy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### LegacyMutation

Create an instance: `local legacy_mutation = client:LegacyMutation(nil)`

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

```lua
local legacy_mutation, err = client:LegacyMutation():create({
})
```


### LegacyUnknown

Create an instance: `local legacy_unknown = client:LegacyUnknown(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `support` | `table` |  |

#### Example: Load

```lua
local legacy_unknown, err = client:LegacyUnknown():load({ id = "legacy_unknown_id" })
```


### LegacyUnknownList

Create an instance: `local legacy_unknown_list = client:LegacyUnknownList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `string` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `pantone_value` | `string` |  |
| `year` | `number` |  |

#### Example: List

```lua
local legacy_unknown_lists, err = client:LegacyUnknownList():list()
```


### LegacyUser

Create an instance: `local legacy_user = client:LegacyUser(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `support` | `table` |  |

#### Example: Load

```lua
local legacy_user, err = client:LegacyUser():load({ id = "legacy_user_id" })
```


### LegacyUserList

Create an instance: `local legacy_user_list = client:LegacyUserList(nil)`

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
| `id` | `number` |  |
| `last_name` | `string` |  |

#### Example: List

```lua
local legacy_user_lists, err = client:LegacyUserList():list()
```


### Login

Create an instance: `local login = client:Login(nil)`

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

```lua
local login, err = client:Login():create({
  email = nil, -- string
  password = nil, -- string
  token = nil, -- string
})
```


### Register

Create an instance: `local register = client:Register(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `id` | `number` |  |
| `password` | `string` |  |
| `token` | `string` |  |

#### Example: Create

```lua
local register, err = client:Register():create({
  email = nil, -- string
  password = nil, -- string
  token = nil, -- string
})
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── hosted-rest_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`hosted-rest_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local agenthealth = client:AgentHealth()
agenthealth:load()

-- agenthealth:data_get() now returns the agenthealth data from the last load
-- agenthealth:match_get() returns the last match criteria
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
