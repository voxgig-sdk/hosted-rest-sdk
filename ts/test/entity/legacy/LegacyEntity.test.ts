

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


describe('LegacyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.Legacy()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'legacy.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"avatar":{"a":true,"h":"Avatar","n":"avatar","r":true,"t":"`$STRING`","key$":"avatar","index$":0},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":1},"first_name":{"a":true,"h":"First Name","n":"first_name","r":true,"t":"`$STRING`","key$":"first_name","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":3},"last_name":{"a":true,"h":"Last Name","n":"last_name","r":true,"t":"`$STRING`","key$":"last_name","index$":4}},"id":{"field":"id","name":"id"},"name":"legacy","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/users","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/users","q":{},"r":{},"s":[{"lit":"api"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/users","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/users","q":{"exist":["page","per_page"]},"r":{},"s":[{"lit":"api"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/api/users/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"api"},{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"legacy","name__orig":"legacy","Name":"Legacy","name_":"legacy","name-":"legacy","NAME":"LEGACY","index$":12}, {"active":true,"entity":"legacy","key$":"BasicLegacyFlow","kind":"basic","name":"BasicLegacyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"legacy_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"legacy_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"legacy_ref01","suffix":"_rm0"},"m":{"id":"legacy01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"legacy_ref01"}}],"index$":3}]}, 'Legacy', {"POST /api/users":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/LegacyMutationRequest","index$":1}}}},"parameters":[]},"GET /api/users":{"protocol":"http","parameters":[{"name":"page","in":"query","description":"Page number for pagination.","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0},{"name":"per_page","in":"query","description":"Number of users per page.","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"index$":1}]},"DELETE /api/users/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"User id.","required":true,"schema":{"type":"integer","minimum":1},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const legacy_ref01_ent = client.Legacy()
    let legacy_ref01_data = setup.data.new.legacy['legacy_ref01']

    legacy_ref01_data = (await legacy_ref01_ent.create(legacy_ref01_data)).data()
    assert(null != legacy_ref01_data.id)


    // LIST
    const legacy_ref01_match: any = {}

    const legacy_ref01_list = (await legacy_ref01_ent.list(legacy_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(legacy_ref01_list, { id: legacy_ref01_data.id })))


    // REMOVE
    const legacy_ref01_match_rm0: any = { id: legacy_ref01_data.id }
    await legacy_ref01_ent.remove(legacy_ref01_match_rm0)
  

    // LIST
    const legacy_ref01_match_rt0: any = {}

    const legacy_ref01_list_rt0 = (await legacy_ref01_ent.list(legacy_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(legacy_ref01_list_rt0, { id: legacy_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/legacy/LegacyTestData.json')

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
    ['legacy01','legacy02','legacy03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_LEGACY_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_LEGACY_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_LEGACY_ENTID']
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
  
