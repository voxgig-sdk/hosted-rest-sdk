

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":0},"password":{"a":true,"h":"Password","n":"password","r":true,"t":"`$STRING`","key$":"password","index$":1}},"name":"agent_sandbox","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /agent/v1/auth/login","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/agent/v1/auth/login","q":{},"r":{},"s":[{"lit":"agent"},{"lit":"v1"},{"lit":"auth"},{"lit":"login"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /agent/v1/orders","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":42,"k":"query","n":"seed","or":"seed","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/agent/v1/orders","q":{"exist":["cursor","limit","seed","status"]},"r":{},"s":[{"lit":"agent"},{"lit":"v1"},{"lit":"orders"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /agent/v1/scenarios/{scenario}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"scenario","or":"scenario","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/agent/v1/scenarios/{scenario}","q":{"exist":["scenario"]},"r":{},"s":[{"lit":"agent"},{"lit":"v1"},{"lit":"scenarios"},{"var":"scenario"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /agent/v1/scenarios","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/agent/v1/scenarios","q":{},"r":{},"s":[{"lit":"agent"},{"lit":"v1"},{"lit":"scenarios"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"agent_sandbox","name__orig":"agent_sandbox","Name":"AgentSandbox","name_":"agent_sandbox","name-":"agent-sandbox","NAME":"AGENT_SANDBOX","index$":1}, {"active":true,"entity":"agent_sandbox","key$":"BasicAgentSandboxFlow","kind":"basic","name":"BasicAgentSandboxFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_sandbox_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"agent_sandbox_ref01","srcdatavar":"agent_sandbox_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_sandbox_ref01"}}],"index$":1}]}, 'AgentSandbox', {"POST /agent/v1/auth/login":{"protocol":"http","operationId":"agentLogin","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["email","password"],"properties":{"email":{"type":"string","format":"email","key$":"email"},"password":{"type":"string","minLength":8,"key$":"password"}},"index$":1}}}},"responses":{"200":{"description":"Session created or MFA challenge","content":{"application/json":{}}},"400":{"description":"Missing fields"},"401":{"description":"Invalid credentials or account locked"},"422":{"description":"Validation error"},"429":{"description":"Rate limited"}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"GET /agent/v1/orders":{"protocol":"http","operationId":"agentListOrders","responses":{"200":{"description":"Paginated order list","content":{"application/json":{}}},"400":{"description":"Invalid status filter"}},"parameters":[{"name":"cursor","in":"query","schema":{"type":"string"},"index$":0},{"name":"limit","in":"query","schema":{"type":"integer","default":20,"maximum":100},"index$":1},{"name":"status","in":"query","schema":{"type":"string","enum":["pending","paid","shipped","delivered","refunded","cancelled"]},"index$":2},{"name":"seed","in":"query","schema":{"type":"integer","default":42},"index$":3}],"securitySource":"unspecified","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"GET /agent/v1/scenarios/{scenario}":{"protocol":"http","operationId":"agentScenario","responses":{"200":{"description":"Slow / partial-content / empty-response / malformed-json scenarios"},"206":{"description":"Partial content"},"302":{"description":"Redirect loop hop"},"401":{"description":"Unauthorized scenario"},"403":{"description":"Forbidden scenario"},"404":{"description":"Not-found scenario or unknown scenario name"},"409":{"description":"Conflict scenario"},"413":{"description":"Too-large scenario"},"422":{"description":"Validation-error scenario"},"429":{"description":"Rate-limited scenario"},"500":{"description":"Server-error scenario"},"502":{"description":"Bad-gateway scenario"},"504":{"description":"Timeout scenario (returns immediately, see X-Agent-Sandbox-Simulated-Delay header)"}},"parameters":[{"name":"scenario","in":"path","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}},"GET /agent/v1/scenarios":{"protocol":"http","operationId":"agentListScenarios","responses":{"200":{"description":"Scenario list","content":{"application/json":{}}}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}}})
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
    ['agent_sandbox01','agent_sandbox02','agent_sandbox03'],
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
  
