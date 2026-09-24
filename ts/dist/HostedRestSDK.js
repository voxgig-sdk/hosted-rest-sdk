"use strict";
// HostedRest Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.HostedRestSDK = exports.HostedRestEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AgentHealthEntity_1 = require("./entity/AgentHealthEntity");
const AgentSandboxEntity_1 = require("./entity/AgentSandboxEntity");
const AgentUserEntity_1 = require("./entity/AgentUserEntity");
const AgentUserListEntity_1 = require("./entity/AgentUserListEntity");
const AppUserEntity_1 = require("./entity/AppUserEntity");
const AppUserLoginEntity_1 = require("./entity/AppUserLoginEntity");
const AppUserSessionEntity_1 = require("./entity/AppUserSessionEntity");
const AppUserTotalEntity_1 = require("./entity/AppUserTotalEntity");
const AppUserVerifyEntity_1 = require("./entity/AppUserVerifyEntity");
const AuthenticationEntity_1 = require("./entity/AuthenticationEntity");
const CollectionEntity_1 = require("./entity/CollectionEntity");
const CollectionRecordEntity_1 = require("./entity/CollectionRecordEntity");
const CollectionRecordListEntity_1 = require("./entity/CollectionRecordListEntity");
const CustomEntity_1 = require("./entity/CustomEntity");
const LegacyEntity_1 = require("./entity/LegacyEntity");
const LegacyMutationEntity_1 = require("./entity/LegacyMutationEntity");
const LegacyUnknownEntity_1 = require("./entity/LegacyUnknownEntity");
const LegacyUnknownListEntity_1 = require("./entity/LegacyUnknownListEntity");
const LegacyUserEntity_1 = require("./entity/LegacyUserEntity");
const LegacyUserListEntity_1 = require("./entity/LegacyUserListEntity");
const LoginEntity_1 = require("./entity/LoginEntity");
const RegisterEntity_1 = require("./entity/RegisterEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const HostedRestEntityBase_1 = require("./HostedRestEntityBase");
Object.defineProperty(exports, "HostedRestEntityBase", { enumerable: true, get: function () { return HostedRestEntityBase_1.HostedRestEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class HostedRestSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const spec = {
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
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('HostedRestSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('HostedRestSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('HostedRestSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.AgentHealth().list()` / `client.AgentHealth().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentHealth(entopts) {
        const self = this;
        return new AgentHealthEntity_1.AgentHealthEntity(self, entopts);
    }
    // Entity access: `client.AgentSandbox().list()` / `client.AgentSandbox().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSandbox(entopts) {
        const self = this;
        return new AgentSandboxEntity_1.AgentSandboxEntity(self, entopts);
    }
    // Entity access: `client.AgentUser().list()` / `client.AgentUser().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentUser(entopts) {
        const self = this;
        return new AgentUserEntity_1.AgentUserEntity(self, entopts);
    }
    // Entity access: `client.AgentUserList().list()` / `client.AgentUserList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentUserList(entopts) {
        const self = this;
        return new AgentUserListEntity_1.AgentUserListEntity(self, entopts);
    }
    // Entity access: `client.AppUser().list()` / `client.AppUser().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppUser(entopts) {
        const self = this;
        return new AppUserEntity_1.AppUserEntity(self, entopts);
    }
    // Entity access: `client.AppUserLogin().list()` / `client.AppUserLogin().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppUserLogin(entopts) {
        const self = this;
        return new AppUserLoginEntity_1.AppUserLoginEntity(self, entopts);
    }
    // Entity access: `client.AppUserSession().list()` / `client.AppUserSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppUserSession(entopts) {
        const self = this;
        return new AppUserSessionEntity_1.AppUserSessionEntity(self, entopts);
    }
    // Entity access: `client.AppUserTotal().list()` / `client.AppUserTotal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppUserTotal(entopts) {
        const self = this;
        return new AppUserTotalEntity_1.AppUserTotalEntity(self, entopts);
    }
    // Entity access: `client.AppUserVerify().list()` / `client.AppUserVerify().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppUserVerify(entopts) {
        const self = this;
        return new AppUserVerifyEntity_1.AppUserVerifyEntity(self, entopts);
    }
    // Entity access: `client.Authentication().list()` / `client.Authentication().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Authentication(entopts) {
        const self = this;
        return new AuthenticationEntity_1.AuthenticationEntity(self, entopts);
    }
    // Entity access: `client.Collection().list()` / `client.Collection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Collection(entopts) {
        const self = this;
        return new CollectionEntity_1.CollectionEntity(self, entopts);
    }
    // Entity access: `client.CollectionRecord().list()` / `client.CollectionRecord().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CollectionRecord(entopts) {
        const self = this;
        return new CollectionRecordEntity_1.CollectionRecordEntity(self, entopts);
    }
    // Entity access: `client.CollectionRecordList().list()` / `client.CollectionRecordList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CollectionRecordList(entopts) {
        const self = this;
        return new CollectionRecordListEntity_1.CollectionRecordListEntity(self, entopts);
    }
    // Entity access: `client.Custom().list()` / `client.Custom().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Custom(entopts) {
        const self = this;
        return new CustomEntity_1.CustomEntity(self, entopts);
    }
    // Entity access: `client.Legacy().list()` / `client.Legacy().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Legacy(entopts) {
        const self = this;
        return new LegacyEntity_1.LegacyEntity(self, entopts);
    }
    // Entity access: `client.LegacyMutation().list()` / `client.LegacyMutation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LegacyMutation(entopts) {
        const self = this;
        return new LegacyMutationEntity_1.LegacyMutationEntity(self, entopts);
    }
    // Entity access: `client.LegacyUnknown().list()` / `client.LegacyUnknown().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LegacyUnknown(entopts) {
        const self = this;
        return new LegacyUnknownEntity_1.LegacyUnknownEntity(self, entopts);
    }
    // Entity access: `client.LegacyUnknownList().list()` / `client.LegacyUnknownList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LegacyUnknownList(entopts) {
        const self = this;
        return new LegacyUnknownListEntity_1.LegacyUnknownListEntity(self, entopts);
    }
    // Entity access: `client.LegacyUser().list()` / `client.LegacyUser().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LegacyUser(entopts) {
        const self = this;
        return new LegacyUserEntity_1.LegacyUserEntity(self, entopts);
    }
    // Entity access: `client.LegacyUserList().list()` / `client.LegacyUserList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LegacyUserList(entopts) {
        const self = this;
        return new LegacyUserListEntity_1.LegacyUserListEntity(self, entopts);
    }
    // Entity access: `client.Login().list()` / `client.Login().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Login(entopts) {
        const self = this;
        return new LoginEntity_1.LoginEntity(self, entopts);
    }
    // Entity access: `client.Register().list()` / `client.Register().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Register(entopts) {
        const self = this;
        return new RegisterEntity_1.RegisterEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new HostedRestSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return HostedRestSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'HostedRest' };
    }
    toString() {
        return 'HostedRest ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.HostedRestSDK = HostedRestSDK;
const SDK = HostedRestSDK;
exports.SDK = SDK;
//# sourceMappingURL=HostedRestSDK.js.map