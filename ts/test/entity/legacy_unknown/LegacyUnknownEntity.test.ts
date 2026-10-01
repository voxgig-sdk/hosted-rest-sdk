

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
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'legacy_unknown.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"color":{"a":true,"h":"Color","n":"color","r":true,"t":"`$STRING`","key$":"color","index$":0},"data":{"a":true,"h":"Data","n":"data","r":true,"t":"`$OBJECT`","key$":"data","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":3},"pantone_value":{"a":true,"h":"Pantone Value","n":"pantone_value","r":true,"t":"`$STRING`","key$":"pantone_value","index$":4},"support":{"a":true,"h":"Support","n":"support","r":false,"t":"`$OBJECT`","key$":"support","index$":5},"year":{"a":true,"h":"Year","n":"year","r":true,"t":"`$INTEGER`","key$":"year","index$":6}},"id":{"field":"id","name":"id"},"name":"legacy_unknown","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/unknown","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/unknown","q":{"exist":["page","per_page"]},"r":{},"s":[{"lit":"api"},{"lit":"unknown"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/unknown/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/unknown/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"api"},{"lit":"unknown"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"legacy_unknown","name__orig":"legacy_unknown","Name":"LegacyUnknown","name_":"legacy_unknown","name-":"legacy-unknown","NAME":"LEGACY_UNKNOWN","index$":14}, {"active":true,"entity":"legacy_unknown","key$":"BasicLegacyUnknownFlow","kind":"basic","name":"BasicLegacyUnknownFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"legacy_unknown_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"legacy_unknown_ref01","srcdatavar":"legacy_unknown_ref01_data","suffix":"_dt0"},"m":{"id":"legacy_unknown01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-legacy_unknown_ref01"}}],"index$":1}]}, 'LegacyUnknown', {"GET /api/unknown":{"protocol":"http","parameters":[{"name":"page","in":"query","description":"Page number for pagination.","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0},{"name":"per_page","in":"query","description":"Number of items per page.","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"index$":1}]},"GET /api/unknown/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"Resource id.","required":true,"schema":{"type":"integer","minimum":1},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let legacy_unknown_ref01_data = Object.values(setup.data.existing.legacy_unknown)[0] as any

    // LIST
    const legacy_unknown_ref01_ent = client.LegacyUnknown()
    const legacy_unknown_ref01_match: any = {}

    const legacy_unknown_ref01_list = (await legacy_unknown_ref01_ent.list(legacy_unknown_ref01_match)).map((e: any) => e.data())


    // LOAD
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
  
