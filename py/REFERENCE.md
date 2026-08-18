# HostedRest Python SDK Reference

Complete API reference for the HostedRest Python SDK.


## HostedRestSDK

### Constructor

```python
from hostedrest_sdk import HostedRestSDK

client = HostedRestSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HostedRestSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = HostedRestSDK.test()
```


### Instance Methods

#### `AgentHealth(data=None)`

Create a new `AgentHealthEntity` instance. Pass `None` for no initial data.

#### `AgentSandbox(data=None)`

Create a new `AgentSandboxEntity` instance. Pass `None` for no initial data.

#### `AgentUserDetail(data=None)`

Create a new `AgentUserDetailEntity` instance. Pass `None` for no initial data.

#### `AgentUserList(data=None)`

Create a new `AgentUserListEntity` instance. Pass `None` for no initial data.

#### `AppUser(data=None)`

Create a new `AppUserEntity` instance. Pass `None` for no initial data.

#### `AppUserLogin(data=None)`

Create a new `AppUserLoginEntity` instance. Pass `None` for no initial data.

#### `AppUserSession(data=None)`

Create a new `AppUserSessionEntity` instance. Pass `None` for no initial data.

#### `AppUserTotal(data=None)`

Create a new `AppUserTotalEntity` instance. Pass `None` for no initial data.

#### `AppUserVerify(data=None)`

Create a new `AppUserVerifyEntity` instance. Pass `None` for no initial data.

#### `Authentication(data=None)`

Create a new `AuthenticationEntity` instance. Pass `None` for no initial data.

#### `Collection(data=None)`

Create a new `CollectionEntity` instance. Pass `None` for no initial data.

#### `CollectionRecord(data=None)`

Create a new `CollectionRecordEntity` instance. Pass `None` for no initial data.

#### `CollectionRecordList(data=None)`

Create a new `CollectionRecordListEntity` instance. Pass `None` for no initial data.

#### `Custom(data=None)`

Create a new `CustomEntity` instance. Pass `None` for no initial data.

#### `Legacy(data=None)`

Create a new `LegacyEntity` instance. Pass `None` for no initial data.

#### `LegacyMutation(data=None)`

Create a new `LegacyMutationEntity` instance. Pass `None` for no initial data.

#### `LegacyUnknown(data=None)`

Create a new `LegacyUnknownEntity` instance. Pass `None` for no initial data.

#### `LegacyUnknownList(data=None)`

Create a new `LegacyUnknownListEntity` instance. Pass `None` for no initial data.

#### `LegacyUser(data=None)`

Create a new `LegacyUserEntity` instance. Pass `None` for no initial data.

#### `LegacyUserList(data=None)`

Create a new `LegacyUserListEntity` instance. Pass `None` for no initial data.

#### `Login(data=None)`

Create a new `LoginEntity` instance. Pass `None` for no initial data.

#### `Register(data=None)`

