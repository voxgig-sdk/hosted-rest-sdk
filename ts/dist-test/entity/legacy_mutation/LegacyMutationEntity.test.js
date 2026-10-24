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
(0, node_test_1.describe)('LegacyMutationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOSTED_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HostedRestSDK.test();
        const ent = testsdk.LegacyMutation();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('legacy_mutation hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HostedRestSDK.test(offline).LegacyMutation().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HostedRestSDK.test(offline).LegacyMutation()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HostedRestSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.LegacyMutation().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HostedRestSDK.test().LegacyMutation().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HostedRestSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.LegacyMutation().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.LegacyMutation().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HostedRestSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.LegacyMutation().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE;
        for (const op of ['create', 'list', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'legacy_mutation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "avatar": { "a": true, "h": "Avatar", "n": "avatar", "r": true, "t": "`$STRING`", "key$": "avatar", "index$": 0 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "t": "`$STRING`", "key$": "createdAt", "index$": 1 }, "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": true, "t": "`$STRING`", "key$": "email", "index$": 2 }, "first_name": { "a": true, "h": "First Name", "n": "first_name", "r": true, "t": "`$STRING`", "key$": "first_name", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "op": { "list": { "req": true, "type": "`$INTEGER`" } }, "r": false, "t": "`$STRING`", "key$": "id", "index$": 4 }, "last_name": { "a": true, "h": "Last Name", "n": "last_name", "r": true, "t": "`$STRING`", "key$": "last_name", "index$": 5 }, "updatedAt": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updatedAt", "r": false, "t": "`$STRING`", "key$": "updatedAt", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "legacy_mutation", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/users", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/users", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "users" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/users", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/users", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "users" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": false, "co": { "id": "PATCH /api/users/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/users/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "users" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/users/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/users/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "users" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "legacy_mutation", "name__orig": "legacy_mutation", "Name": "LegacyMutation", "name_": "legacy_mutation", "name-": "legacy-mutation", "NAME": "LEGACY_MUTATION", "index$": 12 }, { "active": true, "entity": "legacy_mutation", "key$": "BasicLegacyMutationFlow", "kind": "basic", "name": "BasicLegacyMutationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "legacy_mutation_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "legacy_mutation_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "legacy_mutation_ref01", "srcdatavar": "legacy_mutation_ref01_data", "suffix": "_up0", "textfield": "avatar" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-legacy_mutation_ref01" } }], "v": [], "index$": 2 }] }, 'LegacyMutation', { "POST /api/users": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "x-ref": "#/components/schemas/LegacyMutationRequest", "index$": 1 } } } }, "parameters": [] }, "GET /api/users": { "protocol": "http", "parameters": [{ "name": "page", "in": "query", "description": "Page number for pagination.", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 0 }, { "name": "per_page", "in": "query", "description": "Number of users per page.", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "index$": 1 }] }, "PATCH /api/users/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "x-ref": "#/components/schemas/LegacyMutationRequest", "index$": 1 } } } }, "parameters": [{ "name": "id", "in": "path", "description": "User id.", "required": true, "schema": { "type": "integer", "minimum": 1 }, "index$": 0 }] }, "PUT /api/users/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "x-ref": "#/components/schemas/LegacyMutationRequest", "index$": 1 } } } }, "parameters": [{ "name": "id", "in": "path", "description": "User id.", "required": true, "schema": { "type": "integer", "minimum": 1 }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const legacy_mutation_ref01_ent = client.LegacyMutation();
        let legacy_mutation_ref01_data = setup.data.new.legacy_mutation['legacy_mutation_ref01'];
        legacy_mutation_ref01_data = (await legacy_mutation_ref01_ent.create(legacy_mutation_ref01_data)).data();
        (0, node_assert_1.default)(null != legacy_mutation_ref01_data.id);
        // LIST
        const legacy_mutation_ref01_match = {};
        const legacy_mutation_ref01_list = (await legacy_mutation_ref01_ent.list(legacy_mutation_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(legacy_mutation_ref01_list, { id: legacy_mutation_ref01_data.id })));
        // UPDATE
        const legacy_mutation_ref01_data_up0 = {};
        legacy_mutation_ref01_data_up0.id = legacy_mutation_ref01_data.id;
        const legacy_mutation_ref01_markdef_up0 = { name: 'avatar', value: 'Mark01-legacy_mutation_ref01_' + setup.now };
        legacy_mutation_ref01_data_up0[legacy_mutation_ref01_markdef_up0.name] = legacy_mutation_ref01_markdef_up0.value;
        const legacy_mutation_ref01_resdata_up0 = (await legacy_mutation_ref01_ent.update(legacy_mutation_ref01_data_up0)).data();
        (0, node_assert_1.default)(legacy_mutation_ref01_resdata_up0.id === legacy_mutation_ref01_data_up0.id);
        (0, node_assert_1.default)(legacy_mutation_ref01_resdata_up0[legacy_mutation_ref01_markdef_up0.name] === legacy_mutation_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/legacy_mutation/LegacyMutationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HostedRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['legacy_mutation01', 'legacy_mutation02', 'legacy_mutation03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOSTED_REST_TEST_LEGACY_MUTATION_ENTID': idmap,
        'HOSTED_REST_TEST_LIVE': 'FALSE',
        'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
        'HOSTED_REST_APIKEY': '',
    });
    idmap = env['HOSTED_REST_TEST_LEGACY_MUTATION_ENTID'];
    const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOSTED_REST_TEST_LEGACY_MUTATION_ENTID'];
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
//# sourceMappingURL=LegacyMutationEntity.test.js.map