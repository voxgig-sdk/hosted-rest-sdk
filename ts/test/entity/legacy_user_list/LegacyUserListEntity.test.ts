

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


describe('LegacyUserListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOSTED_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HostedRestSDK.test()
    const ent = testsdk.LegacyUserList()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'legacy_user_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"avatar":{"a":true,"h":"Avatar","n":"avatar","r":true,"t":"`$STRING`","key$":"avatar","index$":0},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":1},"first_name":{"a":true,"h":"First Name","n":"first_name","r":true,"t":"`$STRING`","key$":"first_name","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":3},"last_name":{"a":true,"h":"Last Name","n":"last_name","r":true,"t":"`$STRING`","key$":"last_name","index$":4}},"id":{"field":"id","name":"id"},"name":"legacy_user_list","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/users","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/users","q":{"exist":["page","per_page"]},"r":{},"s":[{"lit":"api"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"legacy_user_list","name__orig":"legacy_user_list","Name":"LegacyUserList","name_":"legacy_user_list","name-":"legacy-user-list","NAME":"LEGACY_USER_LIST","index$":19}, {"active":true,"entity":"legacy_user_list","key$":"BasicLegacyUserListFlow","kind":"basic","name":"BasicLegacyUserListFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"legacy_user_list_ref01"}}],"index$":0}]}, 'LegacyUserList', {"GET /api/users":{"protocol":"http","operationId":"getLegacyUsers","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"page":{"key$":"page","type":"integer"},"per_page":{"key$":"per_page","type":"integer"},"total":{"key$":"total","type":"integer"},"total_pages":{"key$":"total_pages","type":"integer"},"data":{"items":{"properties":{"avatar":{"type":"string","key$":"avatar"},"email":{"format":"email","type":"string","key$":"email"},"first_name":{"type":"string","key$":"first_name"},"id":{"type":"integer","key$":"id"},"last_name":{"type":"string","key$":"last_name"}},"required":["id","email","first_name","last_name","avatar"],"type":"object","x-ref":"#/components/schemas/LegacyUser","index$":0},"key$":"data","type":"array"},"support":{"additionalProperties":true,"key$":"support","type":"object"}},"required":["page","per_page","total","total_pages","data"],"additionalProperties":true,"x-ref":"#/components/schemas/LegacyUserListResponse"}}}},"400":{"description":"Error response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"additionalProperties":true,"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"page","in":"query","description":"Page number for pagination.","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0},{"name":"per_page","in":"query","description":"Number of users per page.","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"index$":1}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key"},"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"session_token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let legacy_user_list_ref01_data = Object.values(setup.data.existing.legacy_user_list)[0] as any

    // LIST
    const legacy_user_list_ref01_ent = client.LegacyUserList()
    const legacy_user_list_ref01_match: any = {}

    const legacy_user_list_ref01_list = (await legacy_user_list_ref01_ent.list(legacy_user_list_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/legacy_user_list/LegacyUserListTestData.json')

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
    ['legacy_user_list01','legacy_user_list02','legacy_user_list03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOSTED_REST_TEST_LEGACY_USER_LIST_ENTID': idmap,
    'HOSTED_REST_TEST_LIVE': 'FALSE',
    'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
    'HOSTED_REST_APIKEY': '',
  })

  idmap = env['HOSTED_REST_TEST_LEGACY_USER_LIST_ENTID']

  const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOSTED_REST_TEST_LEGACY_USER_LIST_ENTID']
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
  
