# Custom entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from hostedrest_sdk import HostedRestSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestCustomEntity:

    def test_should_create_instance(self):
        testsdk = HostedRestSDK.test(None, None)
        ent = testsdk.Custom(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _custom_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "custom." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set HOSTEDREST_TEST_CUSTOM_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        custom_ref01_ent = client.Custom(None)
        custom_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.custom"), "custom_ref01"))
        custom_ref01_data["path"] = setup["idmap"]["path01"]

        custom_ref01_data_result, err = custom_ref01_ent.create(custom_ref01_data, None)
        assert err is None
        custom_ref01_data = helpers.to_map(custom_ref01_data_result)
        assert custom_ref01_data is not None

        # UPDATE
        custom_ref01_data_up0_up = {
        }

        custom_ref01_resdata_up0_result, err = custom_ref01_ent.update(custom_ref01_data_up0_up, None)
        assert err is None
        custom_ref01_resdata_up0 = helpers.to_map(custom_ref01_resdata_up0_result)
        assert custom_ref01_resdata_up0 is not None

        # LOAD
        custom_ref01_match_dt0 = {}
        custom_ref01_data_dt0_loaded, err = custom_ref01_ent.load(custom_ref01_match_dt0, None)
        assert err is None
        assert custom_ref01_data_dt0_loaded is not None

        # REMOVE
        custom_ref01_match_rm0 = {
            "id": custom_ref01_data["id"],
        }
        _, err = custom_ref01_ent.remove(custom_ref01_match_rm0, None)
        assert err is None



def _custom_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/custom/CustomTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HostedRestSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["custom01", "custom02", "custom03", "path01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "HOSTEDREST_TEST_CUSTOM_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HOSTEDREST_TEST_CUSTOM_ENTID": idmap,
        "HOSTEDREST_TEST_LIVE": "FALSE",
        "HOSTEDREST_TEST_EXPLAIN": "FALSE",
        "HOSTEDREST_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("HOSTEDREST_TEST_CUSTOM_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("HOSTEDREST_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("HOSTEDREST_APIKEY"),
            },
            extra or {},
        ])
        client = HostedRestSDK(helpers.to_map(merged_opts))

    _live = env.get("HOSTEDREST_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("HOSTEDREST_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
