# HostedRest Ruby SDK



The Ruby SDK for the HostedRest API — an entity-oriented client using idiomatic Ruby conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
gem install hosted-rest-sdk
```

Or add to your `Gemfile`:

```ruby
gem "hosted-rest-sdk"
```

Then run:

```bash
bundle install
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "HostedRest_sdk"

client = HostedRestSDK.new({
  "apikey" => ENV["HOSTED-REST_APIKEY"],
})
```

### 3. Load a agenthealth

```ruby
result, err = client.AgentHealth().load({ "id" => "example_id" })
raise err if err
puts result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
raise err if err

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
end
```

### Prepare a request without sending it

```ruby
fetchdef, err = client.prepare({
  "path" => "/api/resource/{id}",
  "method" => "DELETE",
  "params" => { "id" => "example" },
})
raise err if err

puts fetchdef["url"]
puts fetchdef["method"]
puts fetchdef["headers"]
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = HostedRestSDK.test

result, err = client.HostedRest().load({ "id" => "test01" })
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = HostedRestSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### HostedRestSDK

```ruby
require_relative "HostedRest_sdk"
client = HostedRestSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = HostedRestSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### HostedRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> [Hash, err]` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> [Hash, err]` | Build and send an HTTP request. |
| `AgentHealth` | `(data) -> AgentHealthEntity` | Create a AgentHealth entity instance. |
| `AgentSandbox` | `(data) -> AgentSandboxEntity` | Create a AgentSandbox entity instance. |
| `AgentUserDetail` | `(data) -> AgentUserDetailEntity` | Create a AgentUserDetail entity instance. |
| `AgentUserList` | `(data) -> AgentUserListEntity` | Create a AgentUserList entity instance. |
| `AppUser` | `(data) -> AppUserEntity` | Create a AppUser entity instance. |
| `AppUserLogin` | `(data) -> AppUserLoginEntity` | Create a AppUserLogin entity instance. |
| `AppUserSession` | `(data) -> AppUserSessionEntity` | Create a AppUserSession entity instance. |
| `AppUserTotal` | `(data) -> AppUserTotalEntity` | Create a AppUserTotal entity instance. |
| `AppUserVerify` | `(data) -> AppUserVerifyEntity` | Create a AppUserVerify entity instance. |
| `Authentication` | `(data) -> AuthenticationEntity` | Create a Authentication entity instance. |
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
| `load` | `(reqmatch, ctrl) -> [any, err]` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> [any, err]` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> [any, err]` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> [any, err]` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> [any, err]` | Remove an entity. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return `[any, err]`. The first value is a
`Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

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

Create an instance: `const agent_health = client.AgentHealth()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |

#### Example: Load

```ts
const agent_health = await client.AgentHealth().load({ id: 'agent_health_id' })
```


### AgentSandbox

Create an instance: `const agent_sandbox = client.AgentSandbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | ``$STRING`` |  |
| `password` | ``$STRING`` |  |

#### Example: Load

```ts
const agent_sandbox = await client.AgentSandbox().load({ id: 'agent_sandbox_id' })
```

#### Example: Create

```ts
const agent_sandbox = await client.AgentSandbox().create({
  email: /* `$STRING` */,
  password: /* `$STRING` */,
})
```


### AgentUserDetail

Create an instance: `const agent_user_detail = client.AgentUserDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |

#### Example: Load

```ts
const agent_user_detail = await client.AgentUserDetail().load({ id: 'agent_user_detail_id' })
```


### AgentUserList

Create an instance: `const agent_user_list = client.AgentUserList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ts
const agent_user_lists = await client.AgentUserList().list()
```


### AppUser

Create an instance: `const app_user = client.AppUser()`

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
| `created_at` | ``$STRING`` |  |
| `data` | ``$OBJECT`` |  |
| `email` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `last_login_at` | ``$STRING`` |  |
| `metadata` | ``$OBJECT`` |  |
| `status` | ``$STRING`` |  |

#### Example: Load

```ts
const app_user = await client.AppUser().load({ id: 'app_user_id' })
```

#### Example: List

```ts
const app_users = await client.AppUser().list()
```

#### Example: Create

```ts
const app_user = await client.AppUser().create({
  data: /* `$OBJECT` */,
  email: /* `$STRING` */,
})
```


### AppUserLogin

Create an instance: `const app_user_login = client.AppUserLogin()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `email` | ``$STRING`` |  |
| `metadata` | ``$OBJECT`` |  |
| `project_id` | ``$STRING`` |  |

