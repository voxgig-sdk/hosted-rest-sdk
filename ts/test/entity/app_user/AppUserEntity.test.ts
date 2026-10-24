

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


describe('AppUserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.AppUser()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('app_user hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of HostedRestSDK.test(offline).AppUser().stream('list')) { }
    }, /offline/)

    for await (const _item of HostedRestSDK.test(offline).AppUser()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = HostedRestSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.AppUser().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of HostedRestSDK.test().AppUser().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new HostedRestSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.AppUser().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.AppUser().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HostedRestSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppUser().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":0},"email":{"a":true,"fo":"email","h":"Email","n":"email","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"email","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":2},"last_login_at":{"a":true,"fo":"date-time","h":"Last Login At","n":"last_login_at","r":false,"t":"`$STRING`","key$":"last_login_at","index$":3},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"t":"`$OBJECT`","key$":"metadata","index$":4},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":5}},"id":{"field":"id","name":"id"},"name":"app_user","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/app-users/{id}/sessions/simulate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/app-users/{id}/sessions/simulate","q":{"$action":"session_simulate","exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"app-users"},{"var":"id"},{"lit":"sessions"},{"lit":"simulate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["email","metadata"],"co":{"id":"POST /api/app-users","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/app-users","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"app-users"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/projects/{projectId}/app-users","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"X-Reqres-Env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"project_id","or":"projectId","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"status","or":"statuses","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/projects/{projectId}/app-users","q":{"exist":["project_id"]},"r":{"param":{"projectId":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"projects"},{"var":"project_id"},{"lit":"app-users"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /api/app-users","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"X-Reqres-Env","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/app-users","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"app-users"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/app-users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/app-users/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"app-users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/app-users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/app-users/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"app-users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["email","metadata","status"],"co":{"id":"PUT /api/app-users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/app-users/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"app-users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"app_user","name__orig":"app_user","Name":"AppUser","name_":"app_user","name-":"app-user","NAME":"APP_USER","index$":3}, {"active":true,"entity":"app_user","key$":"BasicAppUserFlow","kind":"basic","name":"BasicAppUserFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_user_ref01"},"m":{"project_id":"project01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"app_user_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"app_user_ref01","srcdatavar":"app_user_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_user_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"app_user_ref01","srcdatavar":"app_user_ref01_data","suffix":"_dt0"},"m":{"id":"app_user01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_user_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"app_user_ref01","suffix":"_rm0"},"m":{"id":"app_user01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"app_user_ref01"}}],"index$":5}]}, 'AppUser', {"POST /api/app-users/{id}/sessions/simulate":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","description":"App user id.","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/app-users":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","format":"email","key$":"email"},"metadata":{"type":"object","additionalProperties":true,"key$":"metadata"}},"required":["email"],"additionalProperties":true,"x-ref":"#/components/schemas/AppUserCreateRequest","index$":1}}}},"parameters":[]},"GET /api/projects/{projectId}/app-users":{"protocol":"http","parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"projectId","in":"path","description":"Project id.","required":true,"schema":{"type":"string"},"index$":1},{"name":"statuses","in":"query","description":"Filter by status (active, pending) or use \"all\".","required":false,"schema":{"type":"string"},"index$":2}]},"GET /api/app-users":{"protocol":"http","parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"limit","in":"query","description":"Max results (default 50).","required":false,"schema":{"type":"integer","minimum":1,"maximum":200},"index$":1}]},"GET /api/app-users/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"App user id.","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /api/app-users/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"App user id.","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /api/app-users/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","format":"email","key$":"email"},"status":{"type":"string","key$":"status"},"metadata":{"type":"object","additionalProperties":true,"key$":"metadata"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppUserUpdateRequest","index$":1}}}},"parameters":[{"name":"id","in":"path","description":"App user id.","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_user_ref01_ent = client.AppUser()
    let app_user_ref01_data = setup.data.new.app_user['app_user_ref01']
    app_user_ref01_data['project_id'] = setup.idmap['project01']

    app_user_ref01_data = (await app_user_ref01_ent.create(app_user_ref01_data)).data()
    assert(null != app_user_ref01_data.id)


    // LIST
    const app_user_ref01_match: any = {}

    const app_user_ref01_list = (await app_user_ref01_ent.list(app_user_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(app_user_ref01_list, { id: app_user_ref01_data.id })))


    // UPDATE
    const app_user_ref01_data_up0: any = {}
    app_user_ref01_data_up0.id = app_user_ref01_data.id

    const app_user_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-app_user_ref01_' + setup.now }
    ;(app_user_ref01_data_up0 as any)[app_user_ref01_markdef_up0.name] = app_user_ref01_markdef_up0.value

    const app_user_ref01_resdata_up0 = (await app_user_ref01_ent.update(app_user_ref01_data_up0)).data()
    assert(app_user_ref01_resdata_up0.id === app_user_ref01_data_up0.id)

    assert((app_user_ref01_resdata_up0 as any)[app_user_ref01_markdef_up0.name] === app_user_ref01_markdef_up0.value)


    // LOAD
    const app_user_ref01_match_dt0: any = {}
    app_user_ref01_match_dt0.id = app_user_ref01_data.id
    const app_user_ref01_data_dt0 = (await app_user_ref01_ent.load(app_user_ref01_match_dt0)).data()
    assert(app_user_ref01_data_dt0.id === app_user_ref01_data.id)


    // REMOVE
    const app_user_ref01_match_rm0: any = { id: app_user_ref01_data.id }
    await app_user_ref01_ent.remove(app_user_ref01_match_rm0)
  

    // LIST
    const app_user_ref01_match_rt0: any = {}

    const app_user_ref01_list_rt0 = (await app_user_ref01_ent.list(app_user_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(app_user_ref01_list_rt0, { id: app_user_ref01_data.id })))


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
      '../../../../.sdk/test/entity/app_user/AppUserTestData.json')

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
    ['app_user01','app_user02','app_user03','project01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_APP_USER_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_APP_USER_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_APP_USER_ENTID']
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
  
