

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


describe('CollectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.Collection()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'collection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"created_at","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"id","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"project_id","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"schema","req":false,"type":"`$OBJECT`","index$":4},{"active":true,"name":"slug","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"req":true,"type":"`$STRING`","index$":5},{"active":true,"format":"date-time","name":"updated_at","req":false,"type":"`$STRING`","index$":6},{"active":true,"name":"user_id","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"visibility","req":false,"type":"`$STRING`","index$":8}],"id":{"field":"id","name":"id"},"name":"collection","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"x_reqres_env","orig":"x_reqres_env","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"POST /api/collections","json":"{\"operationId\":\"createCollection\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"name\":{\"type\":\"string\"},\"project_id\":{\"oneOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"schema\":{\"additionalProperties\":true,\"type\":\"object\"},\"slug\":{\"type\":\"string\"},\"visibility\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"schema\":{\"additionalProperties\":true,\"type\":\"object\"},\"slug\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"user_id\":{\"type\":\"string\"},\"visibility\":{\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"slug\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Collection created\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/collections","segments":[{"lit":"api"},{"lit":"collections"}],"select":{"exist":["x_reqres_env"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"x_reqres_env","orig":"x_reqres_env","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"GET /api/collections","json":"{\"operationId\":\"listCollections\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"additionalProperties\":true,\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"schema\":{\"additionalProperties\":true,\"type\":\"object\"},\"slug\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"user_id\":{\"type\":\"string\"},\"visibility\":{\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"slug\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Collections list\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/collections","segments":[{"lit":"api"},{"lit":"collections"}],"select":{"exist":["x_reqres_env"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /app/collections","json":"{\"operationId\":\"listCollectionsAppUser\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"additionalProperties\":true,\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"schema\":{\"additionalProperties\":true,\"type\":\"object\"},\"slug\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"user_id\":{\"type\":\"string\"},\"visibility\":{\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"slug\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Collections list\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/app/collections","segments":[{"lit":"app"},{"lit":"collections"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"x_reqres_env","orig":"x_reqres_env","reqd":false,"type":"`$STRING`"}],"params":[{"active":true,"kind":"param","name":"id","orig":"slug","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/collections/{slug}","json":"{\"operationId\":\"getCollection\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"schema\":{\"additionalProperties\":true,\"type\":\"object\"},\"slug\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"user_id\":{\"type\":\"string\"},\"visibility\":{\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"slug\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Collection\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/collections/{slug}","rename":{"param":{"slug":"id"}},"segments":[{"lit":"api"},{"lit":"collections"},{"var":"id"}],"select":{"exist":["id","x_reqres_env"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"slug","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /app/collections/{slug}","json":"{\"operationId\":\"getCollectionAppUser\",\"parameters\":[{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"schema\":{\"additionalProperties\":true,\"type\":\"object\"},\"slug\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"user_id\":{\"type\":\"string\"},\"visibility\":{\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"slug\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Collection\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/app/collections/{slug}","rename":{"param":{"slug":"id"}},"segments":[{"lit":"app"},{"lit":"collections"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"x_reqres_env","orig":"x_reqres_env","reqd":false,"type":"`$STRING`"}],"params":[{"active":true,"kind":"param","name":"collection_id","orig":"slug","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"record_id","orig":"record_id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"DELETE /api/collections/{slug}/records/{recordId}","json":"{\"operationId\":\"deleteCollectionRecord\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Record id.\",\"in\":\"path\",\"name\":\"recordId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"No content\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/api/collections/{slug}/records/{recordId}","rename":{"param":{"recordId":"record_id","slug":"collection_id"}},"segments":[{"lit":"api"},{"lit":"collections"},{"var":"collection_id"},{"lit":"records"},{"var":"record_id"}],"select":{"exist":["collection_id","record_id","x_reqres_env"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"x_reqres_env","orig":"x_reqres_env","reqd":false,"type":"`$STRING`"}],"params":[{"active":true,"kind":"param","name":"id","orig":"slug","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /api/collections/{slug}","json":"{\"operationId\":\"deleteCollection\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"No content\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/api/collections/{slug}","rename":{"param":{"slug":"id"}},"segments":[{"lit":"api"},{"lit":"collections"},{"var":"id"}],"select":{"exist":["id","x_reqres_env"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"x_reqres_env","orig":"x_reqres_env","reqd":false,"type":"`$STRING`"}],"params":[{"active":true,"kind":"param","name":"id","orig":"slug","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /api/collections/{slug}","json":"{\"operationId\":\"updateCollection\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"name\":{\"type\":\"string\"},\"schema\":{\"additionalProperties\":true,\"type\":\"object\"},\"slug\":{\"type\":\"string\"},\"visibility\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"schema\":{\"additionalProperties\":true,\"type\":\"object\"},\"slug\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"user_id\":{\"type\":\"string\"},\"visibility\":{\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"slug\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Collection updated\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/api/collections/{slug}","rename":{"param":{"slug":"id"}},"segments":[{"lit":"api"},{"lit":"collections"},{"var":"id"}],"select":{"exist":["id","x_reqres_env"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["collection","record"]]},"key$":"collection","name__orig":"collection","Name":"Collection","name_":"collection","name-":"collection","NAME":"COLLECTION","index$":10}, {"active":true,"entity":"collection","key$":"BasicCollectionFlow","kind":"basic","name":"BasicCollectionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"collection_ref01"},"match":{"collection_id":"collection01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"collection_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"collection_ref01","srcdatavar":"collection_ref01_data","suffix":"_up0","textfield":"created_at"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-collection_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"collection_ref01","srcdatavar":"collection_ref01_data","suffix":"_dt0"},"match":{"id":"collection01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-collection_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"collection_ref01","suffix":"_rm0"},"match":{"id":"collection01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"collection_ref01"}}],"index$":5}]}, 'Collection')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const collection_ref01_ent = client.Collection()
    let collection_ref01_data = setup.data.new.collection['collection_ref01']
    collection_ref01_data['collection_id'] = setup.idmap['collection01']

    collection_ref01_data = (await collection_ref01_ent.create(collection_ref01_data)).data()
    assert(null != collection_ref01_data.id)


    // LIST
    const collection_ref01_match: any = {}

    const collection_ref01_list = (await collection_ref01_ent.list(collection_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(collection_ref01_list, { id: collection_ref01_data.id })))


    // UPDATE
    const collection_ref01_data_up0: any = {}
    collection_ref01_data_up0.id = collection_ref01_data.id

    const collection_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-collection_ref01_' + setup.now }
    ;(collection_ref01_data_up0 as any)[collection_ref01_markdef_up0.name] = collection_ref01_markdef_up0.value

    const collection_ref01_resdata_up0 = (await collection_ref01_ent.update(collection_ref01_data_up0)).data()
    assert(collection_ref01_resdata_up0.id === collection_ref01_data_up0.id)

    assert((collection_ref01_resdata_up0 as any)[collection_ref01_markdef_up0.name] === collection_ref01_markdef_up0.value)


    // LOAD
    const collection_ref01_match_dt0: any = {}
    collection_ref01_match_dt0.id = collection_ref01_data.id
    const collection_ref01_data_dt0 = (await collection_ref01_ent.load(collection_ref01_match_dt0)).data()
    assert(collection_ref01_data_dt0.id === collection_ref01_data.id)


    // REMOVE
    const collection_ref01_match_rm0: any = { id: collection_ref01_data.id }
    await collection_ref01_ent.remove(collection_ref01_match_rm0)
  

    // LIST
    const collection_ref01_match_rt0: any = {}

    const collection_ref01_list_rt0 = (await collection_ref01_ent.list(collection_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(collection_ref01_list_rt0, { id: collection_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/collection/CollectionTestData.json')

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
    ['collection01','collection02','collection03','collection01','collection02','collection03','record01','record02','record03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_COLLECTION_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_COLLECTION_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_COLLECTION_ENTID']
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
  
