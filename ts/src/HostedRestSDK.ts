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



  AgentHealth(data?: any) {
    const self = this
    return new AgentHealthEntity(self,data)
  }


  AgentSandbox(data?: any) {
    const self = this
    return new AgentSandboxEntity(self,data)
  }


  AgentUserDetail(data?: any) {
    const self = this
    return new AgentUserDetailEntity(self,data)
  }


  AgentUserList(data?: any) {
    const self = this
    return new AgentUserListEntity(self,data)
  }


  AppUser(data?: any) {
    const self = this
    return new AppUserEntity(self,data)
  }


  AppUserLogin(data?: any) {
    const self = this
    return new AppUserLoginEntity(self,data)
  }


  AppUserSession(data?: any) {
    const self = this
    return new AppUserSessionEntity(self,data)
  }


  AppUserTotal(data?: any) {
    const self = this
    return new AppUserTotalEntity(self,data)
  }


  AppUserVerify(data?: any) {
    const self = this
    return new AppUserVerifyEntity(self,data)
  }


  Authentication(data?: any) {
    const self = this
    return new AuthenticationEntity(self,data)
  }


  Collection(data?: any) {
    const self = this
    return new CollectionEntity(self,data)
  }


  CollectionRecord(data?: any) {
    const self = this
    return new CollectionRecordEntity(self,data)
  }


  CollectionRecordList(data?: any) {
    const self = this
    return new CollectionRecordListEntity(self,data)
  }


  Custom(data?: any) {
    const self = this
    return new CustomEntity(self,data)
  }


  Legacy(data?: any) {
    const self = this
    return new LegacyEntity(self,data)
  }


  LegacyMutation(data?: any) {
    const self = this
    return new LegacyMutationEntity(self,data)
  }


  LegacyUnknown(data?: any) {
    const self = this
    return new LegacyUnknownEntity(self,data)
  }


  LegacyUnknownList(data?: any) {
    const self = this
    return new LegacyUnknownListEntity(self,data)
  }


  LegacyUser(data?: any) {
    const self = this
    return new LegacyUserEntity(self,data)
  }


  LegacyUserList(data?: any) {
    const self = this
    return new LegacyUserListEntity(self,data)
  }


  Login(data?: any) {
    const self = this
    return new LoginEntity(self,data)
  }


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


