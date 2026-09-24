

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app_user_id":{"a":true,"h":"App User Id","n":"app_user_id","r":false,"t":"`$STRING`","key$":"app_user_id","index$":0},"collection_id":{"a":true,"h":"Collection Id","n":"collection_id","r":false,"t":"`$STRING`","key$":"collection_id","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":2},"created_by":{"a":true,"h":"Created By","n":"created_by","r":false,"t":"`$STRING`","key$":"created_by","index$":3},"data":{"a":true,"h":"Data","n":"data","r":true,"t":"`$OBJECT`","key$":"data","index$":4},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"t":"`$STRING`","key$":"deleted_at","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":6},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"t":"`$STRING`","key$":"project_id","index$":7},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":8}},"id":{"field":"id","name":"id"},"name":"collection_record_list","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/collections/{slug}/records","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"x_reqres_env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"created_after","or":"created_after","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"created_before","or":"created_before","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"data_contain","or":"data_contain","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"include_deleted","or":"include_deleted","r":false,"t":"`$BOOLEAN`","index$":3},{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":6},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/api/collections/{slug}/records","q":{"exist":["created_after","created_before","data_contain","include_deleted","limit","order","page","search","slug","x_reqres_env"]},"r":{},"s":[{"lit":"api"},{"lit":"collections"},{"var":"slug"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /app/collections/{slug}/records","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/app/collections/{slug}/records","q":{"exist":["slug"]},"r":{},"s":[{"lit":"app"},{"lit":"collections"},{"var":"slug"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.collection"]]},"key$":"collection_record_list","name__orig":"collection_record_list","Name":"CollectionRecordList","name_":"collection_record_list","name-":"collection-record-list","NAME":"COLLECTION_RECORD_LIST","index$":12}, {"active":true,"entity":"collection_record_list","key$":"BasicCollectionRecordListFlow","kind":"basic","name":"BasicCollectionRecordListFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"slug":"slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"collection_record_list_ref01"}}],"index$":0}]}, 'CollectionRecordList', {"GET /api/collections/{slug}/records":{"protocol":"http","operationId":"listCollectionRecords","responses":{"200":{"description":"Record list","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"additionalProperties":true,"properties":{"app_user_id":{"type":"string","key$":"app_user_id"},"collection_id":{"type":"string","key$":"collection_id"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"created_by":{"type":"string","key$":"created_by"},"data":{"additionalProperties":true,"type":"object","key$":"data"},"deleted_at":{"format":"date-time","nullable":true,"type":"string","key$":"deleted_at"},"id":{"type":"string","key$":"id"},"project_id":{"type":"string","key$":"project_id"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"}},"required":["id","data"],"type":"object","x-ref":"#/components/schemas/CollectionRecord","index$":0},"key$":"data","type":"array"},"meta":{"additionalProperties":true,"key$":"meta","properties":{"limit":{"type":"integer"},"page":{"type":"integer"},"pages":{"type":"integer"},"total":{"type":"integer"}},"type":"object"}},"required":["data"],"x-ref":"#/components/schemas/CollectionRecordListResponse"}}}},"400":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}},"404":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":1},{"name":"page","in":"query","description":"Page number.","required":false,"schema":{"type":"integer","minimum":1},"index$":2},{"name":"limit","in":"query","description":"Page size (max 100).","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"index$":3},{"name":"search","in":"query","description":"Case-insensitive search on record data.","required":false,"schema":{"type":"string"},"index$":4},{"name":"created_before","in":"query","description":"Filter records created before timestamp.","required":false,"schema":{"type":"string","format":"date-time"},"index$":5},{"name":"created_after","in":"query","description":"Filter records created after timestamp.","required":false,"schema":{"type":"string","format":"date-time"},"index$":6},{"name":"data_contains","in":"query","description":"JSON string for containment filter.","required":false,"schema":{"type":"string"},"index$":7},{"name":"order","in":"query","description":"Sort order by created_at.","required":false,"schema":{"type":"string","enum":["asc","desc"]},"index$":8},{"name":"include_deleted","in":"query","description":"Include soft-deleted records.","required":false,"schema":{"type":"boolean"},"index$":9}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"GET /app/collections/{slug}/records":{"protocol":"http","operationId":"listRecordsAppUser","responses":{"200":{"description":"Records","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"additionalProperties":true,"properties":{"app_user_id":{"type":"string","key$":"app_user_id"},"collection_id":{"type":"string","key$":"collection_id"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"created_by":{"type":"string","key$":"created_by"},"data":{"additionalProperties":true,"type":"object","key$":"data"},"deleted_at":{"format":"date-time","nullable":true,"type":"string","key$":"deleted_at"},"id":{"type":"string","key$":"id"},"project_id":{"type":"string","key$":"project_id"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"}},"required":["id","data"],"type":"object","x-ref":"#/components/schemas/CollectionRecord","index$":0},"key$":"data","type":"array"},"meta":{"additionalProperties":true,"key$":"meta","properties":{"limit":{"type":"integer"},"page":{"type":"integer"},"pages":{"type":"integer"},"total":{"type":"integer"}},"type":"object"}},"required":["data"],"x-ref":"#/components/schemas/CollectionRecordListResponse"}}}},"404":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}}})
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
    ['collection_record_list01','collection_record_list02','collection_record_list03','collection01','collection02','collection03','slug01'],
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
  
