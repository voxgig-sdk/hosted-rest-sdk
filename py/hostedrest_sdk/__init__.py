# HostedRest SDK

from hostedrest_sdk.utility.voxgig_struct import voxgig_struct as vs
from hostedrest_sdk.core.utility_type import HostedRestUtility
from hostedrest_sdk.core.spec import HostedRestSpec
from hostedrest_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from hostedrest_sdk.utility import register

# Load features
from hostedrest_sdk.feature.base_feature import HostedRestBaseFeature
from hostedrest_sdk.features import _make_feature


class HostedRestSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = HostedRestUtility()
        self._utility = utility

        from hostedrest_sdk.config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return HostedRestUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = HostedRestSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return isinstance(allow_op, str) and op in allow_op

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "HostedRestSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("HostedRestSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def AgentHealth(self, data=None) -> "AgentHealthEntity":
        """Entity factory: client.AgentHealth().list() / client.AgentHealth().load({"id": ...})."""
        from hostedrest_sdk.entity.agent_health_entity import AgentHealthEntity
        return AgentHealthEntity(self, data)


    def AgentSandbox(self, data=None) -> "AgentSandboxEntity":
        """Entity factory: client.AgentSandbox().list() / client.AgentSandbox().load({"id": ...})."""
        from hostedrest_sdk.entity.agent_sandbox_entity import AgentSandboxEntity
        return AgentSandboxEntity(self, data)


    def AgentUserDetail(self, data=None) -> "AgentUserDetailEntity":
        """Entity factory: client.AgentUserDetail().list() / client.AgentUserDetail().load({"id": ...})."""
        from hostedrest_sdk.entity.agent_user_detail_entity import AgentUserDetailEntity
        return AgentUserDetailEntity(self, data)


    def AgentUserList(self, data=None) -> "AgentUserListEntity":
        """Entity factory: client.AgentUserList().list() / client.AgentUserList().load({"id": ...})."""
        from hostedrest_sdk.entity.agent_user_list_entity import AgentUserListEntity
        return AgentUserListEntity(self, data)


    def AppUser(self, data=None) -> "AppUserEntity":
        """Entity factory: client.AppUser().list() / client.AppUser().load({"id": ...})."""
        from hostedrest_sdk.entity.app_user_entity import AppUserEntity
        return AppUserEntity(self, data)


    def AppUserLogin(self, data=None) -> "AppUserLoginEntity":
        """Entity factory: client.AppUserLogin().list() / client.AppUserLogin().load({"id": ...})."""
        from hostedrest_sdk.entity.app_user_login_entity import AppUserLoginEntity
        return AppUserLoginEntity(self, data)


    def AppUserSession(self, data=None) -> "AppUserSessionEntity":
        """Entity factory: client.AppUserSession().list() / client.AppUserSession().load({"id": ...})."""
        from hostedrest_sdk.entity.app_user_session_entity import AppUserSessionEntity
        return AppUserSessionEntity(self, data)


    def AppUserTotal(self, data=None) -> "AppUserTotalEntity":
        """Entity factory: client.AppUserTotal().list() / client.AppUserTotal().load({"id": ...})."""
        from hostedrest_sdk.entity.app_user_total_entity import AppUserTotalEntity
        return AppUserTotalEntity(self, data)


    def AppUserVerify(self, data=None) -> "AppUserVerifyEntity":
        """Entity factory: client.AppUserVerify().list() / client.AppUserVerify().load({"id": ...})."""
        from hostedrest_sdk.entity.app_user_verify_entity import AppUserVerifyEntity
        return AppUserVerifyEntity(self, data)


    def Authentication(self, data=None) -> "AuthenticationEntity":
        """Entity factory: client.Authentication().list() / client.Authentication().load({"id": ...})."""
        from hostedrest_sdk.entity.authentication_entity import AuthenticationEntity
        return AuthenticationEntity(self, data)


    def Collection(self, data=None) -> "CollectionEntity":
        """Entity factory: client.Collection().list() / client.Collection().load({"id": ...})."""
        from hostedrest_sdk.entity.collection_entity import CollectionEntity
        return CollectionEntity(self, data)


    def CollectionRecord(self, data=None) -> "CollectionRecordEntity":
        """Entity factory: client.CollectionRecord().list() / client.CollectionRecord().load({"id": ...})."""
        from hostedrest_sdk.entity.collection_record_entity import CollectionRecordEntity
        return CollectionRecordEntity(self, data)


    def CollectionRecordList(self, data=None) -> "CollectionRecordListEntity":
        """Entity factory: client.CollectionRecordList().list() / client.CollectionRecordList().load({"id": ...})."""
        from hostedrest_sdk.entity.collection_record_list_entity import CollectionRecordListEntity
        return CollectionRecordListEntity(self, data)


    def Custom(self, data=None) -> "CustomEntity":
        """Entity factory: client.Custom().list() / client.Custom().load({"id": ...})."""
        from hostedrest_sdk.entity.custom_entity import CustomEntity
        return CustomEntity(self, data)


    def Legacy(self, data=None) -> "LegacyEntity":
        """Entity factory: client.Legacy().list() / client.Legacy().load({"id": ...})."""
        from hostedrest_sdk.entity.legacy_entity import LegacyEntity
        return LegacyEntity(self, data)


    def LegacyMutation(self, data=None) -> "LegacyMutationEntity":
        """Entity factory: client.LegacyMutation().list() / client.LegacyMutation().load({"id": ...})."""
        from hostedrest_sdk.entity.legacy_mutation_entity import LegacyMutationEntity
        return LegacyMutationEntity(self, data)


    def LegacyUnknown(self, data=None) -> "LegacyUnknownEntity":
        """Entity factory: client.LegacyUnknown().list() / client.LegacyUnknown().load({"id": ...})."""
        from hostedrest_sdk.entity.legacy_unknown_entity import LegacyUnknownEntity
        return LegacyUnknownEntity(self, data)


    def LegacyUnknownList(self, data=None) -> "LegacyUnknownListEntity":
        """Entity factory: client.LegacyUnknownList().list() / client.LegacyUnknownList().load({"id": ...})."""
        from hostedrest_sdk.entity.legacy_unknown_list_entity import LegacyUnknownListEntity
        return LegacyUnknownListEntity(self, data)


    def LegacyUser(self, data=None) -> "LegacyUserEntity":
        """Entity factory: client.LegacyUser().list() / client.LegacyUser().load({"id": ...})."""
        from hostedrest_sdk.entity.legacy_user_entity import LegacyUserEntity
        return LegacyUserEntity(self, data)


    def LegacyUserList(self, data=None) -> "LegacyUserListEntity":
        """Entity factory: client.LegacyUserList().list() / client.LegacyUserList().load({"id": ...})."""
        from hostedrest_sdk.entity.legacy_user_list_entity import LegacyUserListEntity
        return LegacyUserListEntity(self, data)


    def Login(self, data=None) -> "LoginEntity":
        """Entity factory: client.Login().list() / client.Login().load({"id": ...})."""
        from hostedrest_sdk.entity.login_entity import LoginEntity
        return LoginEntity(self, data)


    def Register(self, data=None) -> "RegisterEntity":
        """Entity factory: client.Register().list() / client.Register().load({"id": ...})."""
        from hostedrest_sdk.entity.register_entity import RegisterEntity
        return RegisterEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "HostedRestSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from hostedrest_sdk.entity.agent_health_entity import AgentHealthEntity
    from hostedrest_sdk.entity.agent_sandbox_entity import AgentSandboxEntity
    from hostedrest_sdk.entity.agent_user_detail_entity import AgentUserDetailEntity
    from hostedrest_sdk.entity.agent_user_list_entity import AgentUserListEntity
    from hostedrest_sdk.entity.app_user_entity import AppUserEntity
    from hostedrest_sdk.entity.app_user_login_entity import AppUserLoginEntity
    from hostedrest_sdk.entity.app_user_session_entity import AppUserSessionEntity
    from hostedrest_sdk.entity.app_user_total_entity import AppUserTotalEntity
    from hostedrest_sdk.entity.app_user_verify_entity import AppUserVerifyEntity
    from hostedrest_sdk.entity.authentication_entity import AuthenticationEntity
    from hostedrest_sdk.entity.collection_entity import CollectionEntity
    from hostedrest_sdk.entity.collection_record_entity import CollectionRecordEntity
    from hostedrest_sdk.entity.collection_record_list_entity import CollectionRecordListEntity
    from hostedrest_sdk.entity.custom_entity import CustomEntity
    from hostedrest_sdk.entity.legacy_entity import LegacyEntity
    from hostedrest_sdk.entity.legacy_mutation_entity import LegacyMutationEntity
    from hostedrest_sdk.entity.legacy_unknown_entity import LegacyUnknownEntity
    from hostedrest_sdk.entity.legacy_unknown_list_entity import LegacyUnknownListEntity
    from hostedrest_sdk.entity.legacy_user_entity import LegacyUserEntity
    from hostedrest_sdk.entity.legacy_user_list_entity import LegacyUserListEntity
    from hostedrest_sdk.entity.login_entity import LoginEntity
    from hostedrest_sdk.entity.register_entity import RegisterEntity
