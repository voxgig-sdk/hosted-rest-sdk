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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CollectionRecordEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOSTED_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HostedRestSDK.test();
        const ent = testsdk.CollectionRecord();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE;
        for (const op of ['create', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'collection_record.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "app_user_id", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "collection_id", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "date-time", "name": "created_at", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "created_by", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "data", "req": true, "type": "`$OBJECT`", "index$": 4 }, { "active": true, "format": "date-time", "name": "deleted_at", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "id", "req": true, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "project_id", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "format": "date-time", "name": "updated_at", "req": false, "type": "`$STRING`", "index$": 8 }], "id": { "field": "id", "name": "id" }, "name": "collection_record", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "x_reqres_env", "orig": "x_reqres_env", "reqd": false, "type": "`$STRING`" }], "params": [{ "active": true, "kind": "param", "name": "slug", "orig": "slug", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "POST /api/collections/{slug}/records", "json": "{\"operationId\":\"createCollectionRecord\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"data\":{\"additionalProperties\":true,\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"app_user_id\":{\"type\":\"string\"},\"collection_id\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"created_by\":{\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"type\":\"object\"},\"deleted_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"id\",\"data\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Record created\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/collections/{slug}/records", "segments": [{ "lit": "api" }, { "lit": "collections" }, { "var": "slug" }, { "lit": "records" }], "select": { "exist": ["slug", "x_reqres_env"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "slug", "orig": "slug", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "POST /app/collections/{slug}/records", "json": "{\"operationId\":\"createRecordAppUser\",\"parameters\":[{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"data\":{\"additionalProperties\":true,\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"app_user_id\":{\"type\":\"string\"},\"collection_id\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"created_by\":{\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"type\":\"object\"},\"deleted_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"id\",\"data\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Record created\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/app/collections/{slug}/records", "segments": [{ "lit": "app" }, { "lit": "collections" }, { "var": "slug" }, { "lit": "records" }], "select": { "exist": ["slug"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "x_reqres_env", "orig": "x_reqres_env", "reqd": false, "type": "`$STRING`" }], "params": [{ "active": true, "kind": "param", "name": "collection_id", "orig": "slug", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "id", "orig": "record_id", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /api/collections/{slug}/records/{recordId}", "json": "{\"operationId\":\"getCollectionRecord\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Record id.\",\"in\":\"path\",\"name\":\"recordId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"app_user_id\":{\"type\":\"string\"},\"collection_id\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"created_by\":{\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"type\":\"object\"},\"deleted_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"id\",\"data\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Record\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/collections/{slug}/records/{recordId}", "rename": { "param": { "recordId": "id", "slug": "collection_id" } }, "segments": [{ "lit": "api" }, { "lit": "collections" }, { "var": "collection_id" }, { "lit": "records" }, { "var": "id" }], "select": { "exist": ["collection_id", "id", "x_reqres_env"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "collection_id", "orig": "slug", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "id", "orig": "record_id", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /app/collections/{slug}/records/{recordId}", "json": "{\"operationId\":\"getRecordAppUser\",\"parameters\":[{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Record id.\",\"in\":\"path\",\"name\":\"recordId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"app_user_id\":{\"type\":\"string\"},\"collection_id\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"created_by\":{\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"type\":\"object\"},\"deleted_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"id\",\"data\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Record\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/app/collections/{slug}/records/{recordId}", "rename": { "param": { "recordId": "id", "slug": "collection_id" } }, "segments": [{ "lit": "app" }, { "lit": "collections" }, { "var": "collection_id" }, { "lit": "records" }, { "var": "id" }], "select": { "exist": ["collection_id", "id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "x_reqres_env", "orig": "x_reqres_env", "reqd": false, "type": "`$STRING`" }], "params": [{ "active": true, "kind": "param", "name": "collection_id", "orig": "slug", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "id", "orig": "record_id", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "PUT /api/collections/{slug}/records/{recordId}", "json": "{\"operationId\":\"updateCollectionRecord\",\"parameters\":[{\"description\":\"Environment key (for example: prod or dev).\",\"in\":\"header\",\"name\":\"X-Reqres-Env\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Record id.\",\"in\":\"path\",\"name\":\"recordId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"data\":{\"additionalProperties\":true,\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"app_user_id\":{\"type\":\"string\"},\"collection_id\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"created_by\":{\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"type\":\"object\"},\"deleted_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"id\",\"data\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Record updated\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/api/collections/{slug}/records/{recordId}", "rename": { "param": { "recordId": "id", "slug": "collection_id" } }, "segments": [{ "lit": "api" }, { "lit": "collections" }, { "var": "collection_id" }, { "lit": "records" }, { "var": "id" }], "select": { "exist": ["collection_id", "id", "x_reqres_env"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "collection_id", "orig": "slug", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "id", "orig": "record_id", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "PUT /app/collections/{slug}/records/{recordId}", "json": "{\"operationId\":\"updateRecordAppUser\",\"parameters\":[{\"description\":\"Collection slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Record id.\",\"in\":\"path\",\"name\":\"recordId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"data\":{\"additionalProperties\":true,\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"properties\":{\"app_user_id\":{\"type\":\"string\"},\"collection_id\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"created_by\":{\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"type\":\"object\"},\"deleted_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"project_id\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"id\",\"data\"],\"type\":\"object\"}},\"required\":[\"data\"],\"type\":\"object\"}}},\"description\":\"Record updated\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":true,\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Error response\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/app/collections/{slug}/records/{recordId}", "rename": { "param": { "recordId": "id", "slug": "collection_id" } }, "segments": [{ "lit": "app" }, { "lit": "collections" }, { "var": "collection_id" }, { "lit": "records" }, { "var": "id" }], "select": { "exist": ["collection_id", "id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["collection"]] }, "key$": "collection_record", "name__orig": "collection_record", "Name": "CollectionRecord", "name_": "collection_record", "name-": "collection-record", "NAME": "COLLECTION_RECORD", "index$": 11 }, { "active": true, "entity": "collection_record", "key$": "BasicCollectionRecordFlow", "kind": "basic", "name": "BasicCollectionRecordFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "collection_record_ref01" }, "match": { "collection_id": "collection01", "slug": "slug01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": { "collection_id": "collection01" }, "input": { "ref": "collection_record_ref01", "srcdatavar": "collection_record_ref01_data", "suffix": "_up0", "textfield": "app_user_id" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-collection_record_ref01" } }], "valid": [], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "collection_record_ref01", "srcdatavar": "collection_record_ref01_data", "suffix": "_dt0" }, "match": { "collection_id": "collection01", "id": "collection_record01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-collection_record_ref01" } }], "index$": 2 }] }, 'CollectionRecord');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const collection_record_ref01_ent = client.CollectionRecord();
        let collection_record_ref01_data = setup.data.new.collection_record['collection_record_ref01'];
        collection_record_ref01_data['collection_id'] = setup.idmap['collection01'];
        collection_record_ref01_data['slug'] = setup.idmap['slug01'];
        collection_record_ref01_data = (await collection_record_ref01_ent.create(collection_record_ref01_data)).data();
        (0, node_assert_1.default)(null != collection_record_ref01_data.id);
        // UPDATE
        const collection_record_ref01_data_up0 = {};
        collection_record_ref01_data_up0.id = collection_record_ref01_data.id;
        collection_record_ref01_data_up0['collection_id'] = setup.idmap['collection_id'];
        const collection_record_ref01_markdef_up0 = { name: 'app_user_id', value: 'Mark01-collection_record_ref01_' + setup.now };
        collection_record_ref01_data_up0[collection_record_ref01_markdef_up0.name] = collection_record_ref01_markdef_up0.value;
        const collection_record_ref01_resdata_up0 = (await collection_record_ref01_ent.update(collection_record_ref01_data_up0)).data();
        (0, node_assert_1.default)(collection_record_ref01_resdata_up0.id === collection_record_ref01_data_up0.id);
        (0, node_assert_1.default)(collection_record_ref01_resdata_up0[collection_record_ref01_markdef_up0.name] === collection_record_ref01_markdef_up0.value);
        // LOAD
        const collection_record_ref01_match_dt0 = {};
        collection_record_ref01_match_dt0.id = collection_record_ref01_data.id;
        const collection_record_ref01_data_dt0 = (await collection_record_ref01_ent.load(collection_record_ref01_match_dt0)).data();
        (0, node_assert_1.default)(collection_record_ref01_data_dt0.id === collection_record_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/collection_record/CollectionRecordTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HostedRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['collection_record01', 'collection_record02', 'collection_record03', 'collection01', 'collection02', 'collection03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOSTED_REST_TEST_COLLECTION_RECORD_ENTID': idmap,
        'HOSTED_REST_TEST_LIVE': 'FALSE',
        'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
        'HOSTED_REST_APIKEY': '',
    });
    idmap = env['HOSTED_REST_TEST_COLLECTION_RECORD_ENTID'];
    const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOSTED_REST_TEST_COLLECTION_RECORD_ENTID'];
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
//# sourceMappingURL=CollectionRecordEntity.test.js.map