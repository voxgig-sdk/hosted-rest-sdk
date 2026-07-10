# HostedRest TypeScript SDK Reference

Complete API reference for the HostedRest TypeScript SDK.


## HostedRestSDK

### Constructor

```ts
new HostedRestSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HostedRestSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = HostedRestSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `HostedRestSDK` instance in test mode.


### Instance Methods

#### `AgentHealth(data?: object)`

Create a new `AgentHealth` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentHealthEntity` instance.

#### `AgentSandbox(data?: object)`

Create a new `AgentSandbox` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentSandboxEntity` instance.

#### `AgentUserDetail(data?: object)`

Create a new `AgentUserDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentUserDetailEntity` instance.

#### `AgentUserList(data?: object)`

Create a new `AgentUserList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentUserListEntity` instance.

#### `AppUser(data?: object)`

Create a new `AppUser` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppUserEntity` instance.

#### `AppUserLogin(data?: object)`

Create a new `AppUserLogin` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppUserLoginEntity` instance.

#### `AppUserSession(data?: object)`

Create a new `AppUserSession` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppUserSessionEntity` instance.

#### `AppUserTotal(data?: object)`

Create a new `AppUserTotal` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppUserTotalEntity` instance.

#### `AppUserVerify(data?: object)`

Create a new `AppUserVerify` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppUserVerifyEntity` instance.

#### `Authentication(data?: object)`

Create a new `Authentication` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AuthenticationEntity` instance.

#### `Collection(data?: object)`

Create a new `Collection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CollectionEntity` instance.

#### `CollectionRecord(data?: object)`

Create a new `CollectionRecord` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CollectionRecordEntity` instance.

#### `CollectionRecordList(data?: object)`

Create a new `CollectionRecordList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CollectionRecordListEntity` instance.

#### `Custom(data?: object)`

Create a new `Custom` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CustomEntity` instance.

#### `Legacy(data?: object)`

Create a new `Legacy` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LegacyEntity` instance.

#### `LegacyMutation(data?: object)`

Create a new `LegacyMutation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LegacyMutationEntity` instance.

#### `LegacyUnknown(data?: object)`

Create a new `LegacyUnknown` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LegacyUnknownEntity` instance.

#### `LegacyUnknownList(data?: object)`

Create a new `LegacyUnknownList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LegacyUnknownListEntity` instance.

#### `LegacyUser(data?: object)`

Create a new `LegacyUser` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LegacyUserEntity` instance.

#### `LegacyUserList(data?: object)`

Create a new `LegacyUserList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LegacyUserListEntity` instance.

#### `Login(data?: object)`

Create a new `Login` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LoginEntity` instance.

#### `Register(data?: object)`

Create a new `Register` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegisterEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `HostedRestSDK.test()`.

**Returns:** `HostedRestSDK` instance in test mode.


---

## AgentHealthEntity

```ts
const agent_health = client.AgentHealth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AgentHealth().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentHealthEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentSandboxEntity

