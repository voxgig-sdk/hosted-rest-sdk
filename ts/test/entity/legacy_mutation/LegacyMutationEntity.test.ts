

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


describe('LegacyMutationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.LegacyMutation()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('legacy_mutation hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of HostedRestSDK.test(offline).LegacyMutation().stream('list')) { }
    }, /offline/)

    for await (const _item of HostedRestSDK.test(offline).LegacyMutation()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = HostedRestSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.LegacyMutation().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of HostedRestSDK.test().LegacyMutation().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new HostedRestSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.LegacyMutation().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.LegacyMutation().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HostedRestSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LegacyMutation().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['create', 'list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'legacy_mutation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"avatar":{"a":true,"h":"Avatar","n":"avatar","r":true,"t":"`$STRING`","key$":"avatar","index$":0},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"t":"`$STRING`","key$":"createdAt","index$":1},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":2},"first_name":{"a":true,"h":"First Name","n":"first_name","r":true,"t":"`$STRING`","key$":"first_name","index$":3},"id":{"a":true,"h":"Id","n":"id","op":{"list":{"req":true,"type":"`$INTEGER`"}},"r":false,"t":"`$STRING`","key$":"id","index$":4},"last_name":{"a":true,"h":"Last Name","n":"last_name","r":true,"t":"`$STRING`","key$":"last_name","index$":5},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"t":"`$STRING`","key$":"updatedAt","index$":6}},"id":{"field":"id","name":"id"},"name":"legacy_mutation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/users","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/users","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/users","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/users","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PATCH","o":"/api/users/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PUT","o":"/api/users/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"legacy_mutation","name__orig":"legacy_mutation","Name":"LegacyMutation","name_":"legacy_mutation","name-":"legacy-mutation","NAME":"LEGACY_MUTATION","index$":12}, {"active":true,"entity":"legacy_mutation","key$":"BasicLegacyMutationFlow","kind":"basic","name":"BasicLegacyMutationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"legacy_mutation_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"legacy_mutation_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"legacy_mutation_ref01","srcdatavar":"legacy_mutation_ref01_data","suffix":"_up0","textfield":"avatar"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-legacy_mutation_ref01"}}],"v":[],"index$":2}]}, 'LegacyMutation', {"POST /api/users":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/LegacyMutationRequest","index$":1}}}},"parameters":[]},"GET /api/users":{"protocol":"http","parameters":[{"name":"page","in":"query","description":"Page number for pagination.","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0},{"name":"per_page","in":"query","description":"Number of users per page.","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"index$":1}]},"PATCH /api/users/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/LegacyMutationRequest","index$":1}}}},"parameters":[{"name":"id","in":"path","description":"User id.","required":true,"schema":{"type":"integer","minimum":1},"index$":0}]},"PUT /api/users/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/LegacyMutationRequest","index$":1}}}},"parameters":[{"name":"id","in":"path","description":"User id.","required":true,"schema":{"type":"integer","minimum":1},"index$":0}]}}, { strict: LIVE_STRICT, t })
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


    // LIST
    const legacy_mutation_ref01_match: any = {}

    const legacy_mutation_ref01_list = (await legacy_mutation_ref01_ent.list(legacy_mutation_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(legacy_mutation_ref01_list, { id: legacy_mutation_ref01_data.id })))


    // UPDATE
    const legacy_mutation_ref01_data_up0: any = {}
    legacy_mutation_ref01_data_up0.id = legacy_mutation_ref01_data.id

    const legacy_mutation_ref01_markdef_up0 = { name: 'avatar', value: 'Mark01-legacy_mutation_ref01_' + setup.now }
    ;(legacy_mutation_ref01_data_up0 as any)[legacy_mutation_ref01_markdef_up0.name] = legacy_mutation_ref01_markdef_up0.value

    const legacy_mutation_ref01_resdata_up0 = (await legacy_mutation_ref01_ent.update(legacy_mutation_ref01_data_up0)).data()
    assert(legacy_mutation_ref01_resdata_up0.id === legacy_mutation_ref01_data_up0.id)

    assert((legacy_mutation_ref01_resdata_up0 as any)[legacy_mutation_ref01_markdef_up0.name] === legacy_mutation_ref01_markdef_up0.value)


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
  
