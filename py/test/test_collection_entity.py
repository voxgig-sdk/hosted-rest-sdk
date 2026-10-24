# Collection entity test

import json
import os
import time

import pytest

from hostedrest_sdk.utility.voxgig_struct import voxgig_struct as vs
from hostedrest_sdk import HostedRestSDK
from hostedrest_sdk.core import helpers
from hostedrest_sdk.config import shared_config
from hostedrest_sdk.feature.base_feature import HostedRestBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class _FailHook(HostedRestBaseFeature):
    def __init__(self):
        super().__init__()
        self.name = "failhook"
        self.unexpected = 0

    def init(self, ctx, options):
        pass

    def PreSpec(self, ctx):
        raise RuntimeError("collection hook failed")

    def PreUnexpected(self, ctx):
        self.unexpected += 1



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestCollectionEntity:

    def test_should_create_instance(self):
        testsdk = HostedRestSDK.test(None, None)
        ent = testsdk.Collection(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "collection": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = HostedRestSDK.test(seed, None)
        seen = list(base.Collection(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from hostedrest_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = HostedRestSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Collection(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_report_a_failed_stream(self):
        offline = {"net": {"offline": True}}
        with pytest.raises(Exception, match="offline"):
            list(HostedRestSDK.test(offline, None).Collection(None).stream("list", None, None))

        quiet = {"ctrl": {"throw": False}}
        list(HostedRestSDK.test(offline, None).Collection(None).stream("list", None, quiet))

        if "rbac" in (shared_config().get("feature") or {}):
            denied = HostedRestSDK.test(
                None, {"feature": {"rbac": {"active": True, "deny": True}}})
            with pytest.raises(Exception) as err:
                list(denied.Collection(None).stream("list", None, None))
            assert "rbac_denied" == getattr(err.value, "code", None)

    def test_should_leave_the_callers_ctrl(self):
        explain = {}
        ctrl = {"explain": explain}
        list(HostedRestSDK.test(None, None).Collection(None).stream("list", None, {"ctrl": ctrl}))
        assert ["explain"] == list(ctrl.keys())
        assert explain is ctrl["explain"] and 0 < len(explain)

    def test_should_fire_pre_unexpected(self):
        hook = _FailHook()
        client = HostedRestSDK({"feature": {"test": {"active": True}}, "extend": [hook]})
        with pytest.raises(Exception, match="hook failed"):
            client.Collection(None).list(None, None)
        assert 0 < hook.unexpected

        fired = hook.unexpected
        assert client.Collection(None).list(None, {"throw": False}) is None
        assert fired < hook.unexpected

    def test_should_validate_each_listed_record(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        opts = {"feature": {"validate": {"active": True, "request": False, "response": True}}}
        listed = HostedRestSDK.test({"entity": {"collection": {"v1": {"name": "x", "slug": "x"}}}}, opts).Collection(None).list(None, None)
        assert ["v1"] == [ent.data_get().get("id") for ent in listed]
        with pytest.raises(Exception) as err:
            HostedRestSDK.test({"entity": {"collection": {"v1": {"name": "x", "slug": "x", "created_at": 1}}}}, opts).Collection(None).list(None, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = HostedRestSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Collection(None).list({"created_at": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _collection_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "collection." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # CREATE
        collection_ref01_ent = client.Collection(None)
        collection_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.collection"), "collection_ref01"))

        collection_ref01_data = helpers.to_map(runner.entity_data(collection_ref01_ent.create(collection_ref01_data, None)))
        assert collection_ref01_data is not None
        assert collection_ref01_data["id"] is not None

        # LIST
        collection_ref01_match = {}

        collection_ref01_list_result = collection_ref01_ent.list(collection_ref01_match, None)
        assert isinstance(collection_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(collection_ref01_list_result),
            {"id": collection_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        collection_ref01_data_up0_up = {
            "id": collection_ref01_data["id"],
        }

        collection_ref01_markdef_up0_name = "created_at"
        collection_ref01_markdef_up0_value = "Mark01-collection_ref01_" + str(setup["now"])
        collection_ref01_data_up0_up[collection_ref01_markdef_up0_name] = collection_ref01_markdef_up0_value

        collection_ref01_resdata_up0 = helpers.to_map(runner.entity_data(collection_ref01_ent.update(collection_ref01_data_up0_up, None)))
        assert collection_ref01_resdata_up0 is not None
        assert collection_ref01_resdata_up0["id"] == collection_ref01_data_up0_up["id"]
        assert collection_ref01_resdata_up0[collection_ref01_markdef_up0_name] == collection_ref01_markdef_up0_value

        # LOAD
        collection_ref01_match_dt0 = {
            "id": collection_ref01_data["id"],
        }
        collection_ref01_data_dt0_loaded = collection_ref01_ent.load(collection_ref01_match_dt0, None)
        collection_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(collection_ref01_data_dt0_loaded))
        assert collection_ref01_data_dt0_load_result is not None
        assert collection_ref01_data_dt0_load_result["id"] == collection_ref01_data["id"]

        # REMOVE
        collection_ref01_match_rm0 = {
            "id": collection_ref01_data["id"],
        }
        collection_ref01_ent.remove(collection_ref01_match_rm0, None)

        # LIST
        collection_ref01_match_rt0 = {}

        collection_ref01_list_rt0_result = collection_ref01_ent.list(collection_ref01_match_rt0, None)
        assert isinstance(collection_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(collection_ref01_list_rt0_result),
            {"id": collection_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _collection_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/collection/CollectionTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HostedRestSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["collection01", "collection02", "collection03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "HOSTED_REST_TEST_COLLECTION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HOSTED_REST_TEST_COLLECTION_ENTID": idmap,
        "HOSTED_REST_TEST_LIVE": "FALSE",
        "HOSTED_REST_TEST_EXPLAIN": "FALSE",
        "HOSTED_REST_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("HOSTED_REST_TEST_COLLECTION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("HOSTED_REST_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("HOSTED_REST_APIKEY"),
            },
            extra or {},
        ])
        client = HostedRestSDK(helpers.to_map(merged_opts))

    _live = env.get("HOSTED_REST_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("HOSTED_REST_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
