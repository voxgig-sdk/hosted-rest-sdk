

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


describe('CollectionRecordListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.CollectionRecordList()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'collection_record_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"app_user_id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"collection_id","req":false,"type":"`$STRING`","index$":1},{"active":true,"format":"date-time","name":"created_at","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"created_by","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"data","req":true,"type":"`$OBJECT`","index$":4},{"active":true,"format":"date-time","name":"deleted_at","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"id","req":true,"type":"`$STRING`","index$":6},{"active":true,"name":"project_id","req":false,"type":"`$STRING`","index$":7},{"active":true,"format":"date-time","name":"updated_at","req":false,"type":"`$STRING`","index$":8}],"id":{"field":"id","name":"id"},"name":"collection_record_list","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"x_reqres_env","orig":"x_reqres_env","reqd":false,"type":"`$STRING`"}],"params":[{"active":true,"kind":"param","name":"slug","orig":"slug","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"created_after","orig":"created_after","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"created_before","orig":"created_before","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"data_contain","orig":"data_contain","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"include_deleted","orig":"include_deleted","reqd":false,"type":"`$BOOLEAN`","index$":3},{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":4},{"active":true,"kind":"query","name":"order","orig":"order","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":6},{"active":true,"kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":7}]},"contract":{"id":"GET /api/collections/{slug}/records","json":"{\"operationId\":\"listCollectionRecords\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Page number.\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Page size (max 100).\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Case-insensitive search on record data.\",\"in\":\"query\",\"name\":\"search\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter records created before timestamp.\",\"in\":\"query\",\"name\":\"created_before\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Filter records created after timestamp.\",\"in\":\"query\",\"name\":\"created_after\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"JSON string for containment filter.\",\"in\":\"query\",\"name\":\"data_contains\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Sort order by created_at.\",\"in\":\"query\",\"name\":\"order\",\"required\":false,\"schema\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"}},{\"description\":\"Include soft-deleted records.\",\"in\":\"query\",\"name\":\"include_deleted\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"additionalProperties\":true,\"properties\":{\"app_user_id\":{\"type\":\"string\"},\"collection_id\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"created_by\":{\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"type\":\"object\"},\"deleted_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"id\",\"data\"],\"type\":\"object\"},\"type\":\"array\"},\"meta\":{\"additionalProperties\":true,\"properties\":{\"limit\":{\"type\":\"integer\"},\"page\":{\"type\":\"integer\"},\"pages\":{\"type\":\"integer\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Record list\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/collections/{slug}/records","segments":[{"lit":"api"},{"lit":"collections"},{"var":"slug"},{"lit":"records"}],"select":{"exist":["created_after","created_before","data_contain","include_deleted","limit","order","page","search","slug","x_reqres_env"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"slug","orig":"slug","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /app/collections/{slug}/records","json":"{\"operationId\":\"listRecordsAppUser\",\"parameters\":[{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"additionalProperties\":true,\"properties\":{\"app_user_id\":{\"type\":\"string\"},\"collection_id\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"created_by\":{\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"type\":\"object\"},\"deleted_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"id\",\"data\"],\"type\":\"object\"},\"type\":\"array\"},\"meta\":{\"additionalProperties\":true,\"properties\":{\"limit\":{\"type\":\"integer\"},\"page\":{\"type\":\"integer\"},\"pages\":{\"type\":\"integer\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Records\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/app/collections/{slug}/records","segments":[{"lit":"app"},{"lit":"collections"},{"var":"slug"},{"lit":"records"}],"select":{"exist":["slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[["collection"]]},"key$":"collection_record_list","name__orig":"collection_record_list","Name":"CollectionRecordList","name_":"collection_record_list","name-":"collection-record-list","NAME":"COLLECTION_RECORD_LIST","index$":12}, {"active":true,"entity":"collection_record_list","key$":"BasicCollectionRecordListFlow","kind":"basic","name":"BasicCollectionRecordListFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"slug":"slug01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"collection_record_list_ref01"}}],"index$":0}]}, 'CollectionRecordList')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let collection_record_list_ref01_data = Object.values(setup.data.existing.collection_record_list)[0] as any

    // LIST
    const collection_record_list_ref01_ent = client.CollectionRecordList()
    const collection_record_list_ref01_match: any = {}
    collection_record_list_ref01_match['slug'] = setup.idmap['slug01']

    const collection_record_list_ref01_list = (await collection_record_list_ref01_ent.list(collection_record_list_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/collection_record_list/CollectionRecordListTestData.json')

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
    ['collection_record_list01','collection_record_list02','collection_record_list03','collection01','collection02','collection03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_COLLECTION_RECORD_LIST_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_COLLECTION_RECORD_LIST_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_COLLECTION_RECORD_LIST_ENTID']
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
  
