# HostedRest SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import HostedRestUtility
from core.spec import HostedRestSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import HostedRestBaseFeature
from features import _make_feature


class HostedRestSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = HostedRestUtility()
        self._utility = utility

        from config import make_config
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

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
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

    def direct(self, fetchargs=None):
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


    @property
    def agent_health(self):
        """Idiomatic facade: client.agent_health.list() / client.agent_health.load({"id": ...})."""
        from entity.agent_health_entity import AgentHealthEntity
        cached = getattr(self, "_agent_health", None)
        if cached is None:
            cached = AgentHealthEntity(self, None)
            self._agent_health = cached
        return cached

    def AgentHealth(self, data=None):
        # Deprecated: use client.agent_health instead.
        from entity.agent_health_entity import AgentHealthEntity
        return AgentHealthEntity(self, data)


    @property
    def agent_sandbox(self):
        """Idiomatic facade: client.agent_sandbox.list() / client.agent_sandbox.load({"id": ...})."""
        from entity.agent_sandbox_entity import AgentSandboxEntity
        cached = getattr(self, "_agent_sandbox", None)
        if cached is None:
            cached = AgentSandboxEntity(self, None)
            self._agent_sandbox = cached
        return cached

    def AgentSandbox(self, data=None):
        # Deprecated: use client.agent_sandbox instead.
        from entity.agent_sandbox_entity import AgentSandboxEntity
        return AgentSandboxEntity(self, data)


    @property
    def agent_user_detail(self):
        """Idiomatic facade: client.agent_user_detail.list() / client.agent_user_detail.load({"id": ...})."""
        from entity.agent_user_detail_entity import AgentUserDetailEntity
        cached = getattr(self, "_agent_user_detail", None)
        if cached is None:
            cached = AgentUserDetailEntity(self, None)
            self._agent_user_detail = cached
        return cached

    def AgentUserDetail(self, data=None):
        # Deprecated: use client.agent_user_detail instead.
        from entity.agent_user_detail_entity import AgentUserDetailEntity
        return AgentUserDetailEntity(self, data)


    @property
    def agent_user_list(self):
        """Idiomatic facade: client.agent_user_list.list() / client.agent_user_list.load({"id": ...})."""
        from entity.agent_user_list_entity import AgentUserListEntity
        cached = getattr(self, "_agent_user_list", None)
        if cached is None:
            cached = AgentUserListEntity(self, None)
            self._agent_user_list = cached
        return cached

    def AgentUserList(self, data=None):
        # Deprecated: use client.agent_user_list instead.
        from entity.agent_user_list_entity import AgentUserListEntity
        return AgentUserListEntity(self, data)


    @property
    def app_user(self):
        """Idiomatic facade: client.app_user.list() / client.app_user.load({"id": ...})."""
        from entity.app_user_entity import AppUserEntity
        cached = getattr(self, "_app_user", None)
        if cached is None:
            cached = AppUserEntity(self, None)
            self._app_user = cached
        return cached

    def AppUser(self, data=None):
        # Deprecated: use client.app_user instead.
        from entity.app_user_entity import AppUserEntity
        return AppUserEntity(self, data)


    @property
    def app_user_login(self):
        """Idiomatic facade: client.app_user_login.list() / client.app_user_login.load({"id": ...})."""
        from entity.app_user_login_entity import AppUserLoginEntity
        cached = getattr(self, "_app_user_login", None)
        if cached is None:
            cached = AppUserLoginEntity(self, None)
            self._app_user_login = cached
        return cached

    def AppUserLogin(self, data=None):
        # Deprecated: use client.app_user_login instead.
        from entity.app_user_login_entity import AppUserLoginEntity
        return AppUserLoginEntity(self, data)


    @property
    def app_user_session(self):
        """Idiomatic facade: client.app_user_session.list() / client.app_user_session.load({"id": ...})."""
        from entity.app_user_session_entity import AppUserSessionEntity
        cached = getattr(self, "_app_user_session", None)
        if cached is None:
            cached = AppUserSessionEntity(self, None)
            self._app_user_session = cached
        return cached

    def AppUserSession(self, data=None):
        # Deprecated: use client.app_user_session instead.
        from entity.app_user_session_entity import AppUserSessionEntity
        return AppUserSessionEntity(self, data)


    @property
    def app_user_total(self):
        """Idiomatic facade: client.app_user_total.list() / client.app_user_total.load({"id": ...})."""
        from entity.app_user_total_entity import AppUserTotalEntity
        cached = getattr(self, "_app_user_total", None)
        if cached is None:
            cached = AppUserTotalEntity(self, None)
            self._app_user_total = cached
        return cached

    def AppUserTotal(self, data=None):
        # Deprecated: use client.app_user_total instead.
        from entity.app_user_total_entity import AppUserTotalEntity
        return AppUserTotalEntity(self, data)


    @property
    def app_user_verify(self):
        """Idiomatic facade: client.app_user_verify.list() / client.app_user_verify.load({"id": ...})."""
        from entity.app_user_verify_entity import AppUserVerifyEntity
        cached = getattr(self, "_app_user_verify", None)
        if cached is None:
            cached = AppUserVerifyEntity(self, None)
            self._app_user_verify = cached
        return cached

    def AppUserVerify(self, data=None):
        # Deprecated: use client.app_user_verify instead.
        from entity.app_user_verify_entity import AppUserVerifyEntity
        return AppUserVerifyEntity(self, data)


    @property
    def authentication(self):
        """Idiomatic facade: client.authentication.list() / client.authentication.load({"id": ...})."""
        from entity.authentication_entity import AuthenticationEntity
        cached = getattr(self, "_authentication", None)
        if cached is None:
            cached = AuthenticationEntity(self, None)
            self._authentication = cached
        return cached

    def Authentication(self, data=None):
        # Deprecated: use client.authentication instead.
        from entity.authentication_entity import AuthenticationEntity
        return AuthenticationEntity(self, data)


    @property
    def collection(self):
        """Idiomatic facade: client.collection.list() / client.collection.load({"id": ...})."""
        from entity.collection_entity import CollectionEntity
        cached = getattr(self, "_collection", None)
        if cached is None:
            cached = CollectionEntity(self, None)
            self._collection = cached
        return cached

    def Collection(self, data=None):
        # Deprecated: use client.collection instead.
        from entity.collection_entity import CollectionEntity
        return CollectionEntity(self, data)


    @property
    def collection_record(self):
        """Idiomatic facade: client.collection_record.list() / client.collection_record.load({"id": ...})."""
        from entity.collection_record_entity import CollectionRecordEntity
        cached = getattr(self, "_collection_record", None)
        if cached is None:
            cached = CollectionRecordEntity(self, None)
            self._collection_record = cached
        return cached

    def CollectionRecord(self, data=None):
        # Deprecated: use client.collection_record instead.
        from entity.collection_record_entity import CollectionRecordEntity
        return CollectionRecordEntity(self, data)


    @property
    def collection_record_list(self):
        """Idiomatic facade: client.collection_record_list.list() / client.collection_record_list.load({"id": ...})."""
        from entity.collection_record_list_entity import CollectionRecordListEntity
        cached = getattr(self, "_collection_record_list", None)
        if cached is None:
            cached = CollectionRecordListEntity(self, None)
            self._collection_record_list = cached
        return cached

    def CollectionRecordList(self, data=None):
        # Deprecated: use client.collection_record_list instead.
        from entity.collection_record_list_entity import CollectionRecordListEntity
        return CollectionRecordListEntity(self, data)


    @property
    def custom(self):
        """Idiomatic facade: client.custom.list() / client.custom.load({"id": ...})."""
        from entity.custom_entity import CustomEntity
        cached = getattr(self, "_custom", None)
        if cached is None:
            cached = CustomEntity(self, None)
            self._custom = cached
        return cached

    def Custom(self, data=None):
        # Deprecated: use client.custom instead.
        from entity.custom_entity import CustomEntity
        return CustomEntity(self, data)


    @property
    def legacy(self):
        """Idiomatic facade: client.legacy.list() / client.legacy.load({"id": ...})."""
        from entity.legacy_entity import LegacyEntity
        cached = getattr(self, "_legacy", None)
        if cached is None:
            cached = LegacyEntity(self, None)
            self._legacy = cached
        return cached

    def Legacy(self, data=None):
        # Deprecated: use client.legacy instead.
        from entity.legacy_entity import LegacyEntity
        return LegacyEntity(self, data)


    @property
    def legacy_mutation(self):
        """Idiomatic facade: client.legacy_mutation.list() / client.legacy_mutation.load({"id": ...})."""
        from entity.legacy_mutation_entity import LegacyMutationEntity
        cached = getattr(self, "_legacy_mutation", None)
        if cached is None:
            cached = LegacyMutationEntity(self, None)
            self._legacy_mutation = cached
        return cached

    def LegacyMutation(self, data=None):
        # Deprecated: use client.legacy_mutation instead.
        from entity.legacy_mutation_entity import LegacyMutationEntity
        return LegacyMutationEntity(self, data)


    @property
    def legacy_unknown(self):
        """Idiomatic facade: client.legacy_unknown.list() / client.legacy_unknown.load({"id": ...})."""
        from entity.legacy_unknown_entity import LegacyUnknownEntity
        cached = getattr(self, "_legacy_unknown", None)
        if cached is None:
            cached = LegacyUnknownEntity(self, None)
            self._legacy_unknown = cached
        return cached

    def LegacyUnknown(self, data=None):
        # Deprecated: use client.legacy_unknown instead.
        from entity.legacy_unknown_entity import LegacyUnknownEntity
        return LegacyUnknownEntity(self, data)


    @property
    def legacy_unknown_list(self):
        """Idiomatic facade: client.legacy_unknown_list.list() / client.legacy_unknown_list.load({"id": ...})."""
        from entity.legacy_unknown_list_entity import LegacyUnknownListEntity
        cached = getattr(self, "_legacy_unknown_list", None)
        if cached is None:
            cached = LegacyUnknownListEntity(self, None)
            self._legacy_unknown_list = cached
        return cached

    def LegacyUnknownList(self, data=None):
        # Deprecated: use client.legacy_unknown_list instead.
        from entity.legacy_unknown_list_entity import LegacyUnknownListEntity
        return LegacyUnknownListEntity(self, data)


    @property
    def legacy_user(self):
        """Idiomatic facade: client.legacy_user.list() / client.legacy_user.load({"id": ...})."""
        from entity.legacy_user_entity import LegacyUserEntity
        cached = getattr(self, "_legacy_user", None)
        if cached is None:
            cached = LegacyUserEntity(self, None)
            self._legacy_user = cached
        return cached

    def LegacyUser(self, data=None):
        # Deprecated: use client.legacy_user instead.
        from entity.legacy_user_entity import LegacyUserEntity
        return LegacyUserEntity(self, data)


    @property
    def legacy_user_list(self):
        """Idiomatic facade: client.legacy_user_list.list() / client.legacy_user_list.load({"id": ...})."""
        from entity.legacy_user_list_entity import LegacyUserListEntity
        cached = getattr(self, "_legacy_user_list", None)
        if cached is None:
            cached = LegacyUserListEntity(self, None)
            self._legacy_user_list = cached
        return cached

    def LegacyUserList(self, data=None):
        # Deprecated: use client.legacy_user_list instead.
        from entity.legacy_user_list_entity import LegacyUserListEntity
        return LegacyUserListEntity(self, data)


    @property
    def login(self):
        """Idiomatic facade: client.login.list() / client.login.load({"id": ...})."""
        from entity.login_entity import LoginEntity
        cached = getattr(self, "_login", None)
        if cached is None:
            cached = LoginEntity(self, None)
            self._login = cached
        return cached

    def Login(self, data=None):
        # Deprecated: use client.login instead.
        from entity.login_entity import LoginEntity
        return LoginEntity(self, data)


    @property
    def register(self):
        """Idiomatic facade: client.register.list() / client.register.load({"id": ...})."""
        from entity.register_entity import RegisterEntity
        cached = getattr(self, "_register", None)
        if cached is None:
            cached = RegisterEntity(self, None)
            self._register = cached
        return cached

    def Register(self, data=None):
        # Deprecated: use client.register instead.
        from entity.register_entity import RegisterEntity
        return RegisterEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
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
