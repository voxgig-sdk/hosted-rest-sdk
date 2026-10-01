# HostedRest Ruby SDK



The Ruby SDK for the HostedRest API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AgentHealth` — with named operations (`list`/`load`/`create`/`update`/`remove`/`patch`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/hosted-rest-sdk/releases)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/hosted-rest-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-hosted-rest-sdk", path: "./hosted-rest-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "HostedRest_sdk"

client = HostedRestSDK.new({
  "apikey" => ENV["HOSTED_REST_APIKEY"],
})
```

### 3. Load a collectionrecord

CollectionRecord is nested under collection, so provide the `collection_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the CollectionRecord record (raises on error).
  collectionrecord = client.CollectionRecord.load({ "collection_id" => "example_collection_id", "id" => "example_id" })
  puts collectionrecord
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  agenthealth = client.AgentHealth.load()
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = HostedRestSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
agenthealth = client.AgentHealth.load()
puts agenthealth
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
HOSTED_REST_TEST_LIVE=TRUE
HOSTED_REST_APIKEY=<your-key>
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
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `AgentHealth` | `(data) -> AgentHealthEntity` | Create an AgentHealth entity instance. |
| `AgentSandbox` | `(data) -> AgentSandboxEntity` | Create an AgentSandbox entity instance. |
| `AgentUser` | `(data) -> AgentUserEntity` | Create an AgentUser entity instance. |
| `AppUser` | `(data) -> AppUserEntity` | Create an AppUser entity instance. |
| `AppUserLogin` | `(data) -> AppUserLoginEntity` | Create an AppUserLogin entity instance. |
| `AppUserSession` | `(data) -> AppUserSessionEntity` | Create an AppUserSession entity instance. |
| `AppUserTotal` | `(data) -> AppUserTotalEntity` | Create an AppUserTotal entity instance. |
| `AppUserVerify` | `(data) -> AppUserVerifyEntity` | Create an AppUserVerify entity instance. |
| `Authentication` | `(data) -> AuthenticationEntity` | Create an Authentication entity instance. |
| `Collection` | `(data) -> CollectionEntity` | Create a Collection entity instance. |
| `CollectionRecord` | `(data) -> CollectionRecordEntity` | Create a CollectionRecord entity instance. |
| `Custom` | `(data) -> CustomEntity` | Create a Custom entity instance. |
| `Legacy` | `(data) -> LegacyEntity` | Create a Legacy entity instance. |
| `LegacyMutation` | `(data) -> LegacyMutationEntity` | Create a LegacyMutation entity instance. |
| `LegacyUnknown` | `(data) -> LegacyUnknownEntity` | Create a LegacyUnknown entity instance. |
| `LegacyUser` | `(data) -> LegacyUserEntity` | Create a LegacyUser entity instance. |
| `Login` | `(data) -> LoginEntity` | Create a Login entity instance. |
| `Register` | `(data) -> RegisterEntity` | Create a Register entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `HostedRestError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### AgentHealth

| Field | Description |
| --- | --- |
| `deprecations` |  |
| `rate_limit_status` |  |
| `status` |  |
| `uptime_seconds` |  |
| `version` |  |

Operations: Load.

API path: `/agent/v1/health`

#### AgentSandbox

| Field | Description |
| --- | --- |
| `email` |  |
| `password` |  |

Operations: Create, Load.

API path: `/agent/v1/auth/login`

#### AgentUser

| Field | Description |
| --- | --- |
| `created_at` |  |
| `email` |  |
| `full_name` |  |
| `id` |  |
| `locale` |  |
| `preferences` |  |
| `profile` |  |
| `status` |  |
| `timezone` |  |
| `updated_at` |  |

Operations: List, Load.

API path: `/agent/v1/users`

#### AppUser

| Field | Description |
| --- | --- |
| `created_at` |  |
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
| `email` |  |
| `metadata` |  |
| `project_id` |  |

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
| `total` |  |

Operations: Load.

