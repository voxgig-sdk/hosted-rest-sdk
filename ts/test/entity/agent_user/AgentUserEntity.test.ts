

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


describe('AgentUserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.AgentUser()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":0},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":1},"full_name":{"a":true,"h":"Full Name","n":"full_name","r":true,"t":"`$STRING`","key$":"full_name","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"locale":{"a":true,"h":"Locale","n":"locale","r":true,"t":"`$STRING`","key$":"locale","index$":4},"preferences":{"a":true,"h":"Preferences","n":"preferences","r":true,"t":"`$OBJECT`","key$":"preferences","index$":5},"profile":{"a":true,"h":"Profile","n":"profile","r":true,"t":"`$OBJECT`","key$":"profile","index$":6},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":7},"timezone":{"a":true,"h":"Timezone","n":"timezone","r":true,"t":"`$STRING`","key$":"timezone","index$":8},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":9}},"id":{"field":"id","name":"id"},"name":"agent_user","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /agent/v1/users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"expand","or":"expand","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/agent/v1/users/{id}","q":{"exist":["expand","id"]},"r":{},"s":[{"lit":"agent"},{"lit":"v1"},{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"agent_user","name__orig":"agent_user","Name":"AgentUser","name_":"agent_user","name-":"agent-user","NAME":"AGENT_USER","index$":2}, {"active":true,"entity":"agent_user","key$":"BasicAgentUserFlow","kind":"basic","name":"BasicAgentUserFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_user_ref01","srcdatavar":"agent_user_ref01_data","suffix":"_dt0"},"m":{"id":"agent_user01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_user_ref01"}}],"index$":0}]}, 'AgentUser', {"GET /agent/v1/users/{id}":{"protocol":"http","operationId":"agentGetUser","responses":{"200":{"description":"User found","content":{"application/json":{"schema":{"type":"object","required":["data"],"properties":{"data":{"type":"object","required":["id","email","full_name","locale","created_at","updated_at","timezone","profile","preferences","status"],"properties":{"id":{"pattern":"^usr_[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$","type":"string","key$":"id"},"email":{"format":"email","type":"string","key$":"email"},"full_name":{"type":"string","key$":"full_name"},"locale":{"type":"string","key$":"locale"},"created_at":{"format":"date-time","type":"string","key$":"created_at"},"updated_at":{"format":"date-time","type":"string","key$":"updated_at"},"timezone":{"type":"string","key$":"timezone"},"profile":{"properties":{"avatar_url":{"type":["string","null"]},"bio":{"type":["string","null"]},"company":{"properties":{"department":{"type":"string"},"employee_id":{"type":"string"},"name":{"type":"string"}},"type":["object","null"]},"social":{"properties":{"github":{"type":["string","null"]},"linkedin":{"type":["string","null"]},"twitter":{"type":["string","null"]}},"type":"object"}},"type":"object","key$":"profile"},"preferences":{"type":"object","key$":"preferences"},"status":{"enum":["active","suspended"],"type":"string","key$":"status"}},"x-ref":"#/components/schemas/AgentUser","index$":0}},"x-ref":"#/components/schemas/AgentUserDetailResponse"}}}},"400":{"description":"Invalid ID format","content":{"application/json":{"schema":{"type":"object","required":["error","message"],"properties":{"error":{"type":"string","description":"Machine-readable error code."},"message":{"type":"string","description":"Human-readable message."},"hint":{"type":"string"},"request_id":{"type":"string"}},"x-ref":"#/components/schemas/AgentErrorResponse"}}}},"404":{"description":"Not found","content":{"application/json":{"schema":{"type":"object","required":["error","message"],"properties":{"error":{"type":"string","description":"Machine-readable error code."},"message":{"type":"string","description":"Human-readable message."},"hint":{"type":"string"},"request_id":{"type":"string"}},"x-ref":"#/components/schemas/AgentErrorResponse"}}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string","pattern":"^usr_[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$"},"description":"ULID with usr_ prefix.","index$":0},{"name":"expand","in":"query","schema":{"type":"string"},"description":"Comma-separated: addresses, activity, organizations.","index$":1}],"securitySource":"unspecified","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_user_ref01_data = Object.values(setup.data.existing.agent_user)[0] as any

    // LOAD
    const agent_user_ref01_ent = client.AgentUser()
    const agent_user_ref01_match_dt0: any = {}
    agent_user_ref01_match_dt0.id = agent_user_ref01_data.id
    const agent_user_ref01_data_dt0 = (await agent_user_ref01_ent.load(agent_user_ref01_match_dt0)).data()
    assert(agent_user_ref01_data_dt0.id === agent_user_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/agent_user/AgentUserTestData.json')

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
    ['agent_user01','agent_user02','agent_user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_AGENT_USER_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_AGENT_USER_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_AGENT_USER_ENTID']
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
  
