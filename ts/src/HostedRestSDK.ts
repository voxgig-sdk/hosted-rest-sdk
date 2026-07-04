// HostedRest Ts SDK

import { AgentHealthEntity } from './entity/AgentHealthEntity'
import { AgentSandboxEntity } from './entity/AgentSandboxEntity'
import { AgentUserDetailEntity } from './entity/AgentUserDetailEntity'
import { AgentUserListEntity } from './entity/AgentUserListEntity'
import { AppUserEntity } from './entity/AppUserEntity'
import { AppUserLoginEntity } from './entity/AppUserLoginEntity'
import { AppUserSessionEntity } from './entity/AppUserSessionEntity'
import { AppUserTotalEntity } from './entity/AppUserTotalEntity'
import { AppUserVerifyEntity } from './entity/AppUserVerifyEntity'
import { AuthenticationEntity } from './entity/AuthenticationEntity'
import { CollectionEntity } from './entity/CollectionEntity'
import { CollectionRecordEntity } from './entity/CollectionRecordEntity'
import { CollectionRecordListEntity } from './entity/CollectionRecordListEntity'
import { CustomEntity } from './entity/CustomEntity'
import { LegacyEntity } from './entity/LegacyEntity'
import { LegacyMutationEntity } from './entity/LegacyMutationEntity'
import { LegacyUnknownEntity } from './entity/LegacyUnknownEntity'
import { LegacyUnknownListEntity } from './entity/LegacyUnknownListEntity'
import { LegacyUserEntity } from './entity/LegacyUserEntity'
import { LegacyUserListEntity } from './entity/LegacyUserListEntity'
import { LoginEntity } from './entity/LoginEntity'
import { RegisterEntity } from './entity/RegisterEntity'

