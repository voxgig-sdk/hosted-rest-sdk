# CollectionRecord entity test

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



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestCollectionRecordEntity:

    def test_should_create_instance(self):
        testsdk = HostedRestSDK.test(None, None)
        ent = testsdk.CollectionRecord(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = HostedRestSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.CollectionRecord(None).list({"slug": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _collection_record_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "collection_record." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["slug01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via HOSTED_REST_TEST_COLLECTION_RECORD_ENTID")
        client = setup["client"]

        # CREATE
        collection_record_ref01_ent = client.CollectionRecord(None)
        collection_record_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.collection_record"), "collection_record_ref01"))
        collection_record_ref01_data["slug"] = setup["idmap"]["slug01"]

        collection_record_ref01_data = helpers.to_map(runner.entity_data(collection_record_ref01_ent.create(collection_record_ref01_data, None)))
        assert collection_record_ref01_data is not None
        assert collection_record_ref01_data["id"] is not None

        # LIST
        collection_record_ref01_match = {
            "slug": setup["idmap"]["slug01"],
        }

        collection_record_ref01_list_result = collection_record_ref01_ent.list(collection_record_ref01_match, None)
        assert isinstance(collection_record_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(collection_record_ref01_list_result),
            {"id": collection_record_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        collection_record_ref01_data_up0_up = {
            "id": collection_record_ref01_data["id"],
            "slug": setup["idmap"]["slug"],
        }

        collection_record_ref01_markdef_up0_name = "app_user_id"
        collection_record_ref01_markdef_up0_value = "Mark01-collection_record_ref01_" + str(setup["now"])
        collection_record_ref01_data_up0_up[collection_record_ref01_markdef_up0_name] = collection_record_ref01_markdef_up0_value

        collection_record_ref01_resdata_up0 = helpers.to_map(runner.entity_data(collection_record_ref01_ent.update(collection_record_ref01_data_up0_up, None)))
        assert collection_record_ref01_resdata_up0 is not None
        assert collection_record_ref01_resdata_up0["id"] == collection_record_ref01_data_up0_up["id"]
        assert collection_record_ref01_resdata_up0[collection_record_ref01_markdef_up0_name] == collection_record_ref01_markdef_up0_value

        # LOAD
        collection_record_ref01_match_dt0 = {
            "id": collection_record_ref01_data["id"],
        }
        collection_record_ref01_match_dt0["slug"] = setup["idmap"].get("slug") or setup["idmap"].get("slug01")
        collection_record_ref01_data_dt0_loaded = collection_record_ref01_ent.load(collection_record_ref01_match_dt0, None)
        collection_record_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(collection_record_ref01_data_dt0_loaded))
        assert collection_record_ref01_data_dt0_load_result is not None
        assert collection_record_ref01_data_dt0_load_result["id"] == collection_record_ref01_data["id"]

        # REMOVE
        collection_record_ref01_match_rm0 = {
            "id": collection_record_ref01_data["id"],
        }
        collection_record_ref01_match_rm0["slug"] = setup["idmap"].get("slug") or setup["idmap"].get("slug01")
        collection_record_ref01_ent.remove(collection_record_ref01_match_rm0, None)

        # LIST
        collection_record_ref01_match_rt0 = {
            "slug": setup["idmap"]["slug01"],
        }

        collection_record_ref01_list_rt0_result = collection_record_ref01_ent.list(collection_record_ref01_match_rt0, None)
        assert isinstance(collection_record_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(collection_record_ref01_list_rt0_result),
            {"id": collection_record_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _collection_record_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/collection_record/CollectionRecordTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HostedRestSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["collection_record01", "collection_record02", "collection_record03", "collection01", "collection02", "collection03", "slug01"],
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
        "HOSTED_REST_TEST_COLLECTION_RECORD_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HOSTED_REST_TEST_COLLECTION_RECORD_ENTID": idmap,
        "HOSTED_REST_TEST_LIVE": "FALSE",
        "HOSTED_REST_TEST_EXPLAIN": "FALSE",
        "HOSTED_REST_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("HOSTED_REST_TEST_COLLECTION_RECORD_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("slug") is None:
        idmap_resolved["slug"] = idmap_resolved.get("slug01")

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