API path: `/api/projects/{projectId}/app-users/total`

#### AppUserVerify

| Field | Description |
| --- | --- |
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
| `app_user_id` |  |
| `collection_id` |  |
| `created_at` |  |
| `created_by` |  |
| `data` |  |
| `deleted_at` |  |
| `id` |  |
| `project_id` |  |
| `updated_at` |  |

Operations: Create, List, Load, Update.

API path: `/api/collections/{slug}/records`

#### Custom

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/custom/{path}`

#### Legacy

| Field | Description |
| --- | --- |
| `avatar` |  |
| `email` |  |
| `first_name` |  |
| `id` |  |
| `last_name` |  |

Operations: Create, List, Remove.

API path: `/api/users`

#### LegacyMutation

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `id` |  |
| `updatedAt` |  |

Operations: Patch, Update.

API path: `/api/users/{id}`

#### LegacyUnknown

| Field | Description |
| --- | --- |
| `color` |  |
| `data` |  |
| `id` |  |
| `name` |  |
| `pantone_value` |  |
| `support` |  |
| `year` |  |

Operations: List, Load.

API path: `/api/unknown`

#### LegacyUser

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |
| `support` |  |

Operations: Load.

API path: `/api/users/{id}`

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

Create an instance: `agent_health = client.AgentHealth`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecations` | `Array` |  |
| `rate_limit_status` | `Hash` |  |
| `status` | `String` |  |
| `uptime_seconds` | `Integer` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentHealth record (raises on error).
agent_health = client.AgentHealth.load()
```


### AgentSandbox

Create an instance: `agent_sandbox = client.AgentSandbox`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `password` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentSandbox record (raises on error).
agent_sandbox = client.AgentSandbox.load({ "scenario" => "scenario" })
```

#### Example: Create

```ruby
agent_sandbox = client.AgentSandbox.create({
  "email" => "example_email", # String
  "password" => "example_password", # String
})
```


### AgentUser

