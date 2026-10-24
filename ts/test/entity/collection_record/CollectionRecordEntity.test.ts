

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HostedRestSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('CollectionRecordEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.CollectionRecord()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HostedRestSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CollectionRecord().list({"slug":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'collection_record.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app_user_id":{"a":true,"h":"App User Id","n":"app_user_id","r":false,"t":"`$STRING`","key$":"app_user_id","index$":0},"collection_id":{"a":true,"h":"Collection Id","n":"collection_id","r":false,"t":"`$STRING`","key$":"collection_id","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":2},"created_by":{"a":true,"h":"Created By","n":"created_by","r":false,"t":"`$STRING`","key$":"created_by","index$":3},"data":{"a":true,"h":"Data","n":"data","r":true,"t":"`$OBJECT`","key$":"data","index$":4},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"t":"`$STRING`","key$":"deleted_at","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":6},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"t":"`$STRING`","key$":"project_id","index$":7},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":8}},"id":{"field":"id","name":"id"},"name":"collection_record","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["data"],"co":{"id":"POST /api/collections/{slug}/records","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"X-Reqres-Env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/collections/{slug}/records","q":{"exist":["slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"collections"},{"var":"slug"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"bf":["data"],"co":{"id":"POST /app/collections/{slug}/records","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/app/collections/{slug}/records","q":{"exist":["slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"app"},{"lit":"collections"},{"var":"slug"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/collections/{slug}/records","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"X-Reqres-Env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"created_after","or":"created_after","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"created_before","or":"created_before","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"data_contain","or":"data_contains","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"include_deleted","or":"include_deleted","r":false,"t":"`$BOOLEAN`","index$":3},{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":6},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/api/collections/{slug}/records","q":{"exist":["slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"collections"},{"var":"slug"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /app/collections/{slug}/records","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/app/collections/{slug}/records","q":{"exist":["slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"app"},{"lit":"collections"},{"var":"slug"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/collections/{slug}/records/{recordId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"X-Reqres-Env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"recordId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/collections/{slug}/records/{recordId}","q":{"exist":["id","slug"]},"r":{"param":{"recordId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"collections"},{"var":"slug"},{"lit":"records"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /app/collections/{slug}/records/{recordId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"recordId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/app/collections/{slug}/records/{recordId}","q":{"exist":["id","slug"]},"r":{"param":{"recordId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"app"},{"lit":"collections"},{"var":"slug"},{"lit":"records"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/collections/{slug}/records/{recordId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"X-Reqres-Env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"recordId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/collections/{slug}/records/{recordId}","q":{"exist":["id","slug"]},"r":{"param":{"recordId":"id"}},"s":[{"lit":"api"},{"lit":"collections"},{"var":"slug"},{"lit":"records"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /app/collections/{slug}/records/{recordId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"recordId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/app/collections/{slug}/records/{recordId}","q":{"exist":["id","slug"]},"r":{"param":{"recordId":"id"}},"s":[{"lit":"app"},{"lit":"collections"},{"var":"slug"},{"lit":"records"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["data"],"co":{"id":"PUT /api/collections/{slug}/records/{recordId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"X-Reqres-Env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"recordId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/collections/{slug}/records/{recordId}","q":{"exist":["id","slug"]},"r":{"param":{"recordId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"collections"},{"var":"slug"},{"lit":"records"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"bf":["data"],"co":{"id":"PUT /app/collections/{slug}/records/{recordId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"recordId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/app/collections/{slug}/records/{recordId}","q":{"exist":["id","slug"]},"r":{"param":{"recordId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"app"},{"lit":"collections"},{"var":"slug"},{"lit":"records"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.collection"]]},"key$":"collection_record","name__orig":"collection_record","Name":"CollectionRecord","name_":"collection_record","name-":"collection-record","NAME":"COLLECTION_RECORD","index$":10}, {"active":true,"entity":"collection_record","key$":"BasicCollectionRecordFlow","kind":"basic","name":"BasicCollectionRecordFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"collection_record_ref01"},"m":{"slug":"slug01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"slug":"slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"collection_record_ref01"}}],"index$":1},{"a":true,"d":{"slug":"slug01"},"i":{"ref":"collection_record_ref01","srcdatavar":"collection_record_ref01_data","suffix":"_up0","textfield":"app_user_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-collection_record_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"collection_record_ref01","srcdatavar":"collection_record_ref01_data","suffix":"_dt0"},"m":{"id":"collection_record01","slug":"slug01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-collection_record_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"collection_record_ref01","suffix":"_rm0"},"m":{"id":"collection_record01","slug":"slug01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"slug":"slug01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"collection_record_ref01"}}],"index$":5}]}, 'CollectionRecord', {"POST /api/collections/{slug}/records":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"object","additionalProperties":true,"key$":"data"}},"required":["data"],"additionalProperties":true,"x-ref":"#/components/schemas/CollectionRecordCreateRequest","index$":1}}}},"parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":1}]},"POST /app/collections/{slug}/records":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"object","additionalProperties":true,"key$":"data"}},"required":["data"],"additionalProperties":true,"x-ref":"#/components/schemas/CollectionRecordCreateRequest","index$":1}}}},"parameters":[{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/collections/{slug}/records":{"protocol":"http","parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":1},{"name":"page","in":"query","description":"Page number.","required":false,"schema":{"type":"integer","minimum":1},"index$":2},{"name":"limit","in":"query","description":"Page size (max 100).","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"index$":3},{"name":"search","in":"query","description":"Case-insensitive search on record data.","required":false,"schema":{"type":"string"},"index$":4},{"name":"created_before","in":"query","description":"Filter records created before timestamp.","required":false,"schema":{"type":"string","format":"date-time"},"index$":5},{"name":"created_after","in":"query","description":"Filter records created after timestamp.","required":false,"schema":{"type":"string","format":"date-time"},"index$":6},{"name":"data_contains","in":"query","description":"JSON string for containment filter.","required":false,"schema":{"type":"string"},"index$":7},{"name":"order","in":"query","description":"Sort order by created_at.","required":false,"schema":{"type":"string","enum":["asc","desc"]},"index$":8},{"name":"include_deleted","in":"query","description":"Include soft-deleted records.","required":false,"schema":{"type":"boolean"},"index$":9}]},"GET /app/collections/{slug}/records":{"protocol":"http","parameters":[{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/collections/{slug}/records/{recordId}":{"protocol":"http","parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":1},{"name":"recordId","in":"path","description":"Record id.","required":true,"schema":{"type":"string"},"index$":2}]},"GET /app/collections/{slug}/records/{recordId}":{"protocol":"http","parameters":[{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":0},{"name":"recordId","in":"path","description":"Record id.","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/collections/{slug}/records/{recordId}":{"protocol":"http","parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":1},{"name":"recordId","in":"path","description":"Record id.","required":true,"schema":{"type":"string"},"index$":2}]},"DELETE /app/collections/{slug}/records/{recordId}":{"protocol":"http","parameters":[{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":0},{"name":"recordId","in":"path","description":"Record id.","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/collections/{slug}/records/{recordId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"object","additionalProperties":true,"key$":"data"}},"required":["data"],"additionalProperties":true,"x-ref":"#/components/schemas/CollectionRecordUpdateRequest","index$":1}}}},"parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":1},{"name":"recordId","in":"path","description":"Record id.","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /app/collections/{slug}/records/{recordId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"object","additionalProperties":true,"key$":"data"}},"required":["data"],"additionalProperties":true,"x-ref":"#/components/schemas/CollectionRecordUpdateRequest","index$":1}}}},"parameters":[{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":0},{"name":"recordId","in":"path","description":"Record id.","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const collection_record_ref01_ent = client.CollectionRecord()
    let collection_record_ref01_data = setup.data.new.collection_record['collection_record_ref01']
    collection_record_ref01_data['slug'] = setup.idmap['slug01']

    collection_record_ref01_data = (await collection_record_ref01_ent.create(collection_record_ref01_data)).data()
    assert(null != collection_record_ref01_data.id)


    // LIST
    const collection_record_ref01_match: any = {}
    collection_record_ref01_match['slug'] = setup.idmap['slug01']

    const collection_record_ref01_list = (await collection_record_ref01_ent.list(collection_record_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(collection_record_ref01_list, { id: collection_record_ref01_data.id })))


    // UPDATE
    const collection_record_ref01_data_up0: any = {}
    collection_record_ref01_data_up0.id = collection_record_ref01_data.id
    collection_record_ref01_data_up0['slug'] = setup.idmap['slug'] ?? setup.idmap['slug01']

    const collection_record_ref01_markdef_up0 = { name: 'app_user_id', value: 'Mark01-collection_record_ref01_' + setup.now }
    ;(collection_record_ref01_data_up0 as any)[collection_record_ref01_markdef_up0.name] = collection_record_ref01_markdef_up0.value

    const collection_record_ref01_resdata_up0 = (await collection_record_ref01_ent.update(collection_record_ref01_data_up0)).data()
    assert(collection_record_ref01_resdata_up0.id === collection_record_ref01_data_up0.id)

    assert((collection_record_ref01_resdata_up0 as any)[collection_record_ref01_markdef_up0.name] === collection_record_ref01_markdef_up0.value)


    // LOAD
    const collection_record_ref01_match_dt0: any = {}
    collection_record_ref01_match_dt0.id = collection_record_ref01_data.id
    collection_record_ref01_match_dt0['slug'] = setup.idmap['slug'] ?? setup.idmap['slug01']
    const collection_record_ref01_data_dt0 = (await collection_record_ref01_ent.load(collection_record_ref01_match_dt0)).data()
    assert(collection_record_ref01_data_dt0.id === collection_record_ref01_data.id)


    // REMOVE
    const collection_record_ref01_match_rm0: any = { id: collection_record_ref01_data.id }
    collection_record_ref01_match_rm0['slug'] = setup.idmap['slug'] ?? setup.idmap['slug01']
    await collection_record_ref01_ent.remove(collection_record_ref01_match_rm0)
  

    // LIST
    const collection_record_ref01_match_rt0: any = {}
    collection_record_ref01_match_rt0['slug'] = setup.idmap['slug01']

    const collection_record_ref01_list_rt0 = (await collection_record_ref01_ent.list(collection_record_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(collection_record_ref01_list_rt0, { id: collection_record_ref01_data.id })))


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/collection_record/CollectionRecordTestData.json')

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
    ['collection_record01','collection_record02','collection_record03','collection01','collection02','collection03','slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_COLLECTION_RECORD_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_COLLECTION_RECORD_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_COLLECTION_RECORD_ENTID']
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
  
