# HostedRest SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes 22 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **AgentHealth** |  | `/agent/v1/health` |
| **AgentSandbox** |  | `/agent/v1/auth/login` |
| **AgentUserDetail** |  | `/agent/v1/users/{id}` |
| **AgentUserList** |  | `/agent/v1/users` |
| **AppUser** |  | `/api/app-users/{id}/sessions/simulate` |
| **AppUserLogin** |  | `/api/app-users/login` |
| **AppUserSession** |  | `/api/app-users/me` |
| **AppUserTotal** |  | `/api/projects/{projectId}/app-users/total` |
| **AppUserVerify** |  | `/api/app-users/verify` |
| **Authentication** |  | `/api/logout` |
| **Collection** |  | `/api/collections` |
| **CollectionRecord** |  | `/api/collections/{slug}/records` |
| **CollectionRecordList** |  | `/api/collections/{slug}/records` |
| **Custom** |  | `/api/custom/{path}` |
| **Legacy** |  | `/api/users/{id}` |
| **LegacyMutation** |  | `/api/users` |
| **LegacyUnknown** |  | `/api/unknown/{id}` |
| **LegacyUnknownList** |  | `/api/unknown` |
| **LegacyUser** |  | `/api/users/{id}` |
| **LegacyUserList** |  | `/api/users` |
| **Login** |  | `/api/login` |
| **Register** |  | `/api/register` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/hosted-rest-sdk/go"

client := sdk.NewHostedRestSDK(map[string]any{
    "apikey": os.Getenv("HOSTED-REST_APIKEY"),
})

```

### Lua

```lua
local sdk = require("hosted-rest_sdk")

local client = sdk.new({
  apikey = os.getenv("HOSTED-REST_APIKEY"),
})


-- Load a specific agenthealth
local agenthealth, err = client:AgentHealth(nil):load(
  { id = "example_id" }, nil
)
```

### PHP

```php
<?php
require_once 'hostedrest_sdk.php';

$client = new HostedRestSDK([
    "apikey" => getenv("HOSTED-REST_APIKEY"),
]);


// Load a specific agenthealth
[$agenthealth, $err] = $client->AgentHealth(null)->load(
    ["id" => "example_id"], null
);
```

### Python

```python
import os
from hostedrest_sdk import HostedRestSDK

client = HostedRestSDK({
    "apikey": os.environ.get("HOSTED-REST_APIKEY"),
})


# Load a specific agenthealth
agenthealth, err = client.AgentHealth(None).load(
    {"id": "example_id"}, None
)
```

### Ruby

```ruby
require_relative "HostedRest_sdk"

client = HostedRestSDK.new({
  "apikey" => ENV["HOSTED-REST_APIKEY"],
})


# Load a specific agenthealth
agenthealth, err = client.AgentHealth(nil).load(
  { "id" => "example_id" }, nil
)
```

### TypeScript

```ts
import { HostedRestSDK } from 'hosted-rest'

const client = new HostedRestSDK({
  apikey: process.env.HOSTED-REST_APIKEY,
})

```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.AgentHealth(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:AgentHealth(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = HostedRestSDK::test(null, null);
[$result, $err] = $client->AgentHealth(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = HostedRestSDK.test(None, None)
result, err = client.AgentHealth(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = HostedRestSDK.test(nil, nil)
result, err = client.AgentHealth(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = HostedRestSDK.test()
const result = await client.AgentHealth().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