Create an instance: `agent_user = client.AgentUser`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `email` | `String` |  |
| `full_name` | `String` |  |
| `id` | `String` |  |
| `locale` | `String` |  |
| `preferences` | `Hash` |  |
| `profile` | `Hash` |  |
| `status` | `String` |  |
| `timezone` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentUser record (raises on error).
agent_user = client.AgentUser.load({ "id" => "agent_user_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentUser records (raises on error).
agent_users = client.AgentUser.list
```


### AppUser

Create an instance: `app_user = client.AppUser`

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
| `created_at` | `String` |  |
| `email` | `String` |  |
| `id` | `String` |  |
| `last_login_at` | `String` |  |
| `metadata` | `Hash` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppUser record (raises on error).
app_user = client.AppUser.load({ "id" => "app_user_id" })
```

#### Example: List

```ruby
# list returns an Array of AppUser records (raises on error).
app_users = client.AppUser.list
```

#### Example: Create

```ruby
app_user = client.AppUser.create({
  "email" => "example_email", # String
  "id" => "example_id", # String
})
```


### AppUserLogin

Create an instance: `app_user_login = client.AppUserLogin`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `metadata` | `Hash` |  |
| `project_id` | `String` |  |

#### Example: Create

```ruby
app_user_login = client.AppUserLogin.create({
  "email" => "example_email", # String
})
```


### AppUserSession

Create an instance: `app_user_session = client.AppUserSession`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppUserSession record (raises on error).
app_user_session = client.AppUserSession.load()
```


### AppUserTotal

Create an instance: `app_user_total = client.AppUserTotal`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `total` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppUserTotal record (raises on error).
app_user_total = client.AppUserTotal.load({ "project_id" => "project_id" })
```


### AppUserVerify

Create an instance: `app_user_verify = client.AppUserVerify`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `token` | `String` |  |

#### Example: Create

```ruby
app_user_verify = client.AppUserVerify.create({
  "token" => "example_token", # String
})
```


### Authentication

Create an instance: `authentication = client.Authentication`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
authentication = client.Authentication.create({
})
```


### Collection

Create an instance: `collection = client.Collection`

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
| `created_at` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `project_id` | `String` |  |
| `schema` | `Hash` |  |
| `slug` | `String` |  |
| `updated_at` | `String` |  |
| `user_id` | `String` |  |
| `visibility` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Collection record (raises on error).
collection = client.Collection.load({ "id" => "collection_id" })
```

#### Example: List

```ruby
# list returns an Array of Collection records (raises on error).
collections = client.Collection.list
```

#### Example: Create

```ruby
collection = client.Collection.create({
  "id" => "example_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```


### CollectionRecord

Create an instance: `collection_record = client.CollectionRecord`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_user_id` | `String` |  |
| `collection_id` | `String` |  |
| `created_at` | `String` |  |
| `created_by` | `String` |  |
| `data` | `Hash` |  |
| `deleted_at` | `String` |  |
| `id` | `String` |  |
| `project_id` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CollectionRecord record (raises on error).
collection_record = client.CollectionRecord.load({ "id" => "collection_record_id", "collection_id" => "collection_id" })
```

#### Example: List

```ruby
# list returns an Array of CollectionRecord records (raises on error).
collection_records = client.CollectionRecord.list
```

#### Example: Create

```ruby
collection_record = client.CollectionRecord.create({
  "slug" => "example_slug", # String
  "data" => {}, # Hash
  "id" => "example_id", # String
})
```


### Custom

Create an instance: `custom = client.Custom`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Custom record (raises on error).
custom = client.Custom.load({ "id" => "custom_id" })
```

#### Example: Create

```ruby
custom = client.Custom.create({
  "id" => "example_id", # String
})
```


### Legacy

Create an instance: `legacy = client.Legacy`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | `String` |  |
| `email` | `String` |  |
| `first_name` | `String` |  |
| `id` | `Integer` |  |
| `last_name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Legacy records (raises on error).
legacys = client.Legacy.list
```

#### Example: Create

```ruby
legacy = client.Legacy.create({
  "avatar" => "example_avatar", # String
  "email" => "example_email", # String
  "first_name" => "example_first_name", # String
  "id" => 1, # Integer
  "last_name" => "example_last_name", # String
})
```


### LegacyMutation

Create an instance: `legacy_mutation = client.LegacyMutation`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `String` |  |
| `id` | `String` |  |
| `updatedAt` | `String` |  |


### LegacyUnknown

Create an instance: `legacy_unknown = client.LegacyUnknown`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `String` |  |
| `data` | `Hash` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `pantone_value` | `String` |  |
| `support` | `Hash` |  |
| `year` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LegacyUnknown record (raises on error).
legacy_unknown = client.LegacyUnknown.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of LegacyUnknown records (raises on error).
legacy_unknowns = client.LegacyUnknown.list
```


### LegacyUser

Create an instance: `legacy_user = client.LegacyUser`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Hash` |  |
| `id` | `String` |  |
| `support` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LegacyUser record (raises on error).
legacy_user = client.LegacyUser.load({ "id" => 1 })
```


### Login

Create an instance: `login = client.Login`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `password` | `String` |  |
| `token` | `String` |  |

#### Example: Create

```ruby
login = client.Login.create({
  "email" => "example_email", # String
  "password" => "example_password", # String
  "token" => "example_token", # String
})
```


### Register

Create an instance: `register = client.Register`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `id` | `Integer` |  |
| `password` | `String` |  |
| `token` | `String` |  |

#### Example: Create

```ruby
register = client.Register.create({
  "email" => "example_email", # String
  "password" => "example_password", # String
  "token" => "example_token", # String
})
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

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
├── schema.rb                  -- Generated option + entity specs
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
agenthealth = client.AgentHealth
agenthealth.load()

# agenthealth.data_get now returns the agenthealth data from the last load
# agenthealth.match_get returns the last match criteria
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