export type * from './HostedRestTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { HostedRestEntityBase } from './HostedRestEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class HostedRestSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _agent_health?: AgentHealthEntity

  // Idiomatic facade: `client.agent_health.list()` / `client.agent_health.load({ id })`.
  get agent_health(): AgentHealthEntity {
    return (this._agent_health ??= new AgentHealthEntity(this, undefined))
  }

  /** @deprecated Use `client.agent_health` instead. */
  AgentHealth(data?: any) {
    const self = this
    return new AgentHealthEntity(self,data)
  }


  _agent_sandbox?: AgentSandboxEntity

  // Idiomatic facade: `client.agent_sandbox.list()` / `client.agent_sandbox.load({ id })`.
  get agent_sandbox(): AgentSandboxEntity {
    return (this._agent_sandbox ??= new AgentSandboxEntity(this, undefined))
  }

  /** @deprecated Use `client.agent_sandbox` instead. */
  AgentSandbox(data?: any) {
    const self = this
    return new AgentSandboxEntity(self,data)
  }


  _agent_user_detail?: AgentUserDetailEntity

  // Idiomatic facade: `client.agent_user_detail.list()` / `client.agent_user_detail.load({ id })`.
  get agent_user_detail(): AgentUserDetailEntity {
    return (this._agent_user_detail ??= new AgentUserDetailEntity(this, undefined))
  }

  /** @deprecated Use `client.agent_user_detail` instead. */
  AgentUserDetail(data?: any) {
    const self = this
    return new AgentUserDetailEntity(self,data)
  }


  _agent_user_list?: AgentUserListEntity

  // Idiomatic facade: `client.agent_user_list.list()` / `client.agent_user_list.load({ id })`.
  get agent_user_list(): AgentUserListEntity {
    return (this._agent_user_list ??= new AgentUserListEntity(this, undefined))
  }

  /** @deprecated Use `client.agent_user_list` instead. */
  AgentUserList(data?: any) {
    const self = this
    return new AgentUserListEntity(self,data)
  }


  _app_user?: AppUserEntity

  // Idiomatic facade: `client.app_user.list()` / `client.app_user.load({ id })`.
  get app_user(): AppUserEntity {
    return (this._app_user ??= new AppUserEntity(this, undefined))
  }

  /** @deprecated Use `client.app_user` instead. */
  AppUser(data?: any) {
    const self = this
    return new AppUserEntity(self,data)
  }


  _app_user_login?: AppUserLoginEntity

  // Idiomatic facade: `client.app_user_login.list()` / `client.app_user_login.load({ id })`.
  get app_user_login(): AppUserLoginEntity {
    return (this._app_user_login ??= new AppUserLoginEntity(this, undefined))
  }

  /** @deprecated Use `client.app_user_login` instead. */
  AppUserLogin(data?: any) {
    const self = this
    return new AppUserLoginEntity(self,data)
  }


  _app_user_session?: AppUserSessionEntity

  // Idiomatic facade: `client.app_user_session.list()` / `client.app_user_session.load({ id })`.
  get app_user_session(): AppUserSessionEntity {
    return (this._app_user_session ??= new AppUserSessionEntity(this, undefined))
  }

  /** @deprecated Use `client.app_user_session` instead. */
  AppUserSession(data?: any) {
    const self = this
    return new AppUserSessionEntity(self,data)
  }


  _app_user_total?: AppUserTotalEntity

  // Idiomatic facade: `client.app_user_total.list()` / `client.app_user_total.load({ id })`.
  get app_user_total(): AppUserTotalEntity {
    return (this._app_user_total ??= new AppUserTotalEntity(this, undefined))
  }

  /** @deprecated Use `client.app_user_total` instead. */
  AppUserTotal(data?: any) {
    const self = this
    return new AppUserTotalEntity(self,data)
  }


  _app_user_verify?: AppUserVerifyEntity

  // Idiomatic facade: `client.app_user_verify.list()` / `client.app_user_verify.load({ id })`.
  get app_user_verify(): AppUserVerifyEntity {
    return (this._app_user_verify ??= new AppUserVerifyEntity(this, undefined))
  }

  /** @deprecated Use `client.app_user_verify` instead. */
  AppUserVerify(data?: any) {
    const self = this
    return new AppUserVerifyEntity(self,data)
  }


  _authentication?: AuthenticationEntity

  // Idiomatic facade: `client.authentication.list()` / `client.authentication.load({ id })`.
  get authentication(): AuthenticationEntity {
    return (this._authentication ??= new AuthenticationEntity(this, undefined))
  }

  /** @deprecated Use `client.authentication` instead. */
  Authentication(data?: any) {
    const self = this
    return new AuthenticationEntity(self,data)
  }


  _collection?: CollectionEntity

  // Idiomatic facade: `client.collection.list()` / `client.collection.load({ id })`.
  get collection(): CollectionEntity {
    return (this._collection ??= new CollectionEntity(this, undefined))
  }

  /** @deprecated Use `client.collection` instead. */
  Collection(data?: any) {
    const self = this
    return new CollectionEntity(self,data)
  }


  _collection_record?: CollectionRecordEntity

  // Idiomatic facade: `client.collection_record.list()` / `client.collection_record.load({ id })`.
  get collection_record(): CollectionRecordEntity {
    return (this._collection_record ??= new CollectionRecordEntity(this, undefined))
  }

  /** @deprecated Use `client.collection_record` instead. */
  CollectionRecord(data?: any) {
    const self = this
    return new CollectionRecordEntity(self,data)
  }


  _collection_record_list?: CollectionRecordListEntity

  // Idiomatic facade: `client.collection_record_list.list()` / `client.collection_record_list.load({ id })`.
  get collection_record_list(): CollectionRecordListEntity {
    return (this._collection_record_list ??= new CollectionRecordListEntity(this, undefined))
  }

  /** @deprecated Use `client.collection_record_list` instead. */
  CollectionRecordList(data?: any) {
    const self = this
    return new CollectionRecordListEntity(self,data)
  }


  _custom?: CustomEntity

  // Idiomatic facade: `client.custom.list()` / `client.custom.load({ id })`.
  get custom(): CustomEntity {
    return (this._custom ??= new CustomEntity(this, undefined))
  }

  /** @deprecated Use `client.custom` instead. */
  Custom(data?: any) {
    const self = this
    return new CustomEntity(self,data)
  }


  _legacy?: LegacyEntity

  // Idiomatic facade: `client.legacy.list()` / `client.legacy.load({ id })`.
  get legacy(): LegacyEntity {
    return (this._legacy ??= new LegacyEntity(this, undefined))
  }

  /** @deprecated Use `client.legacy` instead. */
  Legacy(data?: any) {
    const self = this
    return new LegacyEntity(self,data)
  }


  _legacy_mutation?: LegacyMutationEntity

  // Idiomatic facade: `client.legacy_mutation.list()` / `client.legacy_mutation.load({ id })`.
  get legacy_mutation(): LegacyMutationEntity {
    return (this._legacy_mutation ??= new LegacyMutationEntity(this, undefined))
  }

  /** @deprecated Use `client.legacy_mutation` instead. */
  LegacyMutation(data?: any) {
    const self = this
    return new LegacyMutationEntity(self,data)
  }


  _legacy_unknown?: LegacyUnknownEntity

  // Idiomatic facade: `client.legacy_unknown.list()` / `client.legacy_unknown.load({ id })`.
  get legacy_unknown(): LegacyUnknownEntity {
    return (this._legacy_unknown ??= new LegacyUnknownEntity(this, undefined))
  }

  /** @deprecated Use `client.legacy_unknown` instead. */
  LegacyUnknown(data?: any) {
    const self = this
    return new LegacyUnknownEntity(self,data)
  }


  _legacy_unknown_list?: LegacyUnknownListEntity

  // Idiomatic facade: `client.legacy_unknown_list.list()` / `client.legacy_unknown_list.load({ id })`.
  get legacy_unknown_list(): LegacyUnknownListEntity {
    return (this._legacy_unknown_list ??= new LegacyUnknownListEntity(this, undefined))
  }

  /** @deprecated Use `client.legacy_unknown_list` instead. */
  LegacyUnknownList(data?: any) {
    const self = this
    return new LegacyUnknownListEntity(self,data)
  }


  _legacy_user?: LegacyUserEntity

  // Idiomatic facade: `client.legacy_user.list()` / `client.legacy_user.load({ id })`.
  get legacy_user(): LegacyUserEntity {
    return (this._legacy_user ??= new LegacyUserEntity(this, undefined))
  }

  /** @deprecated Use `client.legacy_user` instead. */
  LegacyUser(data?: any) {
    const self = this
    return new LegacyUserEntity(self,data)
  }


  _legacy_user_list?: LegacyUserListEntity

  // Idiomatic facade: `client.legacy_user_list.list()` / `client.legacy_user_list.load({ id })`.
  get legacy_user_list(): LegacyUserListEntity {
    return (this._legacy_user_list ??= new LegacyUserListEntity(this, undefined))
  }

  /** @deprecated Use `client.legacy_user_list` instead. */
  LegacyUserList(data?: any) {
    const self = this
    return new LegacyUserListEntity(self,data)
  }


  _login?: LoginEntity

  // Idiomatic facade: `client.login.list()` / `client.login.load({ id })`.
  get login(): LoginEntity {
    return (this._login ??= new LoginEntity(this, undefined))
  }

  /** @deprecated Use `client.login` instead. */
  Login(data?: any) {
    const self = this
    return new LoginEntity(self,data)
  }


  _register?: RegisterEntity

  // Idiomatic facade: `client.register.list()` / `client.register.load({ id })`.
  get register(): RegisterEntity {
    return (this._register ??= new RegisterEntity(this, undefined))
  }

  /** @deprecated Use `client.register` instead. */
  Register(data?: any) {
    const self = this
    return new RegisterEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new HostedRestSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return HostedRestSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'HostedRest' }
  }

  toString() {
    return 'HostedRest ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = HostedRestSDK


export {
  stdutil,

  BaseFeature,
  HostedRestEntityBase,

  HostedRestSDK,
  SDK,
}


