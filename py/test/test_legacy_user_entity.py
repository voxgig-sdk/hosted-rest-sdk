# LegacyUser entity test

import json
import os
import time

import pytest

from hostedrest_sdk.utility.voxgig_struct import voxgig_struct as vs
from hostedrest_sdk import HostedRestSDK
from hostedrest_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestLegacyUserEntity:

    def test_should_create_instance(self):
        testsdk = HostedRestSDK.test(None, None)
        ent = testsdk.LegacyUser(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _legacy_user_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "legacy_user." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set HOSTED_REST_TEST_LEGACY_USER_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        legacy_user_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.legacy_user")))
        legacy_user_ref01_data = None
        if len(legacy_user_ref01_data_raw) > 0:
            legacy_user_ref01_data = helpers.to_map(legacy_user_ref01_data_raw[0][1])

        # LOAD
        legacy_user_ref01_ent = client.LegacyUser(None)
        legacy_user_ref01_match_dt0 = {
            "id": legacy_user_ref01_data["id"],
        }
        legacy_user_ref01_data_dt0_loaded = legacy_user_ref01_ent.load(legacy_user_ref01_match_dt0, None)
        legacy_user_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(legacy_user_ref01_data_dt0_loaded))
        assert legacy_user_ref01_data_dt0_load_result is not None
        assert legacy_user_ref01_data_dt0_load_result["id"] == legacy_user_ref01_data["id"]



def _legacy_user_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/legacy_user/LegacyUserTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HostedRestSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["legacy_user01", "legacy_user02", "legacy_user03"],
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
        "HOSTED_REST_TEST_LEGACY_USER_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HOSTED_REST_TEST_LEGACY_USER_ENTID": idmap,
        "HOSTED_REST_TEST_LIVE": "FALSE",
        "HOSTED_REST_TEST_EXPLAIN": "FALSE",
        "HOSTED_REST_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("HOSTED_REST_TEST_LEGACY_USER_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("HOSTED_REST_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
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
