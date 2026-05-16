# HostedRest Python SDK Reference

Complete API reference for the HostedRest Python SDK.


## HostedRestSDK

### Constructor

```python
from hosted-rest_sdk import HostedRestSDK

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

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## AgentHealthEntity

```python
agent_health = client.AgentHealth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.AgentHealth().load({"id": "agent_health_id"})
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
| `email` | ``$STRING`` | Yes |  |
| `password` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.AgentSandbox().create({
    "email": # `$STRING`,
    "password": # `$STRING`,
})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.AgentSandbox().load({"id": "agent_sandbox_id"})
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
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.AgentUserDetail().load({"id": "agent_user_detail_id"})
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
| `created_at` | ``$STRING`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `full_name` | ``$STRING`` | Yes |  |
| `id` | ``$STRING`` | Yes |  |
| `locale` | ``$STRING`` | Yes |  |
| `preference` | ``$OBJECT`` | Yes |  |
| `profile` | ``$OBJECT`` | Yes |  |
| `status` | ``$STRING`` | Yes |  |
| `timezone` | ``$STRING`` | Yes |  |
| `updated_at` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.AgentUserList().list({})
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
| `created_at` | ``$STRING`` | No |  |
| `data` | ``$OBJECT`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `id` | ``$STRING`` | Yes |  |
| `last_login_at` | ``$STRING`` | No |  |
| `metadata` | ``$OBJECT`` | No |  |
| `status` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `data` | - | - | - | - | - |
| `email` | - | - | - | Yes | - |
| `id` | - | - | - | - | - |
| `last_login_at` | - | - | - | - | - |
| `metadata` | - | - | - | - | - |
| `status` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.AppUser().create({
    "data": # `$OBJECT`,
    "email": # `$STRING`,
})
```

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.AppUser().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.AppUser().load({"id": "app_user_id"})
```

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.AppUser().remove({"id": "app_user_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.AppUser().update({
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
| `data` | ``$OBJECT`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `metadata` | ``$OBJECT`` | No |  |
| `project_id` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.AppUserLogin().create({
    "data": # `$OBJECT`,
    "email": # `$STRING`,
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.AppUserSession().load({"id": "app_user_session_id"})
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
| `total` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.AppUserTotal().load({"id": "app_user_total_id"})
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
| `data` | ``$OBJECT`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.AppUserVerify().create({
    "data": # `$OBJECT`,
    "token": # `$STRING`,
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

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Authentication().create({
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
| `created_at` | ``$STRING`` | No |  |
| `data` | ``$OBJECT`` | Yes |  |
| `id` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `project_id` | ``$STRING`` | No |  |
| `schema` | ``$OBJECT`` | No |  |
| `slug` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `user_id` | ``$STRING`` | No |  |
| `visibility` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `data` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `project_id` | - | - | - | - | - |
| `schema` | - | - | - | - | - |
| `slug` | - | Yes | - | - | - |
| `updated_at` | - | - | - | - | - |
| `user_id` | - | - | - | - | - |
| `visibility` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Collection().create({
    "data": # `$OBJECT`,
    "name": # `$STRING`,
})
```

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Collection().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Collection().load({"id": "collection_id"})
```

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.Collection().remove({"id": "collection_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.Collection().update({
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
| `data` | ``$OBJECT`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.CollectionRecord().create({
    "data": # `$OBJECT`,
})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.CollectionRecord().load({"id": "collection_record_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.CollectionRecord().update({
    "id": "collection_record_id",
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
| `app_user_id` | ``$STRING`` | No |  |
| `collection_id` | ``$STRING`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `created_by` | ``$STRING`` | No |  |
| `data` | ``$OBJECT`` | Yes |  |
| `deleted_at` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | Yes |  |
| `project_id` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.CollectionRecordList().list({})
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

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Custom().create({
})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Custom().load({"id": "custom_id"})
```

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.Custom().remove({"id": "custom_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.Custom().update({
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

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.Legacy().remove({"id": "legacy_id"})
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
| `created_at` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.LegacyMutation().create({
})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.LegacyMutation().update({
    "id": "legacy_mutation_id",
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
| `data` | ``$OBJECT`` | Yes |  |
| `support` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.LegacyUnknown().load({"id": "legacy_unknown_id"})
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
| `color` | ``$STRING`` | Yes |  |
| `id` | ``$INTEGER`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `pantone_value` | ``$STRING`` | Yes |  |
| `year` | ``$INTEGER`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.LegacyUnknownList().list({})
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
| `data` | ``$OBJECT`` | Yes |  |
| `support` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.LegacyUser().load({"id": "legacy_user_id"})
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
| `avatar` | ``$STRING`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `first_name` | ``$STRING`` | Yes |  |
| `id` | ``$INTEGER`` | Yes |  |
| `last_name` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.LegacyUserList().list({})
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
| `email` | ``$STRING`` | Yes |  |
| `password` | ``$STRING`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Login().create({
    "email": # `$STRING`,
    "password": # `$STRING`,
    "token": # `$STRING`,
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
| `email` | ``$STRING`` | Yes |  |
| `id` | ``$INTEGER`` | No |  |
| `password` | ``$STRING`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Register().create({
    "email": # `$STRING`,
    "password": # `$STRING`,
    "token": # `$STRING`,
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