Create a new `RegisterEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AgentHealthEntity

```python
agent_health = client.AgentHealth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecations` | `list` | Yes |  |
| `rate_limit_status` | `dict` | Yes |  |
| `status` | `str` | Yes |  |
| `uptime_seconds` | `int` | Yes |  |
| `version` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AgentHealth().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentHealthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentSandboxEntity

```python
agent_sandbox = client.AgentSandbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes |  |
| `password` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AgentSandbox().create({
    "email": "example_email",  # str
    "password": "example_password",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AgentSandbox().load({"scenario": "scenario"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSandboxEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentUserDetailEntity

```python
agent_user_detail = client.AgentUserDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes |  |
| `email` | `str` | Yes |  |
| `full_name` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `locale` | `str` | Yes |  |
| `preferences` | `dict` | Yes |  |
| `profile` | `dict` | Yes |  |
| `status` | `str` | Yes |  |
| `timezone` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AgentUserDetail().load({"id": "agent_user_detail_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentUserDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentUserListEntity

```python
agent_user_list = client.AgentUserList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes |  |
| `email` | `str` | Yes |  |
| `full_name` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `locale` | `str` | Yes |  |
| `preferences` | `dict` | Yes |  |
| `profile` | `dict` | Yes |  |
| `status` | `str` | Yes |  |
| `timezone` | `str` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AgentUserList().list()
for agent_user_list in results:
    print(agent_user_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentUserListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppUserEntity

```python
app_user = client.AppUser()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `email` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `last_login_at` | `str` | No |  |
| `metadata` | `dict` | No |  |
| `status` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AppUser().create({
    "email": "example_email",  # str
    "id": "example_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AppUser().list()
for app_user in results:
    print(app_user)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AppUser().load({"id": "app_user_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.AppUser().remove({"id": "app_user_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.AppUser().update({
    "id": "app_user_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppUserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppUserLoginEntity

```python
app_user_login = client.AppUserLogin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes |  |
| `metadata` | `dict` | No |  |
| `project_id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AppUserLogin().create({
    "email": "example_email",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppUserLoginEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppUserSessionEntity

```python
app_user_session = client.AppUserSession()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AppUserSession().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppUserSessionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppUserTotalEntity

```python
app_user_total = client.AppUserTotal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `total` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AppUserTotal().load({"project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppUserTotalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppUserVerifyEntity

```python
app_user_verify = client.AppUserVerify()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AppUserVerify().create({
    "token": "example_token",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppUserVerifyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AuthenticationEntity

```python
authentication = client.Authentication()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Authentication().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AuthenticationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CollectionEntity

```python
collection = client.Collection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `project_id` | `str` | No |  |
| `schema` | `dict` | No |  |
| `slug` | `str` | Yes |  |
| `updated_at` | `str` | No |  |
| `user_id` | `str` | No |  |
| `visibility` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Collection().create({
    "id": "example_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Collection().list()
for collection in results:
    print(collection)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Collection().load({"id": "collection_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Collection().remove({"id": "collection_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Collection().update({
    "id": "collection_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CollectionRecordEntity

```python
collection_record = client.CollectionRecord()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_user_id` | `str` | No |  |
| `collection_id` | `str` | No |  |
| `created_at` | `str` | No |  |
| `created_by` | `str` | No |  |
| `data` | `dict` | Yes |  |
| `deleted_at` | `str` | No |  |
| `id` | `str` | Yes |  |
| `project_id` | `str` | No |  |
| `updated_at` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CollectionRecord().create({
    "slug": "example_slug",  # str
    "data": {},  # dict
    "id": "example_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CollectionRecord().load({"id": "collection_record_id", "collection_id": "collection_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.CollectionRecord().update({
    "id": "collection_record_id",
    "collection_id": "collection_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollectionRecordEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CollectionRecordListEntity

```python
collection_record_list = client.CollectionRecordList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_user_id` | `str` | No |  |
| `collection_id` | `str` | No |  |
| `created_at` | `str` | No |  |
| `created_by` | `str` | No |  |
| `data` | `dict` | Yes |  |
| `deleted_at` | `str` | No |  |
| `id` | `str` | Yes |  |
| `project_id` | `str` | No |  |
| `updated_at` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.CollectionRecordList().list({"slug": "example"})
for collection_record_list in results:
    print(collection_record_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollectionRecordListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CustomEntity

```python
custom = client.Custom()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Custom().create({
    "id": "example_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Custom().load({"id": "custom_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Custom().remove({"id": "custom_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Custom().update({
    "id": "custom_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CustomEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LegacyEntity

```python
legacy = client.Legacy()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Legacy().remove({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LegacyMutationEntity

```python
legacy_mutation = client.LegacyMutation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | No |  |
| `id` | `str` | No |  |
| `updatedAt` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.LegacyMutation().create({
})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.LegacyMutation().update({
    "id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyMutationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LegacyUnknownEntity

```python
legacy_unknown = client.LegacyUnknown()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `dict` | Yes |  |
| `support` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.LegacyUnknown().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyUnknownEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LegacyUnknownListEntity

```python
legacy_unknown_list = client.LegacyUnknownList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `str` | Yes |  |
| `id` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `pantone_value` | `str` | Yes |  |
| `year` | `int` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.LegacyUnknownList().list()
for legacy_unknown_list in results:
    print(legacy_unknown_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyUnknownListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LegacyUserEntity

```python
legacy_user = client.LegacyUser()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `dict` | Yes |  |
| `support` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.LegacyUser().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyUserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LegacyUserListEntity

```python
legacy_user_list = client.LegacyUserList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `str` | Yes |  |
| `email` | `str` | Yes |  |
| `first_name` | `str` | Yes |  |
| `id` | `int` | Yes |  |
| `last_name` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.LegacyUserList().list()
for legacy_user_list in results:
    print(legacy_user_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegacyUserListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LoginEntity

```python
login = client.Login()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes |  |
| `password` | `str` | Yes |  |
| `token` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Login().create({
    "email": "example_email",  # str
    "password": "example_password",  # str
    "token": "example_token",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LoginEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegisterEntity

```python
register = client.Register()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes |  |
| `id` | `int` | No |  |
| `password` | `str` | Yes |  |
| `token` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Register().create({
    "email": "example_email",  # str
    "password": "example_password",  # str
    "token": "example_token",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegisterEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = HostedRestSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

