

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


describe('LegacyMutationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.LegacyMutation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['create', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'legacy_mutation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"t":"`$STRING`","key$":"createdAt","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"t":"`$STRING`","key$":"updatedAt","index$":2}},"id":{"field":"id","name":"id"},"name":"legacy_mutation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/users","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/users","q":{},"r":{},"s":[{"lit":"api"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"patch":{"input":"data","name":"patch","points":[{"a":true,"co":{"id":"PATCH /api/users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PATCH","o":"/api/users/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"api"},{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /api/users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PUT","o":"/api/users/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"api"},{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"legacy_mutation","name__orig":"legacy_mutation","Name":"LegacyMutation","name_":"legacy_mutation","name-":"legacy-mutation","NAME":"LEGACY_MUTATION","index$":15}, {"active":true,"entity":"legacy_mutation","key$":"BasicLegacyMutationFlow","kind":"basic","name":"BasicLegacyMutationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"legacy_mutation_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"legacy_mutation_ref01","srcdatavar":"legacy_mutation_ref01_data","suffix":"_up0","textfield":"createdAt"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-legacy_mutation_ref01"}}],"v":[],"index$":1}]}, 'LegacyMutation', {"POST /api/users":{"protocol":"http","operationId":"createLegacyUser","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/LegacyMutationRequest","index$":1}}}},"responses":{"201":{"description":"User created","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"createdAt":{"type":"string","format":"date-time","key$":"createdAt"},"updatedAt":{"type":"string","format":"date-time","key$":"updatedAt"}},"additionalProperties":true,"x-ref":"#/components/schemas/LegacyMutationResponse"}}}},"400":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"PATCH /api/users/{id}":{"protocol":"http","operationId":"patchLegacyUser","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/LegacyMutationRequest","index$":1}}}},"responses":{"200":{"description":"User updated","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"createdAt":{"type":"string","format":"date-time","key$":"createdAt"},"updatedAt":{"type":"string","format":"date-time","key$":"updatedAt"}},"additionalProperties":true,"x-ref":"#/components/schemas/LegacyMutationResponse","index$":0}}}},"400":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"id","in":"path","description":"User id.","required":true,"schema":{"type":"integer","minimum":1},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"PUT /api/users/{id}":{"protocol":"http","operationId":"updateLegacyUser","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/LegacyMutationRequest","index$":1}}}},"responses":{"200":{"description":"User updated","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"createdAt":{"type":"string","format":"date-time","key$":"createdAt"},"updatedAt":{"type":"string","format":"date-time","key$":"updatedAt"}},"additionalProperties":true,"x-ref":"#/components/schemas/LegacyMutationResponse","index$":0}}}},"400":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"id","in":"path","description":"User id.","required":true,"schema":{"type":"integer","minimum":1},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const legacy_mutation_ref01_ent = client.LegacyMutation()
    let legacy_mutation_ref01_data = setup.data.new.legacy_mutation['legacy_mutation_ref01']

    legacy_mutation_ref01_data = (await legacy_mutation_ref01_ent.create(legacy_mutation_ref01_data)).data()
    assert(null != legacy_mutation_ref01_data.id)


    // UPDATE
    const legacy_mutation_ref01_data_up0: any = {}
    legacy_mutation_ref01_data_up0.id = legacy_mutation_ref01_data.id

    const legacy_mutation_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-legacy_mutation_ref01_' + setup.now }
    ;(legacy_mutation_ref01_data_up0 as any)[legacy_mutation_ref01_markdef_up0.name] = legacy_mutation_ref01_markdef_up0.value

    const legacy_mutation_ref01_resdata_up0 = (await legacy_mutation_ref01_ent.update(legacy_mutation_ref01_data_up0)).data()
    assert(legacy_mutation_ref01_resdata_up0.id === legacy_mutation_ref01_data_up0.id)

    assert((legacy_mutation_ref01_resdata_up0 as any)[legacy_mutation_ref01_markdef_up0.name] === legacy_mutation_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/legacy_mutation/LegacyMutationTestData.json')

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
    ['legacy_mutation01','legacy_mutation02','legacy_mutation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_LEGACY_MUTATION_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_LEGACY_MUTATION_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_LEGACY_MUTATION_ENTID']
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
  
