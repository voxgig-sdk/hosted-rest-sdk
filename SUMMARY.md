# ReqRes API

OpenAPI specification for the ReqRes API. Covers legacy demo endpoints, collections, app-user auth flows, custom endpoints, and the Agent Sandbox (/agent/v1/*) for AI coding agents. All /api/* endpoints require x-api-key. All /app/* endpoints require Authorization: Bearer &lt;session_token&gt;. /agent/v1/* endpoints are open in v1 (IP-based rate limiting).

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 18 entities and 52 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### AgentHealth

Results: Healthy.

SDK operations: `load`.

### AgentSandbox

Results: Session created or MFA challenge; Paginated order list; Slow / partial-content / empty-response / malformed-json scenarios; Partial content; Scenario list.

SDK operations: `create`, `load`.

### AgentUser

Results: Paginated user list; User found.

SDK operations: `list`, `load`.

### AppUser

Results: Session simulated; App user created; App users list; App user; No content; App user deleted; App user updated.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### AppUserLogin

Results: Login initiated.

SDK operations: `create`.

### AppUserSession

Results: App user session; App user profile.

SDK operations: `load`.

### AppUserTotal

Results: Total count.

SDK operations: `load`.

### AppUserVerify

Results: Token verified.

SDK operations: `create`.

### Authentication

Results: Logged out.

SDK operations: `create`.

### Collection

Results: Collection created; Collections list; Collection; No content; Collection updated.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### CollectionRecord

Results: Record created; Record list; Records; Record; Record updated.

SDK operations: `create`, `list`, `load`, `update`.

### Custom

Results: Custom response.

SDK operations: `create`, `load`, `patch`, `remove`, `update`.

### Legacy

Results: User created; Successful response; No content.

SDK operations: `create`, `list`, `remove`.

### LegacyMutation

Results: User updated.

SDK operations: `patch`, `update`.

### LegacyUnknown

Results: Successful response.

SDK operations: `list`, `load`.

### LegacyUser

Results: Successful response.

SDK operations: `load`.

### Login

Results: Successful login.

SDK operations: `create`.

### Register

Results: Successful registration.

SDK operations: `create`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| AgentHealth | `load` | `GET /agent/v1/health` | See reference |
| AgentSandbox | `create` | `POST /agent/v1/auth/login` | See reference |
| AgentSandbox | `load` | `GET /agent/v1/orders` | See reference |
| AgentSandbox | `load` | `GET /agent/v1/scenarios/{scenario}` | See reference |
| AgentSandbox | `load` | `GET /agent/v1/scenarios` | See reference |
| AgentUser | `list` | `GET /agent/v1/users` | See reference |
| AgentUser | `load` | `GET /agent/v1/users/{id}` | See reference |
| AppUser | `create` | `POST /api/app-users/{id}/sessions/simulate` | Required |
| AppUser | `create` | `POST /api/app-users` | Required |
| AppUser | `list` | `GET /api/projects/{projectId}/app-users` | Required |
| AppUser | `list` | `GET /api/app-users` | Required |
| AppUser | `load` | `GET /api/app-users/{id}` | Required |
| AppUser | `remove` | `DELETE /app/collections/{slug}/records/{recordId}` | Required |
| AppUser | `remove` | `DELETE /api/app-users/{id}` | Required |
| AppUser | `update` | `PUT /api/app-users/{id}` | Required |
| AppUserLogin | `create` | `POST /api/app-users/login` | Required |
| AppUserSession | `load` | `GET /api/app-users/me` | Required |
| AppUserSession | `load` | `GET /app/me` | Required |
| AppUserTotal | `load` | `GET /api/projects/{projectId}/app-users/total` | Required |
| AppUserVerify | `create` | `POST /api/app-users/verify` | Required |
| Authentication | `create` | `POST /api/logout` | Required |
| Collection | `create` | `POST /api/collections` | Required |
| Collection | `list` | `GET /api/collections` | Required |
| Collection | `list` | `GET /app/collections` | Required |
| Collection | `load` | `GET /api/collections/{slug}` | Required |
| Collection | `load` | `GET /app/collections/{slug}` | Required |
| Collection | `remove` | `DELETE /api/collections/{slug}/records/{recordId}` | Required |
| Collection | `remove` | `DELETE /api/collections/{slug}` | Required |
| Collection | `update` | `PUT /api/collections/{slug}` | Required |
| CollectionRecord | `create` | `POST /api/collections/{slug}/records` | Required |
| CollectionRecord | `create` | `POST /app/collections/{slug}/records` | Required |
| CollectionRecord | `list` | `GET /api/collections/{slug}/records` | Required |
| CollectionRecord | `list` | `GET /app/collections/{slug}/records` | Required |
| CollectionRecord | `load` | `GET /api/collections/{slug}/records/{recordId}` | Required |
| CollectionRecord | `load` | `GET /app/collections/{slug}/records/{recordId}` | Required |
| CollectionRecord | `update` | `PUT /api/collections/{slug}/records/{recordId}` | Required |
| CollectionRecord | `update` | `PUT /app/collections/{slug}/records/{recordId}` | Required |
| Custom | `create` | `POST /api/custom/{path}` | Required |
| Custom | `load` | `GET /api/custom/{path}` | Required |
| Custom | `patch` | `PATCH /api/custom/{path}` | Required |
| Custom | `remove` | `DELETE /api/custom/{path}` | Required |
| Custom | `update` | `PUT /api/custom/{path}` | Required |
| Legacy | `create` | `POST /api/users` | Required |
| Legacy | `list` | `GET /api/users` | Required |
| Legacy | `remove` | `DELETE /api/users/{id}` | Required |
| LegacyMutation | `patch` | `PATCH /api/users/{id}` | Required |
| LegacyMutation | `update` | `PUT /api/users/{id}` | Required |
| LegacyUnknown | `list` | `GET /api/unknown` | Required |
| LegacyUnknown | `load` | `GET /api/unknown/{id}` | Required |
| LegacyUser | `load` | `GET /api/users/{id}` | Required |
| Login | `create` | `POST /api/login` | Required |
| Register | `create` | `POST /api/register` | Required |

## Connect to the API

- Production server: `https://reqres.in`
- Development server: `http://localhost:8000`

The default credential is sent in the `x-api-key` header.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `hosted-rest_list`: List records for an entity. Supported entities: `agent_user`, `app_user`, `collection`, `collection_record`, `legacy`, `legacy_unknown`.
- `hosted-rest_load`: Load one record for an entity. Supported entities: `agent_health`, `agent_sandbox`, `agent_user`, `app_user`, `app_user_session`, `app_user_total`, `collection`, `collection_record`, `custom`, `legacy_unknown`, `legacy_user`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

