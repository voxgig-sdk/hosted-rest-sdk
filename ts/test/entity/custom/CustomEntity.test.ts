

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


describe('CustomEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.Custom()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'custom.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"custom","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/custom/{path}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"path","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/custom/{path}","q":{"exist":["id"]},"r":{"param":{"path":"id"}},"s":[{"lit":"api"},{"lit":"custom"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/custom/{path}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"path","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/custom/{path}","q":{"exist":["id"]},"r":{"param":{"path":"id"}},"s":[{"lit":"api"},{"lit":"custom"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"co":{"id":"PATCH /api/custom/{path}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"path","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/api/custom/{path}","q":{"exist":["id"]},"r":{"param":{"path":"id"}},"s":[{"lit":"api"},{"lit":"custom"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/custom/{path}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"path","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/custom/{path}","q":{"exist":["id"]},"r":{"param":{"path":"id"}},"s":[{"lit":"api"},{"lit":"custom"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /api/custom/{path}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"path","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/custom/{path}","q":{"exist":["id"]},"r":{"param":{"path":"id"}},"s":[{"lit":"api"},{"lit":"custom"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"custom","name__orig":"custom","Name":"Custom","name_":"custom","name-":"custom","NAME":"CUSTOM","index$":13}, {"active":true,"entity":"custom","key$":"BasicCustomFlow","kind":"basic","name":"BasicCustomFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"custom_ref01"},"m":{"path":"path01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"custom_ref01","srcdatavar":"custom_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-custom_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"custom_ref01","srcdatavar":"custom_ref01_data","suffix":"_dt0"},"m":{"id":"custom01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-custom_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"custom_ref01","suffix":"_rm0"},"m":{"id":"custom01"},"o":"remove","s":[],"v":[],"index$":3}]}, 'Custom', {"POST /api/custom/{path}":{"protocol":"http","operationId":"executeCustomEndpointPost","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"index$":1}}}},"responses":{"200":{"description":"Custom response","content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"index$":0}}}},"401":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"path","in":"path","description":"Custom endpoint path (supports nested segments).","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"GET /api/custom/{path}":{"protocol":"http","operationId":"executeCustomEndpointGet","responses":{"200":{"description":"Custom response","content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"401":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}},"404":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"path","in":"path","description":"Custom endpoint path (supports nested segments).","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"PATCH /api/custom/{path}":{"protocol":"http","operationId":"executeCustomEndpointPatch","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"index$":1}}}},"responses":{"200":{"description":"Custom response","content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"index$":0}}}},"401":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"path","in":"path","description":"Custom endpoint path (supports nested segments).","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"DELETE /api/custom/{path}":{"protocol":"http","operationId":"executeCustomEndpointDelete","responses":{"200":{"description":"Custom response","content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"401":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"path","in":"path","description":"Custom endpoint path (supports nested segments).","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"PUT /api/custom/{path}":{"protocol":"http","operationId":"executeCustomEndpointPut","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"index$":1}}}},"responses":{"200":{"description":"Custom response","content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"index$":0}}}},"401":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"path","in":"path","description":"Custom endpoint path (supports nested segments).","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const custom_ref01_ent = client.Custom()
    let custom_ref01_data = setup.data.new.custom['custom_ref01']
    custom_ref01_data['path'] = setup.idmap['path01']

    custom_ref01_data = (await custom_ref01_ent.create(custom_ref01_data)).data()
    assert(null != custom_ref01_data.id)


    // UPDATE
    const custom_ref01_data_up0: any = {}
    custom_ref01_data_up0.id = custom_ref01_data.id

    const custom_ref01_resdata_up0 = (await custom_ref01_ent.update(custom_ref01_data_up0)).data()
    assert(custom_ref01_resdata_up0.id === custom_ref01_data_up0.id)


    // LOAD
    const custom_ref01_match_dt0: any = {}
    custom_ref01_match_dt0.id = custom_ref01_data.id
    const custom_ref01_data_dt0 = (await custom_ref01_ent.load(custom_ref01_match_dt0)).data()
    assert(custom_ref01_data_dt0.id === custom_ref01_data.id)


    // REMOVE
    const custom_ref01_match_rm0: any = { id: custom_ref01_data.id }
    await custom_ref01_ent.remove(custom_ref01_match_rm0)
  

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/custom/CustomTestData.json')

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
    ['custom01','custom02','custom03','path01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_CUSTOM_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_CUSTOM_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_CUSTOM_ENTID']
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
  
