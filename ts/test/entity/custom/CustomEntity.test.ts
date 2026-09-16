

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"custom","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"path","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /api/custom/{path}","json":"{\"operationId\":\"executeCustomEndpointPost\",\"parameters\":[{\"description\":\"Custom endpoint path (supports nested segments).\",\"in\":\"path\",\"name\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"type\":\"object\"}}},\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"type\":\"object\"}}},\"description\":\"Custom response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/custom/{path}","rename":{"param":{"path":"id"}},"segments":[{"lit":"api"},{"lit":"custom"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"path","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/custom/{path}","json":"{\"operationId\":\"executeCustomEndpointGet\",\"parameters\":[{\"description\":\"Custom endpoint path (supports nested segments).\",\"in\":\"path\",\"name\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"type\":\"object\"}}},\"description\":\"Custom response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/custom/{path}","rename":{"param":{"path":"id"}},"segments":[{"lit":"api"},{"lit":"custom"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"path","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"PATCH /api/custom/{path}","json":"{\"operationId\":\"executeCustomEndpointPatch\",\"parameters\":[{\"description\":\"Custom endpoint path (supports nested segments).\",\"in\":\"path\",\"name\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"type\":\"object\"}}},\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"type\":\"object\"}}},\"description\":\"Custom response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/api/custom/{path}","rename":{"param":{"path":"id"}},"segments":[{"lit":"api"},{"lit":"custom"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"path","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /api/custom/{path}","json":"{\"operationId\":\"executeCustomEndpointDelete\",\"parameters\":[{\"description\":\"Custom endpoint path (supports nested segments).\",\"in\":\"path\",\"name\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"type\":\"object\"}}},\"description\":\"Custom response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/api/custom/{path}","rename":{"param":{"path":"id"}},"segments":[{"lit":"api"},{"lit":"custom"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"path","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /api/custom/{path}","json":"{\"operationId\":\"executeCustomEndpointPut\",\"parameters\":[{\"description\":\"Custom endpoint path (supports nested segments).\",\"in\":\"path\",\"name\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"type\":\"object\"}}},\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"type\":\"object\"}}},\"description\":\"Custom response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/api/custom/{path}","rename":{"param":{"path":"id"}},"segments":[{"lit":"api"},{"lit":"custom"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"custom","name__orig":"custom","Name":"Custom","name_":"custom","name-":"custom","NAME":"CUSTOM","index$":13}, {"active":true,"entity":"custom","key$":"BasicCustomFlow","kind":"basic","name":"BasicCustomFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"custom_ref01"},"match":{"path":"path01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"custom_ref01","srcdatavar":"custom_ref01_data","suffix":"_up0"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-custom_ref01"}}],"valid":[],"index$":1},{"active":true,"data":{},"input":{"ref":"custom_ref01","srcdatavar":"custom_ref01_data","suffix":"_dt0"},"match":{"id":"custom01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-custom_ref01"}}],"index$":2},{"active":true,"data":{},"input":{"ref":"custom_ref01","suffix":"_rm0"},"match":{"id":"custom01"},"op":"remove","spec":[],"valid":[],"index$":3}]}, 'Custom')
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
    ['custom01','custom02','custom03'],
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
  
