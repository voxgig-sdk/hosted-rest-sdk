

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
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":0},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":1},"full_name":{"a":true,"h":"Full Name","n":"full_name","r":true,"t":"`$STRING`","key$":"full_name","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"locale":{"a":true,"h":"Locale","n":"locale","r":true,"t":"`$STRING`","key$":"locale","index$":4},"preferences":{"a":true,"h":"Preferences","n":"preferences","r":true,"t":"`$OBJECT`","key$":"preferences","index$":5},"profile":{"a":true,"h":"Profile","n":"profile","r":true,"t":"`$OBJECT`","key$":"profile","index$":6},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":7},"timezone":{"a":true,"h":"Timezone","n":"timezone","r":true,"t":"`$STRING`","key$":"timezone","index$":8},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":9}},"id":{"field":"id","name":"id"},"name":"agent_user","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /agent/v1/users","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"field","or":"fields","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":42,"k":"query","n":"seed","or":"seed","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/agent/v1/users","q":{"exist":["cursor","field","limit","seed"]},"r":{},"s":[{"lit":"agent"},{"lit":"v1"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /agent/v1/users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"expand","or":"expand","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/agent/v1/users/{id}","q":{"exist":["expand","id"]},"r":{},"s":[{"lit":"agent"},{"lit":"v1"},{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"agent_user","name__orig":"agent_user","Name":"AgentUser","name_":"agent_user","name-":"agent-user","NAME":"AGENT_USER","index$":2}, {"active":true,"entity":"agent_user","key$":"BasicAgentUserFlow","kind":"basic","name":"BasicAgentUserFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_user_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"agent_user_ref01","srcdatavar":"agent_user_ref01_data","suffix":"_dt0"},"m":{"id":"agent_user01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_user_ref01"}}],"index$":1}]}, 'AgentUser', {"GET /agent/v1/users":{"protocol":"http","parameters":[{"name":"cursor","in":"query","schema":{"type":"string"},"description":"Opaque cursor from previous response. Omit for first page.","index$":0},{"name":"limit","in":"query","schema":{"type":"integer","default":20,"maximum":100},"description":"Page size (silently clamped at 100).","index$":1},{"name":"fields","in":"query","schema":{"type":"string"},"description":"Comma-separated sparse fieldset (e.g. id,email,full_name).","index$":2},{"name":"seed","in":"query","schema":{"type":"integer","default":42},"description":"Deterministic fixture seed.","index$":3}]},"GET /agent/v1/users/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string","pattern":"^usr_[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$"},"description":"ULID with usr_ prefix.","index$":0},{"name":"expand","in":"query","schema":{"type":"string"},"description":"Comma-separated: addresses, activity, organizations.","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_user_ref01_data = Object.values(setup.data.existing.agent_user)[0] as any

    // LIST
    const agent_user_ref01_ent = client.AgentUser()
    const agent_user_ref01_match: any = {}

    const agent_user_ref01_list = (await agent_user_ref01_ent.list(agent_user_ref01_match)).map((e: any) => e.data())


    // LOAD
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
  
