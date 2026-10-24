

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


describe('AppUserTotalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.AppUserTotal()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HostedRestSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppUserTotal().load({"project_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_user_total.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"total":{"a":true,"h":"Total","n":"total","r":true,"t":"`$INTEGER`","key$":"total","index$":0}},"name":"app_user_total","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/projects/{projectId}/app-users/total","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_reqres_env","or":"X-Reqres-Env","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"project_id","or":"projectId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/projects/{projectId}/app-users/total","q":{"exist":["project_id"]},"r":{"param":{"projectId":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"projects"},{"var":"project_id"},{"lit":"app-users"},{"lit":"total"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"app_user_total","name__orig":"app_user_total","Name":"AppUserTotal","name_":"app_user_total","name-":"app-user-total","NAME":"APP_USER_TOTAL","index$":6}, {"active":true,"entity":"app_user_total","key$":"BasicAppUserTotalFlow","kind":"basic","name":"BasicAppUserTotalFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"app_user_total_ref01","srcdatavar":"app_user_total_ref01_data","suffix":"_dt0"},"m":{"id":"app_user_total01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_user_total_ref01"}}],"unreachable":true}]}, 'AppUserTotal', {"GET /api/projects/{projectId}/app-users/total":{"protocol":"http","parameters":[{"name":"X-Reqres-Env","in":"header","description":"Environment key (for example: prod or dev).","required":false,"schema":{"type":"string"},"index$":0},{"name":"projectId","in":"path","description":"Project id.","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let app_user_total_ref01_data = Object.values(setup.data.existing.app_user_total)[0] as any

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
      '../../../../.sdk/test/entity/app_user_total/AppUserTotalTestData.json')

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
    ['app_user_total01','app_user_total02','app_user_total03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_APP_USER_TOTAL_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_APP_USER_TOTAL_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_APP_USER_TOTAL_ENTID']
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
  
