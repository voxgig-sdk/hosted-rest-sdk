

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


describe('LegacyUnknownEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.LegacyUnknown()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'legacy_unknown.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":true,"t":"`$OBJECT`","key$":"data","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"support":{"a":true,"h":"Support","n":"support","r":false,"t":"`$OBJECT`","key$":"support","index$":2}},"id":{"field":"id","name":"id"},"name":"legacy_unknown","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/unknown/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/unknown/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"api"},{"lit":"unknown"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"legacy_unknown","name__orig":"legacy_unknown","Name":"LegacyUnknown","name_":"legacy_unknown","name-":"legacy-unknown","NAME":"LEGACY_UNKNOWN","index$":16}, {"active":true,"entity":"legacy_unknown","key$":"BasicLegacyUnknownFlow","kind":"basic","name":"BasicLegacyUnknownFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"legacy_unknown_ref01","srcdatavar":"legacy_unknown_ref01_data","suffix":"_dt0"},"m":{"id":"legacy_unknown01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-legacy_unknown_ref01"}}],"index$":0}]}, 'LegacyUnknown', {"GET /api/unknown/{id}":{"protocol":"http","operationId":"getLegacyUnknownById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"object","properties":{"id":{"type":"integer"},"name":{"type":"string"},"year":{"type":"integer"},"color":{"type":"string"},"pantone_value":{"type":"string"}},"required":["id","name","year","color","pantone_value"],"x-ref":"#/components/schemas/LegacyUnknown","key$":"data"},"support":{"type":"object","additionalProperties":true,"key$":"support"}},"required":["data"],"additionalProperties":true,"x-ref":"#/components/schemas/LegacyUnknownResponse","index$":0}}}},"404":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"id","in":"path","description":"Resource id.","required":true,"schema":{"type":"integer","minimum":1},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let legacy_unknown_ref01_data = Object.values(setup.data.existing.legacy_unknown)[0] as any

    // LOAD
    const legacy_unknown_ref01_ent = client.LegacyUnknown()
    const legacy_unknown_ref01_match_dt0: any = {}
    legacy_unknown_ref01_match_dt0.id = legacy_unknown_ref01_data.id
    const legacy_unknown_ref01_data_dt0 = (await legacy_unknown_ref01_ent.load(legacy_unknown_ref01_match_dt0)).data()
    assert(legacy_unknown_ref01_data_dt0.id === legacy_unknown_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/legacy_unknown/LegacyUnknownTestData.json')

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
    ['legacy_unknown01','legacy_unknown02','legacy_unknown03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_LEGACY_UNKNOWN_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_LEGACY_UNKNOWN_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_LEGACY_UNKNOWN_ENTID']
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
  
