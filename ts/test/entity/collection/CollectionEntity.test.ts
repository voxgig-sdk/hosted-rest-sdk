

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":2},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"t":"`$STRING`","key$":"project_id","index$":3},"schema":{"a":true,"h":"Schema","n":"schema","r":false,"t":"`$OBJECT`","key$":"schema","index$":4},"slug":{"a":true,"h":"Slug","n":"slug","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"slug","index$":5},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":6},"user_id":{"a":true,"h":"User Id","n":"user_id","r":false,"t":"`$STRING`","key$":"user_id","index$":7},"visibility":{"a":true,"h":"Visibility","n":"visibility","r":false,"t":"`$STRING`","key$":"visibility","index$":8}},"id":{"field":"id","name":"id"},"name":"collection","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/collections","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"x_reqres_env","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/collections","q":{"exist":["x_reqres_env"]},"r":{},"s":[{"lit":"api"},{"lit":"collections"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/collections","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"x_reqres_env","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/collections","q":{"exist":["x_reqres_env"]},"r":{},"s":[{"lit":"api"},{"lit":"collections"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /app/collections","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/app/collections","q":{},"r":{},"s":[{"lit":"app"},{"lit":"collections"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/collections/{slug}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"x_reqres_env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/collections/{slug}","q":{"exist":["id","x_reqres_env"]},"r":{"param":{"slug":"id"}},"s":[{"lit":"api"},{"lit":"collections"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /app/collections/{slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/app/collections/{slug}","q":{"exist":["id"]},"r":{"param":{"slug":"id"}},"s":[{"lit":"app"},{"lit":"collections"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/collections/{slug}/records/{recordId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"x_reqres_env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"collection_id","or":"slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"record_id","or":"record_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/collections/{slug}/records/{recordId}","q":{"exist":["collection_id","record_id","x_reqres_env"]},"r":{"param":{"recordId":"record_id","slug":"collection_id"}},"s":[{"lit":"api"},{"lit":"collections"},{"var":"collection_id"},{"lit":"records"},{"var":"record_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /api/collections/{slug}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"x_reqres_env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/collections/{slug}","q":{"exist":["id","x_reqres_env"]},"r":{"param":{"slug":"id"}},"s":[{"lit":"api"},{"lit":"collections"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /api/collections/{slug}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"x_reqres_env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/collections/{slug}","q":{"exist":["id","x_reqres_env"]},"r":{"param":{"slug":"id"}},"s":[{"lit":"api"},{"lit":"collections"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"collection","name__orig":"collection","Name":"Collection","name_":"collection","name-":"collection","NAME":"COLLECTION","index$":10}, {"active":true,"entity":"collection","key$":"BasicCollectionFlow","kind":"basic","name":"BasicCollectionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"collection_ref01"},"m":{"collection_id":"collection01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"collection_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"collection_ref01","srcdatavar":"collection_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-collection_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"collection_ref01","srcdatavar":"collection_ref01_data","suffix":"_dt0"},"m":{"id":"collection01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-collection_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"collection_ref01","suffix":"_rm0"},"m":{"id":"collection01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"collection_ref01"}}],"index$":5}]}, 'Collection', {"POST /api/collections":{"protocol":"http","operationId":"createCollection","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"},"slug":{"type":"string","key$":"slug"},"schema":{"type":"object","additionalProperties":true,"key$":"schema"},"project_id":{"oneOf":[{"type":"string"},{"type":"integer"}],"key$":"project_id"},"visibility":{"type":"string","key$":"visibility"}},"required":["name"],"additionalProperties":true,"x-ref":"#/components/schemas/CollectionCreateRequest","index$":1}}}},"responses":{"201":{"description":"Collection created","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"project_id":{"type":"string","key$":"project_id"},"user_id":{"type":"string","key$":"user_id"},"name":{"type":"string","key$":"name"},"slug":{"type":"string","key$":"slug"},"schema":{"additionalProperties":true,"type":"object","key$":"schema"},"visibility":{"type":"string","key$":"visibility"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"}},"required":["id","name","slug"],"additionalProperties":true,"x-ref":"#/components/schemas/Collection","index$":0}},"required":["data"],"x-ref":"#/components/schemas/CollectionResponse"}}}},"400":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}},"401":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"GET /api/collections":{"protocol":"http","operationId":"listCollections","responses":{"200":{"description":"Collections list","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"additionalProperties":true,"properties":{"created_at":{"format":"date-time","type":"string","key$":"created_at"},"id":{"type":"string","key$":"id"},"name":{"type":"string","key$":"name"},"project_id":{"type":"string","key$":"project_id"},"schema":{"additionalProperties":true,"type":"object","key$":"schema"},"slug":{"type":"string","key$":"slug"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"},"user_id":{"type":"string","key$":"user_id"},"visibility":{"type":"string","key$":"visibility"}},"required":["id","name","slug"],"type":"object","x-ref":"#/components/schemas/Collection","index$":0},"key$":"data","type":"array"}},"required":["data"],"x-ref":"#/components/schemas/CollectionListResponse"}}}},"401":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"GET /app/collections":{"protocol":"http","operationId":"listCollectionsAppUser","responses":{"200":{"description":"Collections list","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"additionalProperties":true,"properties":{"created_at":{"format":"date-time","type":"string","key$":"created_at"},"id":{"type":"string","key$":"id"},"name":{"type":"string","key$":"name"},"project_id":{"type":"string","key$":"project_id"},"schema":{"additionalProperties":true,"type":"object","key$":"schema"},"slug":{"type":"string","key$":"slug"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"},"user_id":{"type":"string","key$":"user_id"},"visibility":{"type":"string","key$":"visibility"}},"required":["id","name","slug"],"type":"object","x-ref":"#/components/schemas/Collection","index$":0},"key$":"data","type":"array"}},"required":["data"],"x-ref":"#/components/schemas/CollectionListResponse"}}}},"401":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"GET /api/collections/{slug}":{"protocol":"http","operationId":"getCollection","responses":{"200":{"description":"Collection","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"project_id":{"type":"string","key$":"project_id"},"user_id":{"type":"string","key$":"user_id"},"name":{"type":"string","key$":"name"},"slug":{"type":"string","key$":"slug"},"schema":{"additionalProperties":true,"type":"object","key$":"schema"},"visibility":{"type":"string","key$":"visibility"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"}},"required":["id","name","slug"],"additionalProperties":true,"x-ref":"#/components/schemas/Collection","index$":0}},"required":["data"],"x-ref":"#/components/schemas/CollectionResponse"}}}},"404":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"GET /app/collections/{slug}":{"protocol":"http","operationId":"getCollectionAppUser","responses":{"200":{"description":"Collection","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"project_id":{"type":"string","key$":"project_id"},"user_id":{"type":"string","key$":"user_id"},"name":{"type":"string","key$":"name"},"slug":{"type":"string","key$":"slug"},"schema":{"additionalProperties":true,"type":"object","key$":"schema"},"visibility":{"type":"string","key$":"visibility"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"}},"required":["id","name","slug"],"additionalProperties":true,"x-ref":"#/components/schemas/Collection","index$":0}},"required":["data"],"x-ref":"#/components/schemas/CollectionResponse"}}}},"404":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"DELETE /api/collections/{slug}/records/{recordId}":{"protocol":"http","operationId":"deleteCollectionRecord","responses":{"204":{"description":"No content"},"404":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":1},{"name":"recordId","in":"path","description":"Record id.","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"DELETE /api/collections/{slug}":{"protocol":"http","operationId":"deleteCollection","responses":{"204":{"description":"No content"},"404":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"PUT /api/collections/{slug}":{"protocol":"http","operationId":"updateCollection","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"},"slug":{"type":"string","key$":"slug"},"schema":{"type":"object","additionalProperties":true,"key$":"schema"},"visibility":{"type":"string","key$":"visibility"}},"additionalProperties":true,"x-ref":"#/components/schemas/CollectionUpdateRequest","index$":1}}}},"responses":{"200":{"description":"Collection updated","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"project_id":{"type":"string","key$":"project_id"},"user_id":{"type":"string","key$":"user_id"},"name":{"type":"string","key$":"name"},"slug":{"type":"string","key$":"slug"},"schema":{"additionalProperties":true,"type":"object","key$":"schema"},"visibility":{"type":"string","key$":"visibility"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"}},"required":["id","name","slug"],"additionalProperties":true,"x-ref":"#/components/schemas/Collection","index$":0}},"required":["data"],"x-ref":"#/components/schemas/CollectionResponse"}}}},"400":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}},"404":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"slug","in":"path","description":"Collection slug.","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}}})
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
    ['collection01','collection02','collection03'],
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
  
