

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


describe('AgentHealthEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.AgentHealth()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HostedRestSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentHealth().load({"status":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_health.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deprecations":{"a":true,"h":"Deprecations","n":"deprecations","r":true,"t":"`$ARRAY`","key$":"deprecations","index$":0},"rate_limit_status":{"a":true,"h":"Rate Limit Status","n":"rate_limit_status","r":true,"t":"`$OBJECT`","key$":"rate_limit_status","index$":1},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":2},"uptime_seconds":{"a":true,"h":"Uptime Seconds","n":"uptime_seconds","r":true,"t":"`$INTEGER`","key$":"uptime_seconds","index$":3},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$STRING`","key$":"version","index$":4}},"name":"agent_health","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /agent/v1/health","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/agent/v1/health","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"agent"},{"lit":"v1"},{"lit":"health"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"agent_health","name__orig":"agent_health","Name":"AgentHealth","name_":"agent_health","name-":"agent-health","NAME":"AGENT_HEALTH","index$":0}, {"active":true,"entity":"agent_health","key$":"BasicAgentHealthFlow","kind":"basic","name":"BasicAgentHealthFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_health_ref01","srcdatavar":"agent_health_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_health_ref01"}}],"index$":0}]}, 'AgentHealth', {"GET /agent/v1/health":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_health_ref01_data = Object.values(setup.data.existing.agent_health)[0] as any

    // LOAD
    const agent_health_ref01_ent = client.AgentHealth()
    const agent_health_ref01_match_dt0: any = {}
    const agent_health_ref01_data_dt0 = (await agent_health_ref01_ent.load(agent_health_ref01_match_dt0)).data()
    assert(null != agent_health_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/agent_health/AgentHealthTestData.json')

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
    ['agent_health01','agent_health02','agent_health03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_AGENT_HEALTH_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_AGENT_HEALTH_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_AGENT_HEALTH_ENTID']
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
  
