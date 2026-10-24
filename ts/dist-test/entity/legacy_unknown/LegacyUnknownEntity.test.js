"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('LegacyUnknownEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOSTED_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HostedRestSDK.test();
        const ent = testsdk.LegacyUnknown();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('legacy_unknown hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HostedRestSDK.test(offline).LegacyUnknown().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HostedRestSDK.test(offline).LegacyUnknown()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HostedRestSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.LegacyUnknown().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HostedRestSDK.test().LegacyUnknown().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HostedRestSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.LegacyUnknown().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.LegacyUnknown().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HostedRestSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.LegacyUnknown().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'legacy_unknown.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "color": { "a": true, "h": "Color", "n": "color", "r": true, "t": "`$STRING`", "key$": "color", "index$": 0 }, "data": { "a": true, "h": "Data", "n": "data", "r": true, "t": "`$OBJECT`", "key$": "data", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 3 }, "pantone_value": { "a": true, "h": "Pantone Value", "n": "pantone_value", "r": true, "t": "`$STRING`", "key$": "pantone_value", "index$": 4 }, "support": { "a": true, "h": "Support", "n": "support", "r": false, "t": "`$OBJECT`", "key$": "support", "index$": 5 }, "year": { "a": true, "h": "Year", "n": "year", "r": true, "t": "`$INTEGER`", "key$": "year", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "legacy_unknown", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/unknown", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/unknown", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "unknown" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/unknown/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/unknown/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "unknown" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "legacy_unknown", "name__orig": "legacy_unknown", "Name": "LegacyUnknown", "name_": "legacy_unknown", "name-": "legacy-unknown", "NAME": "LEGACY_UNKNOWN", "index$": 13 }, { "active": true, "entity": "legacy_unknown", "key$": "BasicLegacyUnknownFlow", "kind": "basic", "name": "BasicLegacyUnknownFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "legacy_unknown_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "legacy_unknown_ref01", "srcdatavar": "legacy_unknown_ref01_data", "suffix": "_dt0" }, "m": { "id": "legacy_unknown01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-legacy_unknown_ref01" } }], "index$": 1 }] }, 'LegacyUnknown', { "GET /api/unknown": { "protocol": "http", "parameters": [{ "name": "page", "in": "query", "description": "Page number for pagination.", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 0 }, { "name": "per_page", "in": "query", "description": "Number of items per page.", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "index$": 1 }] }, "GET /api/unknown/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "Resource id.", "required": true, "schema": { "type": "integer", "minimum": 1 }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let legacy_unknown_ref01_data = Object.values(setup.data.existing.legacy_unknown)[0];
        // LIST
        const legacy_unknown_ref01_ent = client.LegacyUnknown();
        const legacy_unknown_ref01_match = {};
        const legacy_unknown_ref01_list = (await legacy_unknown_ref01_ent.list(legacy_unknown_ref01_match)).map((e) => e.data());
        // LOAD
        const legacy_unknown_ref01_match_dt0 = {};
        legacy_unknown_ref01_match_dt0.id = legacy_unknown_ref01_data.id;
        const legacy_unknown_ref01_data_dt0 = (await legacy_unknown_ref01_ent.load(legacy_unknown_ref01_match_dt0)).data();
        (0, node_assert_1.default)(legacy_unknown_ref01_data_dt0.id === legacy_unknown_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/legacy_unknown/LegacyUnknownTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HostedRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['legacy_unknown01', 'legacy_unknown02', 'legacy_unknown03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOSTED_REST_TEST_LEGACY_UNKNOWN_ENTID': idmap,
        'HOSTED_REST_TEST_LIVE': 'FALSE',
        'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
        'HOSTED_REST_APIKEY': '',
    });
    idmap = env['HOSTED_REST_TEST_LEGACY_UNKNOWN_ENTID'];
    const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOSTED_REST_TEST_LEGACY_UNKNOWN_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HostedRestSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=LegacyUnknownEntity.test.js.map