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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "app_user_id": { "a": true, "h": "App User Id", "n": "app_user_id", "r": false, "t": "`$STRING`", "key$": "app_user_id", "index$": 0 }, "collection_id": { "a": true, "h": "Collection Id", "n": "collection_id", "r": false, "t": "`$STRING`", "key$": "collection_id", "index$": 1 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "created_by": { "a": true, "h": "Created By", "n": "created_by", "r": false, "t": "`$STRING`", "key$": "created_by", "index$": 3 }, "data": { "a": true, "h": "Data", "n": "data", "r": true, "t": "`$OBJECT`", "key$": "data", "index$": 4 }, "deleted_at": { "a": true, "fo": "date-time", "h": "Deleted At", "n": "deleted_at", "r": false, "t": "`$STRING`", "key$": "deleted_at", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 6 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "t": "`$STRING`", "key$": "project_id", "index$": 7 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "t": "`$STRING`", "key$": "updated_at", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "collection_record", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/collections/{slug}/records", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_reqres_env", "or": "x_reqres_env", "r": false, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "slug", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/collections/{slug}/records", "q": { "exist": ["slug", "x_reqres_env"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "collections" }, { "var": "slug" }, { "lit": "records" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /app/collections/{slug}/records", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "slug", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/app/collections/{slug}/records", "q": { "exist": ["slug"] }, "r": {}, "s": [{ "lit": "app" }, { "lit": "collections" }, { "var": "slug" }, { "lit": "records" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/collections/{slug}/records/{recordId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_reqres_env", "or": "x_reqres_env", "r": false, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "collection_id", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "record_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/collections/{slug}/records/{recordId}", "q": { "exist": ["collection_id", "id", "x_reqres_env"] }, "r": { "param": { "recordId": "id", "slug": "collection_id" } }, "s": [{ "lit": "api" }, { "lit": "collections" }, { "var": "collection_id" }, { "lit": "records" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /app/collections/{slug}/records/{recordId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "collection_id", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "record_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/app/collections/{slug}/records/{recordId}", "q": { "exist": ["collection_id", "id"] }, "r": { "param": { "recordId": "id", "slug": "collection_id" } }, "s": [{ "lit": "app" }, { "lit": "collections" }, { "var": "collection_id" }, { "lit": "records" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /api/collections/{slug}/records/{recordId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_reqres_env", "or": "x_reqres_env", "r": false, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "collection_id", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "record_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/collections/{slug}/records/{recordId}", "q": { "exist": ["collection_id", "id", "x_reqres_env"] }, "r": { "param": { "recordId": "id", "slug": "collection_id" } }, "s": [{ "lit": "api" }, { "lit": "collections" }, { "var": "collection_id" }, { "lit": "records" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "PUT /app/collections/{slug}/records/{recordId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "collection_id", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "record_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/app/collections/{slug}/records/{recordId}", "q": { "exist": ["collection_id", "id"] }, "r": { "param": { "recordId": "id", "slug": "collection_id" } }, "s": [{ "lit": "app" }, { "lit": "collections" }, { "var": "collection_id" }, { "lit": "records" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.collection"]] }, "key$": "collection_record", "name__orig": "collection_record", "Name": "CollectionRecord", "name_": "collection_record", "name-": "collection-record", "NAME": "COLLECTION_RECORD", "index$": 11 }, { "active": true, "entity": "collection_record", "key$": "BasicCollectionRecordFlow", "kind": "basic", "name": "BasicCollectionRecordFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "collection_record_ref01" }, "m": { "collection_id": "collection01", "slug": "slug01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": { "collection_id": "collection01" }, "i": { "ref": "collection_record_ref01", "srcdatavar": "collection_record_ref01_data", "suffix": "_up0", "textfield": "app_user_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-collection_record_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "collection_record_ref01", "srcdatavar": "collection_record_ref01_data", "suffix": "_dt0" }, "m": { "collection_id": "collection01", "id": "collection_record01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-collection_record_ref01" } }], "index$": 2 }] }, 'CollectionRecord', { "POST /api/collections/{slug}/records": { "protocol": "http", "operationId": "createCollectionRecord", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "object", "additionalProperties": true, "key$": "data" } }, "required": ["data"], "additionalProperties": true, "x-ref": "#/components/schemas/CollectionRecordCreateRequest", "index$": 1 } } } }, "responses": { "201": { "description": "Record created", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "object", "properties": { "id": { "type": "string", "key$": "id" }, "collection_id": { "type": "string", "key$": "collection_id" }, "project_id": { "type": "string", "key$": "project_id" }, "app_user_id": { "type": "string", "key$": "app_user_id" }, "created_by": { "type": "string", "key$": "created_by" }, "created_at": { "format": "date-time", "type": "string", "key$": "created_at" }, "updated_at": { "format": "date-time", "type": "string", "key$": "updated_at" }, "deleted_at": { "format": "date-time", "nullable": true, "type": "string", "key$": "deleted_at" }, "data": { "additionalProperties": true, "type": "object", "key$": "data" } }, "required": ["id", "data"], "additionalProperties": true, "x-ref": "#/components/schemas/CollectionRecord", "index$": 0 } }, "required": ["data"], "x-ref": "#/components/schemas/CollectionRecordResponse" } } } }, "400": { "description": "Error response", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "message": { "type": "string" } }, "additionalProperties": true, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } }, "404": { "description": "Error response", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "message": { "type": "string" } }, "additionalProperties": true, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "X-Reqres-Env", "in": "header", "description": "Environment key (for example: prod or dev).", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "slug", "in": "path", "description": "Collection slug.", "required": true, "schema": { "type": "string" }, "index$": 1 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "x-api-key" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "session_token" } } }, "POST /app/collections/{slug}/records": { "protocol": "http", "operationId": "createRecordAppUser", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "object", "additionalProperties": true, "key$": "data" } }, "required": ["data"], "additionalProperties": true, "x-ref": "#/components/schemas/CollectionRecordCreateRequest", "index$": 1 } } } }, "responses": { "201": { "description": "Record created", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "object", "properties": { "id": { "type": "string", "key$": "id" }, "collection_id": { "type": "string", "key$": "collection_id" }, "project_id": { "type": "string", "key$": "project_id" }, "app_user_id": { "type": "string", "key$": "app_user_id" }, "created_by": { "type": "string", "key$": "created_by" }, "created_at": { "format": "date-time", "type": "string", "key$": "created_at" }, "updated_at": { "format": "date-time", "type": "string", "key$": "updated_at" }, "deleted_at": { "format": "date-time", "nullable": true, "type": "string", "key$": "deleted_at" }, "data": { "additionalProperties": true, "type": "object", "key$": "data" } }, "required": ["id", "data"], "additionalProperties": true, "x-ref": "#/components/schemas/CollectionRecord", "index$": 0 } }, "required": ["data"], "x-ref": "#/components/schemas/CollectionRecordResponse" } } } }, "400": { "description": "Error response", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "message": { "type": "string" } }, "additionalProperties": true, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "slug", "in": "path", "description": "Collection slug.", "required": true, "schema": { "type": "string" }, "index$": 0 }], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "x-api-key" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "session_token" } } }, "GET /api/collections/{slug}/records/{recordId}": { "protocol": "http", "operationId": "getCollectionRecord", "responses": { "200": { "description": "Record", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "object", "properties": { "id": { "type": "string", "key$": "id" }, "collection_id": { "type": "string", "key$": "collection_id" }, "project_id": { "type": "string", "key$": "project_id" }, "app_user_id": { "type": "string", "key$": "app_user_id" }, "created_by": { "type": "string", "key$": "created_by" }, "created_at": { "format": "date-time", "type": "string", "key$": "created_at" }, "updated_at": { "format": "date-time", "type": "string", "key$": "updated_at" }, "deleted_at": { "format": "date-time", "nullable": true, "type": "string", "key$": "deleted_at" }, "data": { "additionalProperties": true, "type": "object", "key$": "data" } }, "required": ["id", "data"], "additionalProperties": true, "x-ref": "#/components/schemas/CollectionRecord", "index$": 0 } }, "required": ["data"], "x-ref": "#/components/schemas/CollectionRecordResponse" } } } }, "404": { "description": "Error response", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "message": { "type": "string" } }, "additionalProperties": true, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "X-Reqres-Env", "in": "header", "description": "Environment key (for example: prod or dev).", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "slug", "in": "path", "description": "Collection slug.", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "recordId", "in": "path", "description": "Record id.", "required": true, "schema": { "type": "string" }, "index$": 2 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "x-api-key" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "session_token" } } }, "GET /app/collections/{slug}/records/{recordId}": { "protocol": "http", "operationId": "getRecordAppUser", "responses": { "200": { "description": "Record", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "object", "properties": { "id": { "type": "string", "key$": "id" }, "collection_id": { "type": "string", "key$": "collection_id" }, "project_id": { "type": "string", "key$": "project_id" }, "app_user_id": { "type": "string", "key$": "app_user_id" }, "created_by": { "type": "string", "key$": "created_by" }, "created_at": { "format": "date-time", "type": "string", "key$": "created_at" }, "updated_at": { "format": "date-time", "type": "string", "key$": "updated_at" }, "deleted_at": { "format": "date-time", "nullable": true, "type": "string", "key$": "deleted_at" }, "data": { "additionalProperties": true, "type": "object", "key$": "data" } }, "required": ["id", "data"], "additionalProperties": true, "x-ref": "#/components/schemas/CollectionRecord", "index$": 0 } }, "required": ["data"], "x-ref": "#/components/schemas/CollectionRecordResponse" } } } }, "404": { "description": "Error response", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "message": { "type": "string" } }, "additionalProperties": true, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "slug", "in": "path", "description": "Collection slug.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "recordId", "in": "path", "description": "Record id.", "required": true, "schema": { "type": "string" }, "index$": 1 }], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "x-api-key" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "session_token" } } }, "PUT /api/collections/{slug}/records/{recordId}": { "protocol": "http", "operationId": "updateCollectionRecord", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "object", "additionalProperties": true, "key$": "data" } }, "required": ["data"], "additionalProperties": true, "x-ref": "#/components/schemas/CollectionRecordUpdateRequest", "index$": 1 } } } }, "responses": { "200": { "description": "Record updated", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "object", "properties": { "id": { "type": "string", "key$": "id" }, "collection_id": { "type": "string", "key$": "collection_id" }, "project_id": { "type": "string", "key$": "project_id" }, "app_user_id": { "type": "string", "key$": "app_user_id" }, "created_by": { "type": "string", "key$": "created_by" }, "created_at": { "format": "date-time", "type": "string", "key$": "created_at" }, "updated_at": { "format": "date-time", "type": "string", "key$": "updated_at" }, "deleted_at": { "format": "date-time", "nullable": true, "type": "string", "key$": "deleted_at" }, "data": { "additionalProperties": true, "type": "object", "key$": "data" } }, "required": ["id", "data"], "additionalProperties": true, "x-ref": "#/components/schemas/CollectionRecord", "index$": 0 } }, "required": ["data"], "x-ref": "#/components/schemas/CollectionRecordResponse" } } } }, "400": { "description": "Error response", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "message": { "type": "string" } }, "additionalProperties": true, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } }, "404": { "description": "Error response", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "message": { "type": "string" } }, "additionalProperties": true, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "X-Reqres-Env", "in": "header", "description": "Environment key (for example: prod or dev).", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "slug", "in": "path", "description": "Collection slug.", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "recordId", "in": "path", "description": "Record id.", "required": true, "schema": { "type": "string" }, "index$": 2 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "x-api-key" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "session_token" } } }, "PUT /app/collections/{slug}/records/{recordId}": { "protocol": "http", "operationId": "updateRecordAppUser", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "object", "additionalProperties": true, "key$": "data" } }, "required": ["data"], "additionalProperties": true, "x-ref": "#/components/schemas/CollectionRecordUpdateRequest", "index$": 1 } } } }, "responses": { "200": { "description": "Record updated", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "object", "properties": { "id": { "type": "string", "key$": "id" }, "collection_id": { "type": "string", "key$": "collection_id" }, "project_id": { "type": "string", "key$": "project_id" }, "app_user_id": { "type": "string", "key$": "app_user_id" }, "created_by": { "type": "string", "key$": "created_by" }, "created_at": { "format": "date-time", "type": "string", "key$": "created_at" }, "updated_at": { "format": "date-time", "type": "string", "key$": "updated_at" }, "deleted_at": { "format": "date-time", "nullable": true, "type": "string", "key$": "deleted_at" }, "data": { "additionalProperties": true, "type": "object", "key$": "data" } }, "required": ["id", "data"], "additionalProperties": true, "x-ref": "#/components/schemas/CollectionRecord", "index$": 0 } }, "required": ["data"], "x-ref": "#/components/schemas/CollectionRecordResponse" } } } }, "400": { "description": "Error response", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "message": { "type": "string" } }, "additionalProperties": true, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "slug", "in": "path", "description": "Collection slug.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "recordId", "in": "path", "description": "Record id.", "required": true, "schema": { "type": "string" }, "index$": 1 }], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "x-api-key" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "session_token" } } } });
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
    let idmap = transform(['collection_record01', 'collection_record02', 'collection_record03', 'collection01', 'collection02', 'collection03', 'slug01'], {
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