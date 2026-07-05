# HostedRest Python SDK



The Python SDK for the HostedRest API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AgentHealth()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/hosted-rest-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from hostedrest_sdk import HostedRestSDK

client = HostedRestSDK({
    "apikey": os.environ.get("HOSTED_REST_APIKEY"),
})
```

### 3. Load an agenthealth

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    agenthealth = client.AgentHealth().load()
    print(agenthealth)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    agenthealth = client.AgentHealth().load()
    print(agenthealth)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = HostedRestSDK.test()

# Entity ops return the bare record and raise on error.
agenthealth = client.AgentHealth().load()
# agenthealth contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = HostedRestSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### HostedRestSDK

```python
from hostedrest_sdk import HostedRestSDK

client = HostedRestSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = HostedRestSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### HostedRestSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `agent_health = client.AgentHealth()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |

#### Example: Load

```python
agent_health = client.AgentHealth().load()
```


### AgentSandbox

Create an instance: `agent_sandbox = client.AgentSandbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` |  |
| `password` | `str` |  |

#### Example: Load

```python
agent_sandbox = client.AgentSandbox().load()
```

#### Example: Create

```python
agent_sandbox = client.AgentSandbox().create({
    "email": "example",  # str
    "password": "example",  # str
})
```


### AgentUserDetail

Create an instance: `agent_user_detail = client.AgentUserDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |

#### Example: Load

```python
agent_user_detail = client.AgentUserDetail().load({"id": "agent_user_detail_id"})
```


### AgentUserList

Create an instance: `agent_user_list = client.AgentUserList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `email` | `str` |  |
| `full_name` | `str` |  |
| `id` | `str` |  |
| `locale` | `str` |  |
| `preference` | `dict` |  |
| `profile` | `dict` |  |
| `status` | `str` |  |
| `timezone` | `str` |  |
| `updated_at` | `str` |  |

#### Example: List

```python
agent_user_lists = client.AgentUserList().list()
```


### AppUser

Create an instance: `app_user = client.AppUser()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `data` | `dict` |  |
| `email` | `str` |  |
| `id` | `str` |  |
| `last_login_at` | `str` |  |
| `metadata` | `dict` |  |
| `status` | `str` |  |

#### Example: Load

```python
app_user = client.AppUser().load({"id": "app_user_id"})
```

#### Example: List

```python
app_users = client.AppUser().list()
```

#### Example: Create

```python
app_user = client.AppUser().create({
    "data": {},  # dict
    "email": "example",  # str
})
```


### AppUserLogin

Create an instance: `app_user_login = client.AppUserLogin()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |
| `email` | `str` |  |
| `metadata` | `dict` |  |
| `project_id` | `str` |  |

#### Example: Create

```python
app_user_login = client.AppUserLogin().create({
    "data": {},  # dict
    "email": "example",  # str
})
```


### AppUserSession

Create an instance: `app_user_session = client.AppUserSession()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |

#### Example: Load

```python
app_user_session = client.AppUserSession().load()
```


### AppUserTotal

Create an instance: `app_user_total = client.AppUserTotal()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `total` | `int` |  |

#### Example: Load

```python
app_user_total = client.AppUserTotal().load()
```


### AppUserVerify

Create an instance: `app_user_verify = client.AppUserVerify()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |
| `token` | `str` |  |

#### Example: Create

```python
app_user_verify = client.AppUserVerify().create({
    "data": {},  # dict
    "token": "example",  # str
})
```


### Authentication

Create an instance: `authentication = client.Authentication()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```python
authentication = client.Authentication().create({
})
```


### Collection

Create an instance: `collection = client.Collection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `data` | `dict` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `project_id` | `str` |  |
| `schema` | `dict` |  |
| `slug` | `str` |  |
| `updated_at` | `str` |  |
| `user_id` | `str` |  |
| `visibility` | `str` |  |

#### Example: Load

```python
collection = client.Collection().load({"id": "collection_id"})
```

#### Example: List

```python
collections = client.Collection().list()
```

#### Example: Create

```python
collection = client.Collection().create({
    "data": {},  # dict
    "name": "example",  # str
})
```


### CollectionRecord

Create an instance: `collection_record = client.CollectionRecord()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |

#### Example: Load

```python
collection_record = client.CollectionRecord().load({"id": "collection_record_id"})
```

#### Example: Create

```python
collection_record = client.CollectionRecord().create({
    "data": {},  # dict
})
```


### CollectionRecordList

Create an instance: `collection_record_list = client.CollectionRecordList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_user_id` | `str` |  |
| `collection_id` | `str` |  |
| `created_at` | `str` |  |
| `created_by` | `str` |  |
| `data` | `dict` |  |
| `deleted_at` | `str` |  |
| `id` | `str` |  |
| `project_id` | `str` |  |
| `updated_at` | `str` |  |

#### Example: List

```python
collection_record_lists = client.CollectionRecordList().list()
```


### Custom

Create an instance: `custom = client.Custom()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```python
custom = client.Custom().load({"id": "custom_id"})
```

#### Example: Create

```python
custom = client.Custom().create({
})
```


### Legacy

Create an instance: `legacy = client.Legacy()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### LegacyMutation

Create an instance: `legacy_mutation = client.LegacyMutation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `id` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Create

```python
legacy_mutation = client.LegacyMutation().create({
})
```


### LegacyUnknown

Create an instance: `legacy_unknown = client.LegacyUnknown()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |
| `support` | `dict` |  |

#### Example: Load

```python
legacy_unknown = client.LegacyUnknown().load({"id": "legacy_unknown_id"})
```


### LegacyUnknownList

Create an instance: `legacy_unknown_list = client.LegacyUnknownList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `color` | `str` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `pantone_value` | `str` |  |
| `year` | `int` |  |

#### Example: List

```python
legacy_unknown_lists = client.LegacyUnknownList().list()
```


### LegacyUser

Create an instance: `legacy_user = client.LegacyUser()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |
| `support` | `dict` |  |

#### Example: Load

```python
legacy_user = client.LegacyUser().load({"id": "legacy_user_id"})
```


### LegacyUserList

Create an instance: `legacy_user_list = client.LegacyUserList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | `str` |  |
| `email` | `str` |  |
| `first_name` | `str` |  |
| `id` | `int` |  |
| `last_name` | `str` |  |

#### Example: List

```python
legacy_user_lists = client.LegacyUserList().list()
```


### Login

Create an instance: `login = client.Login()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` |  |
| `password` | `str` |  |
| `token` | `str` |  |

#### Example: Create

```python
login = client.Login().create({
    "email": "example",  # str
    "password": "example",  # str
    "token": "example",  # str
})
```


### Register

Create an instance: `register = client.Register()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` |  |
| `id` | `int` |  |
| `password` | `str` |  |
| `token` | `str` |  |

#### Example: Create

```python
register = client.Register().create({
    "email": "example",  # str
    "password": "example",  # str
    "token": "example",  # str
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── hostedrest_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`hostedrest_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
agenthealth = client.AgentHealth()
agenthealth.load()

# agenthealth.data_get() now returns the agenthealth data from the last load
# agenthealth.match_get() returns the last match criteria
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