#### Example: Create

```ts
const app_user_login = await client.AppUserLogin().create({
  data: /* `$OBJECT` */,
  email: /* `$STRING` */,
})
```


### AppUserSession

Create an instance: `const app_user_session = client.AppUserSession()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |

#### Example: Load

```ts
const app_user_session = await client.AppUserSession().load({ id: 'app_user_session_id' })
```


### AppUserTotal

Create an instance: `const app_user_total = client.AppUserTotal()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```ts
const app_user_total = await client.AppUserTotal().load({ id: 'app_user_total_id' })
```


### AppUserVerify

Create an instance: `const app_user_verify = client.AppUserVerify()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `token` | ``$STRING`` |  |

#### Example: Create

```ts
const app_user_verify = await client.AppUserVerify().create({
  data: /* `$OBJECT` */,
  token: /* `$STRING` */,
})
```


### Authentication

Create an instance: `const authentication = client.Authentication()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const authentication = await client.Authentication().create({
})
```


### Collection

Create an instance: `const collection = client.Collection()`

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

```ts
const collection = await client.Collection().load({ id: 'collection_id' })
```

#### Example: List

```ts
const collections = await client.Collection().list()
```

#### Example: Create

```ts
const collection = await client.Collection().create({
  data: /* `$OBJECT` */,
  name: /* `$STRING` */,
})
```


### CollectionRecord

Create an instance: `const collection_record = client.CollectionRecord()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |

#### Example: Load

```ts
const collection_record = await client.CollectionRecord().load({ id: 'collection_record_id' })
```

#### Example: Create

```ts
const collection_record = await client.CollectionRecord().create({
  data: /* `$OBJECT` */,
})
```


### CollectionRecordList

Create an instance: `const collection_record_list = client.CollectionRecordList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ts
const collection_record_lists = await client.CollectionRecordList().list()
```


### Custom

Create an instance: `const custom = client.Custom()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```ts
const custom = await client.Custom().load({ id: 'custom_id' })
```

#### Example: Create

```ts
const custom = await client.Custom().create({
})
```


### Legacy

Create an instance: `const legacy = client.Legacy()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### LegacyMutation

Create an instance: `const legacy_mutation = client.LegacyMutation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |

#### Example: Create

```ts
const legacy_mutation = await client.LegacyMutation().create({
})
```


### LegacyUnknown

Create an instance: `const legacy_unknown = client.LegacyUnknown()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `support` | ``$OBJECT`` |  |

#### Example: Load

```ts
const legacy_unknown = await client.LegacyUnknown().load({ id: 'legacy_unknown_id' })
```


### LegacyUnknownList

Create an instance: `const legacy_unknown_list = client.LegacyUnknownList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `pantone_value` | ``$STRING`` |  |
| `year` | ``$INTEGER`` |  |

#### Example: List

```ts
const legacy_unknown_lists = await client.LegacyUnknownList().list()
```


### LegacyUser

Create an instance: `const legacy_user = client.LegacyUser()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$OBJECT`` |  |
| `support` | ``$OBJECT`` |  |

#### Example: Load

```ts
const legacy_user = await client.LegacyUser().load({ id: 'legacy_user_id' })
```


### LegacyUserList

Create an instance: `const legacy_user_list = client.LegacyUserList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `first_name` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `last_name` | ``$STRING`` |  |

#### Example: List

```ts
const legacy_user_lists = await client.LegacyUserList().list()
```


### Login

Create an instance: `const login = client.Login()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | ``$STRING`` |  |
| `password` | ``$STRING`` |  |
| `token` | ``$STRING`` |  |

#### Example: Create

```ts
const login = await client.Login().create({
  email: /* `$STRING` */,
  password: /* `$STRING` */,
  token: /* `$STRING` */,
})
```


### Register

Create an instance: `const register = client.Register()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `password` | ``$STRING`` |  |
| `token` | ``$STRING`` |  |

#### Example: Create

```ts
const register = await client.Register().create({
  email: /* `$STRING` */,
  password: /* `$STRING` */,
  token: /* `$STRING` */,
})
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
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── HostedRest_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`HostedRest_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
moon = client.Moon
moon.load({ "planet_id" => "earth", "id" => "luna" })

# moon.data_get now returns the loaded moon data
# moon.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
