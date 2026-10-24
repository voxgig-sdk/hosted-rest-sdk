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
(0, node_test_1.describe)('CollectionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOSTED_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HostedRestSDK.test();
        const ent = testsdk.Collection();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('collection hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HostedRestSDK.test(offline).Collection().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HostedRestSDK.test(offline).Collection()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HostedRestSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Collection().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HostedRestSDK.test().Collection().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HostedRestSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Collection().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Collection().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HostedRestSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Collection().list({ "created_at": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'collection.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "name", "index$": 2 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "t": "`$STRING`", "key$": "project_id", "index$": 3 }, "schema": { "a": true, "h": "Schema", "n": "schema", "r": false, "t": "`$OBJECT`", "key$": "schema", "index$": 4 }, "slug": { "a": true, "h": "Slug", "n": "slug", "op": { "create": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "slug", "index$": 5 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "t": "`$STRING`", "key$": "updated_at", "index$": 6 }, "user_id": { "a": true, "h": "User Id", "n": "user_id", "r": false, "t": "`$STRING`", "key$": "user_id", "index$": 7 }, "visibility": { "a": true, "h": "Visibility", "n": "visibility", "r": false, "t": "`$STRING`", "key$": "visibility", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "collection", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["name", "project_id", "schema", "slug", "visibility"], "co": { "id": "POST /api/collections", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_reqres_env", "or": "X-Reqres-Env", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/collections", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "collections" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/collections", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_reqres_env", "or": "X-Reqres-Env", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/collections", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "collections" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /app/collections", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/app/collections", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "app" }, { "lit": "collections" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/collections/{slug}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_reqres_env", "or": "X-Reqres-Env", "r": false, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/collections/{slug}", "q": { "exist": ["id"] }, "r": { "param": { "slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "collections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /app/collections/{slug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/app/collections/{slug}", "q": { "exist": ["id"] }, "r": { "param": { "slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "app" }, { "lit": "collections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/collections/{slug}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_reqres_env", "or": "X-Reqres-Env", "r": false, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/collections/{slug}", "q": { "exist": ["id"] }, "r": { "param": { "slug": "id" } }, "s": [{ "lit": "api" }, { "lit": "collections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["name", "schema", "slug", "visibility"], "co": { "id": "PUT /api/collections/{slug}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_reqres_env", "or": "X-Reqres-Env", "r": false, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/collections/{slug}", "q": { "exist": ["id"] }, "r": { "param": { "slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "collections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "collection", "name__orig": "collection", "Name": "Collection", "name_": "collection", "name-": "collection", "NAME": "COLLECTION", "index$": 9 }, { "active": true, "entity": "collection", "key$": "BasicCollectionFlow", "kind": "basic", "name": "BasicCollectionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "collection_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "collection_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "collection_ref01", "srcdatavar": "collection_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-collection_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "collection_ref01", "srcdatavar": "collection_ref01_data", "suffix": "_dt0" }, "m": { "id": "collection01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-collection_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "collection_ref01", "suffix": "_rm0" }, "m": { "id": "collection01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "collection_ref01" } }], "index$": 5 }] }, 'Collection', { "POST /api/collections": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "key$": "name" }, "slug": { "type": "string", "key$": "slug" }, "schema": { "type": "object", "additionalProperties": true, "key$": "schema" }, "project_id": { "oneOf": [{ "type": "string" }, { "type": "integer" }], "key$": "project_id" }, "visibility": { "type": "string", "key$": "visibility" } }, "required": ["name"], "additionalProperties": true, "x-ref": "#/components/schemas/CollectionCreateRequest", "index$": 1 } } } }, "parameters": [{ "name": "X-Reqres-Env", "in": "header", "description": "Environment key (for example: prod or dev).", "required": false, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/collections": { "protocol": "http", "parameters": [{ "name": "X-Reqres-Env", "in": "header", "description": "Environment key (for example: prod or dev).", "required": false, "schema": { "type": "string" }, "index$": 0 }] }, "GET /app/collections": { "protocol": "http", "parameters": [] }, "GET /api/collections/{slug}": { "protocol": "http", "parameters": [{ "name": "X-Reqres-Env", "in": "header", "description": "Environment key (for example: prod or dev).", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "slug", "in": "path", "description": "Collection slug.", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /app/collections/{slug}": { "protocol": "http", "parameters": [{ "name": "slug", "in": "path", "description": "Collection slug.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /api/collections/{slug}": { "protocol": "http", "parameters": [{ "name": "X-Reqres-Env", "in": "header", "description": "Environment key (for example: prod or dev).", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "slug", "in": "path", "description": "Collection slug.", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/collections/{slug}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "key$": "name" }, "slug": { "type": "string", "key$": "slug" }, "schema": { "type": "object", "additionalProperties": true, "key$": "schema" }, "visibility": { "type": "string", "key$": "visibility" } }, "additionalProperties": true, "x-ref": "#/components/schemas/CollectionUpdateRequest", "index$": 1 } } } }, "parameters": [{ "name": "X-Reqres-Env", "in": "header", "description": "Environment key (for example: prod or dev).", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "slug", "in": "path", "description": "Collection slug.", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const collection_ref01_ent = client.Collection();
        let collection_ref01_data = setup.data.new.collection['collection_ref01'];
        collection_ref01_data = (await collection_ref01_ent.create(collection_ref01_data)).data();
        (0, node_assert_1.default)(null != collection_ref01_data.id);
        // LIST
        const collection_ref01_match = {};
        const collection_ref01_list = (await collection_ref01_ent.list(collection_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(collection_ref01_list, { id: collection_ref01_data.id })));
        // UPDATE
        const collection_ref01_data_up0 = {};
        collection_ref01_data_up0.id = collection_ref01_data.id;
        const collection_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-collection_ref01_' + setup.now };
        collection_ref01_data_up0[collection_ref01_markdef_up0.name] = collection_ref01_markdef_up0.value;
        const collection_ref01_resdata_up0 = (await collection_ref01_ent.update(collection_ref01_data_up0)).data();
        (0, node_assert_1.default)(collection_ref01_resdata_up0.id === collection_ref01_data_up0.id);
        (0, node_assert_1.default)(collection_ref01_resdata_up0[collection_ref01_markdef_up0.name] === collection_ref01_markdef_up0.value);
        // LOAD
        const collection_ref01_match_dt0 = {};
        collection_ref01_match_dt0.id = collection_ref01_data.id;
        const collection_ref01_data_dt0 = (await collection_ref01_ent.load(collection_ref01_match_dt0)).data();
        (0, node_assert_1.default)(collection_ref01_data_dt0.id === collection_ref01_data.id);
        // REMOVE
        const collection_ref01_match_rm0 = { id: collection_ref01_data.id };
        await collection_ref01_ent.remove(collection_ref01_match_rm0);
        // LIST
        const collection_ref01_match_rt0 = {};
        const collection_ref01_list_rt0 = (await collection_ref01_ent.list(collection_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(collection_ref01_list_rt0, { id: collection_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/collection/CollectionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HostedRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['collection01', 'collection02', 'collection03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOSTED_REST_TEST_COLLECTION_ENTID': idmap,
        'HOSTED_REST_TEST_LIVE': 'FALSE',
        'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
        'HOSTED_REST_APIKEY': '',
    });
    idmap = env['HOSTED_REST_TEST_COLLECTION_ENTID'];
    const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOSTED_REST_TEST_COLLECTION_ENTID'];
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
//# sourceMappingURL=CollectionEntity.test.js.map