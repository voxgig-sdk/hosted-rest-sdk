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
(0, node_test_1.describe)('CustomEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOSTED_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HostedRestSDK.test();
        const ent = testsdk.Custom();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE;
        for (const op of ['create', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'custom.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "custom", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/custom/{path}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "path", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/custom/{path}", "q": { "exist": ["id"] }, "r": { "param": { "path": "id" } }, "s": [{ "lit": "api" }, { "lit": "custom" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/custom/{path}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "path", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/custom/{path}", "q": { "exist": ["id"] }, "r": { "param": { "path": "id" } }, "s": [{ "lit": "api" }, { "lit": "custom" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "co": { "id": "PATCH /api/custom/{path}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "path", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/custom/{path}", "q": { "exist": ["id"] }, "r": { "param": { "path": "id" } }, "s": [{ "lit": "api" }, { "lit": "custom" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/custom/{path}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "path", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/custom/{path}", "q": { "exist": ["id"] }, "r": { "param": { "path": "id" } }, "s": [{ "lit": "api" }, { "lit": "custom" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /api/custom/{path}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "path", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/custom/{path}", "q": { "exist": ["id"] }, "r": { "param": { "path": "id" } }, "s": [{ "lit": "api" }, { "lit": "custom" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "custom", "name__orig": "custom", "Name": "Custom", "name_": "custom", "name-": "custom", "NAME": "CUSTOM", "index$": 11 }, { "active": true, "entity": "custom", "key$": "BasicCustomFlow", "kind": "basic", "name": "BasicCustomFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "custom_ref01" }, "m": { "path": "path01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "custom_ref01", "srcdatavar": "custom_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-custom_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "custom_ref01", "srcdatavar": "custom_ref01_data", "suffix": "_dt0" }, "m": { "id": "custom01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-custom_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "custom_ref01", "suffix": "_rm0" }, "m": { "id": "custom01" }, "o": "remove", "s": [], "v": [], "index$": 3 }] }, 'Custom', { "POST /api/custom/{path}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "index$": 1 } } } }, "parameters": [{ "name": "path", "in": "path", "description": "Custom endpoint path (supports nested segments).", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/custom/{path}": { "protocol": "http", "parameters": [{ "name": "path", "in": "path", "description": "Custom endpoint path (supports nested segments).", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/custom/{path}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "index$": 1 } } } }, "parameters": [{ "name": "path", "in": "path", "description": "Custom endpoint path (supports nested segments).", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /api/custom/{path}": { "protocol": "http", "parameters": [{ "name": "path", "in": "path", "description": "Custom endpoint path (supports nested segments).", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /api/custom/{path}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "index$": 1 } } } }, "parameters": [{ "name": "path", "in": "path", "description": "Custom endpoint path (supports nested segments).", "required": true, "schema": { "type": "string" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const custom_ref01_ent = client.Custom();
        let custom_ref01_data = setup.data.new.custom['custom_ref01'];
        custom_ref01_data['path'] = setup.idmap['path01'];
        custom_ref01_data = (await custom_ref01_ent.create(custom_ref01_data)).data();
        (0, node_assert_1.default)(null != custom_ref01_data.id);
        // UPDATE
        const custom_ref01_data_up0 = {};
        custom_ref01_data_up0.id = custom_ref01_data.id;
        const custom_ref01_resdata_up0 = (await custom_ref01_ent.update(custom_ref01_data_up0)).data();
        (0, node_assert_1.default)(custom_ref01_resdata_up0.id === custom_ref01_data_up0.id);
        // LOAD
        const custom_ref01_match_dt0 = {};
        custom_ref01_match_dt0.id = custom_ref01_data.id;
        const custom_ref01_data_dt0 = (await custom_ref01_ent.load(custom_ref01_match_dt0)).data();
        (0, node_assert_1.default)(custom_ref01_data_dt0.id === custom_ref01_data.id);
        // REMOVE
        const custom_ref01_match_rm0 = { id: custom_ref01_data.id };
        await custom_ref01_ent.remove(custom_ref01_match_rm0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/custom/CustomTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HostedRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['custom01', 'custom02', 'custom03', 'path01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOSTED_REST_TEST_CUSTOM_ENTID': idmap,
        'HOSTED_REST_TEST_LIVE': 'FALSE',
        'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
        'HOSTED_REST_APIKEY': '',
    });
    idmap = env['HOSTED_REST_TEST_CUSTOM_ENTID'];
    const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOSTED_REST_TEST_CUSTOM_ENTID'];
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
//# sourceMappingURL=CustomEntity.test.js.map