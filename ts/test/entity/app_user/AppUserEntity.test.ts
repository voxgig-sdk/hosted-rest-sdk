

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HostedRestSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('AppUserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.AppUser()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"created_at","req":false,"type":"`$STRING`","index$":0},{"active":true,"format":"email","name":"email","op":{"update":{"req":false,"type":"`$STRING`"}},"req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"id","req":true,"type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"last_login_at","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"metadata","req":false,"type":"`$OBJECT`","index$":4},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"app_user","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"POST /api/app-users/{id}/sessions/simulate","json":"{\"operationId\":\"simulateAppUserSession\",\"parameters\":[{\"description\":\"App user id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"type\":\"object\"}}},\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"type\":\"object\"}}},\"description\":\"Session simulated\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/app-users/{id}/sessions/simulate","segments":[{"lit":"api"},{"lit":"app-users"},{"var":"id"},{"lit":"sessions"},{"lit":"simulate"}],"select":{"$action":"session_simulate","exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /api/app-users","json":"{\"operationId\":\"createAppUser\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"email\":{\"format\":\"email\",\"type\":\"string\"},\"metadata\":{\"additionalProperties\":true,\"type\":\"object\"}},\"required\":[\"email\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"last_login_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"metadata\":{\"additionalProperties\":true,\"type\":\"object\"},\"status\":{\"type\":\"string\"}},\"required\":[\"id\",\"email\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"App user created\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/app-users","segments":[{"lit":"api"},{"lit":"app-users"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"x_reqres_env","orig":"x_reqres_env","reqd":false,"type":"`$STRING`"}],"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/projects/{projectId}/app-users","json":"{\"operationId\":\"listProjectAppUsers\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Project id.\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by status (active, pending) or use \\\"all\\\".\",\"in\":\"query\",\"name\":\"statuses\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"additionalProperties\":true,\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"last_login_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"metadata\":{\"additionalProperties\":true,\"type\":\"object\"},\"status\":{\"type\":\"string\"}},\"required\":[\"id\",\"email\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"App users list\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/projects/{projectId}/app-users","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"api"},{"lit":"projects"},{"var":"project_id"},{"lit":"app-users"}],"select":{"exist":["project_id","status","x_reqres_env"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"x_reqres_env","orig":"x_reqres_env","reqd":false,"type":"`$STRING`"}],"query":[{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /api/app-users","json":"{\"operationId\":\"listAppUsers\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Max results (default 50).\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"maximum\":200,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"additionalProperties\":true,\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"last_login_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"metadata\":{\"additionalProperties\":true,\"type\":\"object\"},\"status\":{\"type\":\"string\"}},\"required\":[\"id\",\"email\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"App users list\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/app-users","segments":[{"lit":"api"},{"lit":"app-users"}],"select":{"exist":["limit","x_reqres_env"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/app-users/{id}","json":"{\"operationId\":\"getAppUser\",\"parameters\":[{\"description\":\"App user id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"last_login_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"metadata\":{\"additionalProperties\":true,\"type\":\"object\"},\"status\":{\"type\":\"string\"}},\"required\":[\"id\",\"email\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"App user\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/app-users/{id}","segments":[{"lit":"api"},{"lit":"app-users"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"collection_id","orig":"slug","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"record_id","orig":"record_id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"DELETE /app/collections/{slug}/records/{recordId}","json":"{\"operationId\":\"deleteRecordAppUser\",\"parameters\":[{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Record id.\",\"in\":\"path\",\"name\":\"recordId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"No content\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/app/collections/{slug}/records/{recordId}","rename":{"param":{"recordId":"record_id","slug":"collection_id"}},"segments":[{"lit":"app"},{"lit":"collections"},{"var":"collection_id"},{"lit":"records"},{"var":"record_id"}],"select":{"exist":["collection_id","record_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /api/app-users/{id}","json":"{\"operationId\":\"deleteAppUser\",\"parameters\":[{\"description\":\"App user id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"type\":\"object\"}}},\"description\":\"App user deleted\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/api/app-users/{id}","segments":[{"lit":"api"},{"lit":"app-users"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /api/app-users/{id}","json":"{\"operationId\":\"updateAppUser\",\"parameters\":[{\"description\":\"App user id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"email\":{\"format\":\"email\",\"type\":\"string\"},\"metadata\":{\"additionalProperties\":true,\"type\":\"object\"},\"status\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"last_login_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"metadata\":{\"additionalProperties\":true,\"type\":\"object\"},\"status\":{\"type\":\"string\"}},\"required\":[\"id\",\"email\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"App user updated\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/api/app-users/{id}","segments":[{"lit":"api"},{"lit":"app-users"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["project"],["collection","record"]]},"key$":"app_user","name__orig":"app_user","Name":"AppUser","name_":"app_user","name-":"app-user","NAME":"APP_USER","index$":4}, {"active":true,"entity":"app_user","key$":"BasicAppUserFlow","kind":"basic","name":"BasicAppUserFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"app_user_ref01"},"match":{"collection_id":"collection01","project_id":"project01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"app_user_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"app_user_ref01","srcdatavar":"app_user_ref01_data","suffix":"_up0","textfield":"created_at"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_user_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"app_user_ref01","srcdatavar":"app_user_ref01_data","suffix":"_dt0"},"match":{"id":"app_user01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_user_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"app_user_ref01","suffix":"_rm0"},"match":{"id":"app_user01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"app_user_ref01"}}],"index$":5}]}, 'AppUser')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_user_ref01_ent = client.AppUser()
    let app_user_ref01_data = setup.data.new.app_user['app_user_ref01']
    app_user_ref01_data['collection_id'] = setup.idmap['collection01']
    app_user_ref01_data['project_id'] = setup.idmap['project01']

    app_user_ref01_data = (await app_user_ref01_ent.create(app_user_ref01_data)).data()
    assert(null != app_user_ref01_data.id)


    // LIST
    const app_user_ref01_match: any = {}

    const app_user_ref01_list = (await app_user_ref01_ent.list(app_user_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(app_user_ref01_list, { id: app_user_ref01_data.id })))


    // UPDATE
    const app_user_ref01_data_up0: any = {}
    app_user_ref01_data_up0.id = app_user_ref01_data.id

    const app_user_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-app_user_ref01_' + setup.now }
    ;(app_user_ref01_data_up0 as any)[app_user_ref01_markdef_up0.name] = app_user_ref01_markdef_up0.value

    const app_user_ref01_resdata_up0 = (await app_user_ref01_ent.update(app_user_ref01_data_up0)).data()
    assert(app_user_ref01_resdata_up0.id === app_user_ref01_data_up0.id)

    assert((app_user_ref01_resdata_up0 as any)[app_user_ref01_markdef_up0.name] === app_user_ref01_markdef_up0.value)


    // LOAD
    const app_user_ref01_match_dt0: any = {}
    app_user_ref01_match_dt0.id = app_user_ref01_data.id
    const app_user_ref01_data_dt0 = (await app_user_ref01_ent.load(app_user_ref01_match_dt0)).data()
    assert(app_user_ref01_data_dt0.id === app_user_ref01_data.id)


    // REMOVE
    const app_user_ref01_match_rm0: any = { id: app_user_ref01_data.id }
    await app_user_ref01_ent.remove(app_user_ref01_match_rm0)
  

    // LIST
    const app_user_ref01_match_rt0: any = {}

    const app_user_ref01_list_rt0 = (await app_user_ref01_ent.list(app_user_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(app_user_ref01_list_rt0, { id: app_user_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/app_user/AppUserTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HostedRestSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['app_user01','app_user02','app_user03','project01','project02','project03','collection01','collection02','collection03','record01','record02','record03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_APP_USER_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_APP_USER_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_APP_USER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HostedRestSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.HOSTED_REST_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.HOSTED_REST_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
