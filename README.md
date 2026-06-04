# HostedRest SDK

Hosted REST API with real endpoints, persistent data, and request logs for front-end and agent testing

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About ReqRes API

[ReqRes](https://reqres.in) is a hosted RESTful sandbox that responds to AJAX/HTTP requests with simulated and persistent data. It is intended for prototyping front-end code, demoing client libraries, and exercising agent workflows without standing up a real backend.

What you get from the API:

- Classic demo endpoints for paginated user lists, single user lookups, login, and registration.
- Collection-style CRUD endpoints (`/api/collections/{collection}/records`) for creating and reading arbitrary records.
- Per-user session endpoints under `/app/...` that isolate data using a session bearer token.
- Agent-focused endpoints under `/agent/v1/*` for sandboxed agent testing and health checks.
- Machine-readable references at `/openapi.json` and `/llm.txt`.

Operational notes: requests typically require an `x-api-key` header, and per-user data uses `Authorization: Bearer {session_token}`. CORS is enabled. Free usage is rate-limited; paid plans raise the daily/monthly quotas. API keys and projects are managed at `app.reqres.in`.

## Try it

**TypeScript**
```bash
npm install hosted-rest
```

**Python**
```bash
pip install hosted-rest-sdk
```

**PHP**
```bash
composer require voxgig/hosted-rest-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/hosted-rest-sdk/go
```

**Ruby**
```bash
gem install hosted-rest-sdk
```

**Lua**
```bash
luarocks install hosted-rest-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { HostedRestSDK } from 'hosted-rest'

const client = new HostedRestSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o hosted-rest-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "hosted-rest": {
      "command": "/abs/path/to/hosted-rest-mcp"
    }
  }
}
```

## Entities

The API exposes 22 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **AgentHealth** | Health-check endpoints for the agent sandbox under `/agent/v1/*`. | `/agent/v1/health` |
| **AgentSandbox** | Agent-focused sandbox endpoints under `/agent/v1/*` for exercising agent workflows. | `/agent/v1/auth/login` |
| **AgentUserDetail** | Single-user detail endpoints exposed to the agent sandbox. | `/agent/v1/users/{id}` |
| **AgentUserList** | Paginated user list endpoints exposed to the agent sandbox. | `/agent/v1/users` |
| **AppUser** | Per-user application records accessed through the authenticated `/app/...` surface. | `/api/app-users/{id}/sessions/simulate` |
| **AppUserLogin** | Login endpoint that issues a session token for the per-user `/app/...` surface. | `/api/app-users/login` |
| **AppUserSession** | Session resources tied to an authenticated user, used with `Authorization: Bearer {session_token}`. | `/api/app-users/me` |
| **AppUserTotal** | Aggregate count of app users for the current key/session. | `/api/projects/{projectId}/app-users/total` |
| **AppUserVerify** | Endpoint for verifying an app user's credentials or token. | `/api/app-users/verify` |
| **Authentication** | Authentication-related operations (API key and session bearer token handling). | `/api/logout` |
| **Collection** | Top-level collection resources under `/api/collections/{collection}`. | `/api/collections` |
| **CollectionRecord** | Individual records within a collection: `GET`/`POST` `/api/collections/{collection}/records`. | `/api/collections/{slug}/records` |
| **CollectionRecordList** | Listing of records inside a collection via `GET /api/collections/{collection}/records`. | `/api/collections/{slug}/records` |
| **Custom** | Custom user-defined schemas/endpoints configured for a project. | `/api/custom/{path}` |
| **Legacy** | Legacy ReqRes demo endpoints retained for backwards compatibility. | `/api/users/{id}` |
| **LegacyMutation** | Legacy POST/PUT/DELETE demo endpoints that simulate writes against demo data. | `/api/users` |
| **LegacyUnknown** | Legacy `/api/unknown/{id}` style resource representing the colour-palette demo. | `/api/unknown/{id}` |
| **LegacyUnknownList** | Legacy `/api/unknown` list endpoint returning the paginated colour-palette demo. | `/api/unknown` |
| **LegacyUser** | Legacy `/api/users/{id}` single-user demo endpoint. | `/api/users/{id}` |
| **LegacyUserList** | Legacy `/api/users?page=N` paginated user list demo endpoint. | `/api/users` |
| **Login** | Demo `/api/login` endpoint that returns a token for valid credentials. | `/api/login` |
| **Register** | Demo `/api/register` endpoint that returns a token for new account creation. | `/api/register` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from hostedrest_sdk import HostedRestSDK

client = HostedRestSDK({})


# Load a specific agenthealth
agenthealth, err = client.AgentHealth(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'hostedrest_sdk.php';

$client = new HostedRestSDK([]);


// Load a specific agenthealth
[$agenthealth, $err] = $client->AgentHealth(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/hosted-rest-sdk/go"

client := sdk.NewHostedRestSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "HostedRest_sdk"

client = HostedRestSDK.new({})


# Load a specific agenthealth
agenthealth, err = client.AgentHealth(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("hosted-rest_sdk")

local client = sdk.new({})


-- Load a specific agenthealth
local agenthealth, err = client:AgentHealth(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = HostedRestSDK.test()
const result = await client.AgentHealth().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = HostedRestSDK.test(None, None)
result, err = client.AgentHealth(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = HostedRestSDK::test(null, null);
[$result, $err] = $client->AgentHealth(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.AgentHealth(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = HostedRestSDK.test(nil, nil)
result, err = client.AgentHealth(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:AgentHealth(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the ReqRes API

- Upstream: [https://reqres.in](https://reqres.in)
- API docs: [https://reqres.in/api-docs](https://reqres.in/api-docs)

- ReqRes.in is a proprietary, commercial service operated by ReqRes (founded by Ben Howdle).
- A free tier is available; paid plans add higher request quotas and custom auth.
- This SDK package itself is distributed under the MIT license.
- Check the ReqRes terms of service for usage restrictions before relying on it in production.

---

Generated from the ReqRes API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
