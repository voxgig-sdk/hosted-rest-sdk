

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


describe('AgentSandboxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.AgentSandbox()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_sandbox.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"email","name":"email","req":true,"type":"`$STRING`","index$":0},{"active":true,"name":"password","req":true,"type":"`$STRING`","index$":1}],"name":"agent_sandbox","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /agent/v1/auth/login","json":"{\"operationId\":\"agentLogin\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"email\":{\"format\":\"email\",\"type\":\"string\"},\"password\":{\"minLength\":8,\"type\":\"string\"}},\"required\":[\"email\",\"password\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{}},\"description\":\"Session created or MFA challenge\"},\"400\":{\"description\":\"Missing fields\"},\"401\":{\"description\":\"Invalid credentials or account locked\"},\"422\":{\"description\":\"Validation error\"},\"429\":{\"description\":\"Rate limited\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/agent/v1/auth/login","segments":[{"lit":"agent"},{"lit":"v1"},{"lit":"auth"},{"lit":"login"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cursor","orig":"cursor","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":42,"kind":"query","name":"seed","orig":"seed","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /agent/v1/orders","json":"{\"operationId\":\"agentListOrders\",\"parameters\":[{\"in\":\"query\",\"name\":\"cursor\",\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"maximum\":100,\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"status\",\"schema\":{\"enum\":[\"pending\",\"paid\",\"shipped\",\"delivered\",\"refunded\",\"cancelled\"],\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"seed\",\"schema\":{\"default\":42,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{}},\"description\":\"Paginated order list\"},\"400\":{\"description\":\"Invalid status filter\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/agent/v1/orders","segments":[{"lit":"agent"},{"lit":"v1"},{"lit":"orders"}],"select":{"exist":["cursor","limit","seed","status"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"scenario","orig":"scenario","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /agent/v1/scenarios/{scenario}","json":"{\"operationId\":\"agentScenario\",\"parameters\":[{\"in\":\"path\",\"name\":\"scenario\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Slow / partial-content / empty-response / malformed-json scenarios\"},\"206\":{\"description\":\"Partial content\"},\"302\":{\"description\":\"Redirect loop hop\"},\"401\":{\"description\":\"Unauthorized scenario\"},\"403\":{\"description\":\"Forbidden scenario\"},\"404\":{\"description\":\"Not-found scenario or unknown scenario name\"},\"409\":{\"description\":\"Conflict scenario\"},\"413\":{\"description\":\"Too-large scenario\"},\"422\":{\"description\":\"Validation-error scenario\"},\"429\":{\"description\":\"Rate-limited scenario\"},\"500\":{\"description\":\"Server-error scenario\"},\"502\":{\"description\":\"Bad-gateway scenario\"},\"504\":{\"description\":\"Timeout scenario (returns immediately, see X-Agent-Sandbox-Simulated-Delay header)\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/agent/v1/scenarios/{scenario}","segments":[{"lit":"agent"},{"lit":"v1"},{"lit":"scenarios"},{"var":"scenario"}],"select":{"exist":["scenario"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /agent/v1/scenarios","json":"{\"operationId\":\"agentListScenarios\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{}},\"description\":\"Scenario list\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/agent/v1/scenarios","segments":[{"lit":"agent"},{"lit":"v1"},{"lit":"scenarios"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[["scenario"]]},"key$":"agent_sandbox","name__orig":"agent_sandbox","Name":"AgentSandbox","name_":"agent_sandbox","name-":"agent-sandbox","NAME":"AGENT_SANDBOX","index$":1}, {"active":true,"entity":"agent_sandbox","key$":"BasicAgentSandboxFlow","kind":"basic","name":"BasicAgentSandboxFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"agent_sandbox_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"agent_sandbox_ref01","srcdatavar":"agent_sandbox_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_sandbox_ref01"}}],"index$":1}]}, 'AgentSandbox')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_sandbox_ref01_ent = client.AgentSandbox()
    let agent_sandbox_ref01_data = setup.data.new.agent_sandbox['agent_sandbox_ref01']

    agent_sandbox_ref01_data = (await agent_sandbox_ref01_ent.create(agent_sandbox_ref01_data)).data()
    assert(null != agent_sandbox_ref01_data)


    // LOAD
    const agent_sandbox_ref01_match_dt0: any = {}
    const agent_sandbox_ref01_data_dt0 = (await agent_sandbox_ref01_ent.load(agent_sandbox_ref01_match_dt0)).data()
    assert(null != agent_sandbox_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/agent_sandbox/AgentSandboxTestData.json')

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
    ['agent_sandbox01','agent_sandbox02','agent_sandbox03','scenario01','scenario02','scenario03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_AGENT_SANDBOX_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_AGENT_SANDBOX_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_AGENT_SANDBOX_ENTID']
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
  
