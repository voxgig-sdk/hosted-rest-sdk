

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


describe('AgentHealthEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.AgentHealth()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_health.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"deprecations","req":true,"type":"`$ARRAY`","index$":0},{"active":true,"name":"rate_limit_status","req":true,"type":"`$OBJECT`","index$":1},{"active":true,"name":"status","req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"uptime_seconds","req":true,"type":"`$INTEGER`","index$":3},{"active":true,"name":"version","req":true,"type":"`$STRING`","index$":4}],"name":"agent_health","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /agent/v1/health","json":"{\"operationId\":\"agentHealth\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"deprecations\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"rate_limit_status\":{\"properties\":{\"limit_today\":{\"type\":[\"integer\",\"null\"]},\"remaining_today\":{\"type\":[\"integer\",\"null\"]},\"reset_at\":{\"format\":\"date-time\",\"type\":[\"string\",\"null\"]},\"tier\":{\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"enum\":[\"healthy\",\"degraded\",\"maintenance\"],\"type\":\"string\"},\"uptime_seconds\":{\"type\":\"integer\"},\"version\":{\"type\":\"string\"}},\"required\":[\"status\",\"version\",\"uptime_seconds\",\"rate_limit_status\",\"deprecations\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Healthy\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/agent/v1/health","segments":[{"lit":"agent"},{"lit":"v1"},{"lit":"health"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"agent_health","name__orig":"agent_health","Name":"AgentHealth","name_":"agent_health","name-":"agent-health","NAME":"AGENT_HEALTH","index$":0}, {"active":true,"entity":"agent_health","key$":"BasicAgentHealthFlow","kind":"basic","name":"BasicAgentHealthFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"agent_health_ref01","srcdatavar":"agent_health_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_health_ref01"}}],"index$":0}]}, 'AgentHealth')
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
  
