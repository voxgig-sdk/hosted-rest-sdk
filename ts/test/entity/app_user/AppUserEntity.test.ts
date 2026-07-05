
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { HostedRestSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('AppUserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTEDREST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTEDREST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.AppUser()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'app_user.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set HOSTED_REST_TEST_APP_USER_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_user_ref01_ent = client.AppUser()
    let app_user_ref01_data = setup.data.new.app_user['app_user_ref01']
    app_user_ref01_data['collection_id'] = setup.idmap['collection01']
    app_user_ref01_data['project_id'] = setup.idmap['project01']

    app_user_ref01_data = await app_user_ref01_ent.create(app_user_ref01_data)
    assert(null != app_user_ref01_data.id)


    // LIST
    const app_user_ref01_match: any = {}

    const app_user_ref01_list = await app_user_ref01_ent.list(app_user_ref01_match)

    assert(!isempty(select(app_user_ref01_list, { id: app_user_ref01_data.id })))


    // UPDATE
    const app_user_ref01_data_up0: any = {}
    app_user_ref01_data_up0.id = app_user_ref01_data.id

    const app_user_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-app_user_ref01_' + setup.now }
    ;(app_user_ref01_data_up0 as any)[app_user_ref01_markdef_up0.name] = app_user_ref01_markdef_up0.value

    const app_user_ref01_resdata_up0 = await app_user_ref01_ent.update(app_user_ref01_data_up0)
    assert(app_user_ref01_resdata_up0.id === app_user_ref01_data_up0.id)

    assert((app_user_ref01_resdata_up0 as any)[app_user_ref01_markdef_up0.name] === app_user_ref01_markdef_up0.value)


    // LOAD
    const app_user_ref01_match_dt0: any = {}
    app_user_ref01_match_dt0.id = app_user_ref01_data.id
    const app_user_ref01_data_dt0 = await app_user_ref01_ent.load(app_user_ref01_match_dt0)
    assert(app_user_ref01_data_dt0.id === app_user_ref01_data.id)


    // REMOVE
    const app_user_ref01_match_rm0: any = { id: app_user_ref01_data.id }
    await app_user_ref01_ent.remove(app_user_ref01_match_rm0)
  

    // LIST
    const app_user_ref01_match_rt0: any = {}

    const app_user_ref01_list_rt0 = await app_user_ref01_ent.list(app_user_ref01_match_rt0)

    assert(isempty(select(app_user_ref01_list_rt0, { id: app_user_ref01_data.id })))


  })
})



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
    ['app_user01','app_user02','app_user03','project01','project02','project03','collection01','collection02','collection03','record01','record02','record03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['HOSTED_REST_TEST_APP_USER_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'HOSTED_REST_TEST_APP_USER_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': 'NONE',
  })

  idmap = env['HOSTED_REST_TEST_APP_USER_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  if (live) {
    client = new HostedRestSDK(merge([
      {
        apikey: env.HOSTED_REST_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