```ts
const agent_sandbox = client.AgentSandbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `password` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AgentSandbox().create({
  email: 'example_email',
  password: 'example_password',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AgentSandbox().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentSandboxEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentUserDetailEntity

```ts
const agent_user_detail = client.AgentUserDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AgentUserDetail().load({ id: 'agent_user_detail_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentUserDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentUserListEntity

```ts
const agent_user_list = client.AgentUserList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `full_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `locale` | `string` | Yes |  |
| `preference` | `Record<string, any>` | Yes |  |
| `profile` | `Record<string, any>` | Yes |  |
| `status` | `string` | Yes |  |
| `timezone` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AgentUserList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentUserListEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppUserEntity

```ts
const app_user = client.AppUser()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `data` | `Record<string, any>` | Yes |  |
| `email` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_login_at` | `string` | No |  |
| `metadata` | `Record<string, any>` | No |  |
| `status` | `string` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AppUser().create({
  data: {},
  email: 'example_email',
  id: 'example_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AppUser().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AppUser().load({ id: 'app_user_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.AppUser().remove({ id: 'app_user_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.AppUser().update({
  id: 'app_user_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppUserEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppUserLoginEntity

```ts
const app_user_login = client.AppUserLogin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |
| `email` | `string` | Yes |  |
| `metadata` | `Record<string, any>` | No |  |
| `project_id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AppUserLogin().create({
  data: {},
  email: 'example_email',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppUserLoginEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppUserSessionEntity

```ts
const app_user_session = client.AppUserSession()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AppUserSession().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppUserSessionEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppUserTotalEntity

```ts
const app_user_total = client.AppUserTotal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `total` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AppUserTotal().load({ project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppUserTotalEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppUserVerifyEntity

```ts
const app_user_verify = client.AppUserVerify()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AppUserVerify().create({
  data: {},
  token: 'example_token',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppUserVerifyEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AuthenticationEntity

```ts
const authentication = client.Authentication()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Authentication().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CollectionEntity

```ts
const collection = client.Collection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `data` | `Record<string, any>` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `project_id` | `string` | No |  |
| `schema` | `Record<string, any>` | No |  |
| `slug` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `user_id` | `string` | No |  |
| `visibility` | `string` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Collection().create({
  data: {},
  id: 'example_id',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Collection().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Collection().load({ id: 'collection_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Collection().remove({ id: 'collection_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Collection().update({
  id: 'collection_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CollectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CollectionRecordEntity

```ts
const collection_record = client.CollectionRecord()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CollectionRecord().create({
  slug: 'example_slug',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CollectionRecord().load({ id: 'collection_record_id', collection_id: 'collection_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.CollectionRecord().update({
  id: 'collection_record_id',
  collection_id: 'collection_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CollectionRecordEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CollectionRecordListEntity

```ts
const collection_record_list = client.CollectionRecordList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_user_id` | `string` | No |  |
| `collection_id` | `string` | No |  |
| `created_at` | `string` | No |  |
| `created_by` | `string` | No |  |
| `data` | `Record<string, any>` | Yes |  |
| `deleted_at` | `string` | No |  |
| `id` | `string` | Yes |  |
| `project_id` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CollectionRecordList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CollectionRecordListEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CustomEntity

```ts
const custom = client.Custom()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Custom().create({
  id: 'example_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Custom().load({ id: 'custom_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Custom().remove({ id: 'custom_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Custom().update({
  id: 'custom_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CustomEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LegacyEntity

```ts
const legacy = client.Legacy()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Legacy().remove({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LegacyEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LegacyMutationEntity

```ts
const legacy_mutation = client.LegacyMutation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `id` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.LegacyMutation().create({
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.LegacyMutation().update({
  id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LegacyMutationEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LegacyUnknownEntity

```ts
const legacy_unknown = client.LegacyUnknown()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |
| `support` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.LegacyUnknown().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LegacyUnknownEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LegacyUnknownListEntity

```ts
const legacy_unknown_list = client.LegacyUnknownList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `pantone_value` | `string` | Yes |  |
| `year` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.LegacyUnknownList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LegacyUnknownListEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LegacyUserEntity

```ts
const legacy_user = client.LegacyUser()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |
| `support` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.LegacyUser().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LegacyUserEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LegacyUserListEntity

```ts
const legacy_user_list = client.LegacyUserList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `first_name` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `last_name` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.LegacyUserList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LegacyUserListEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LoginEntity

```ts
const login = client.Login()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Login().create({
  email: 'example_email',
  password: 'example_password',
  token: 'example_token',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LoginEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegisterEntity

```ts
const register = client.Register()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `id` | `number` | No |  |
| `password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Register().create({
  email: 'example_email',
  password: 'example_password',
  token: 'example_token',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegisterEntity` instance with the same client and
options.

#### `client()`

Return the parent `HostedRestSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new HostedRestSDK({
  feature: {
    test: { active: true },
  }
})
```

