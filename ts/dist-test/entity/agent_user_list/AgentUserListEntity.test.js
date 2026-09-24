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
(0, node_test_1.describe)('AgentUserListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOSTED_REST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOSTED_REST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HostedRestSDK.test();
        const ent = testsdk.AgentUserList();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOSTED_REST_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_user_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": true, "t": "`$STRING`", "key$": "email", "index$": 1 }, "full_name": { "a": true, "h": "Full Name", "n": "full_name", "r": true, "t": "`$STRING`", "key$": "full_name", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 3 }, "locale": { "a": true, "h": "Locale", "n": "locale", "r": true, "t": "`$STRING`", "key$": "locale", "index$": 4 }, "preferences": { "a": true, "h": "Preferences", "n": "preferences", "r": true, "t": "`$OBJECT`", "key$": "preferences", "index$": 5 }, "profile": { "a": true, "h": "Profile", "n": "profile", "r": true, "t": "`$OBJECT`", "key$": "profile", "index$": 6 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 7 }, "timezone": { "a": true, "h": "Timezone", "n": "timezone", "r": true, "t": "`$STRING`", "key$": "timezone", "index$": 8 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "agent_user_list", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /agent/v1/users", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "field", "or": "field", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 42, "k": "query", "n": "seed", "or": "seed", "r": false, "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/agent/v1/users", "q": { "exist": ["cursor", "field", "limit", "seed"] }, "r": {}, "s": [{ "lit": "agent" }, { "lit": "v1" }, { "lit": "users" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "agent_user_list", "name__orig": "agent_user_list", "Name": "AgentUserList", "name_": "agent_user_list", "name-": "agent-user-list", "NAME": "AGENT_USER_LIST", "index$": 3 }, { "active": true, "entity": "agent_user_list", "key$": "BasicAgentUserListFlow", "kind": "basic", "name": "BasicAgentUserListFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "agent_user_list_ref01" } }], "index$": 0 }] }, 'AgentUserList', { "GET /agent/v1/users": { "protocol": "http", "operationId": "agentListUsers", "responses": { "200": { "description": "Paginated user list", "content": { "application/json": { "schema": { "type": "object", "required": ["data", "meta"], "properties": { "data": { "items": { "properties": { "created_at": { "format": "date-time", "type": "string", "key$": "created_at" }, "email": { "format": "email", "type": "string", "key$": "email" }, "full_name": { "type": "string", "key$": "full_name" }, "id": { "pattern": "^usr_[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$", "type": "string", "key$": "id" }, "locale": { "type": "string", "key$": "locale" }, "preferences": { "type": "object", "key$": "preferences" }, "profile": { "properties": { "avatar_url": { "type": ["string", "null"] }, "bio": { "type": ["string", "null"] }, "company": { "properties": { "department": { "type": "string" }, "employee_id": { "type": "string" }, "name": { "type": "string" } }, "type": ["object", "null"] }, "social": { "properties": { "github": { "type": ["string", "null"] }, "linkedin": { "type": ["string", "null"] }, "twitter": { "type": ["string", "null"] } }, "type": "object" } }, "type": "object", "key$": "profile" }, "status": { "enum": ["active", "suspended"], "type": "string", "key$": "status" }, "timezone": { "type": "string", "key$": "timezone" }, "updated_at": { "format": "date-time", "type": "string", "key$": "updated_at" } }, "required": ["id", "email", "full_name", "locale", "created_at", "updated_at", "timezone", "profile", "preferences", "status"], "type": "object", "x-ref": "#/components/schemas/AgentUser", "index$": 0 }, "key$": "data", "type": "array" }, "meta": { "key$": "meta", "properties": { "has_more": { "type": "boolean" }, "limit": { "type": "integer" }, "next_cursor": { "description": "Opaque cursor or null if at end.", "type": ["string", "null"] }, "prev_cursor": { "description": "Always null in v1 (forward-only pagination).", "type": ["string", "null"] }, "returned": { "type": "integer" }, "total_estimate": { "type": "integer" } }, "required": ["limit", "returned", "next_cursor", "prev_cursor", "has_more", "total_estimate"], "type": "object", "x-ref": "#/components/schemas/AgentPaginationMeta" } }, "x-ref": "#/components/schemas/AgentUserListResponse" } } } } }, "parameters": [{ "name": "cursor", "in": "query", "schema": { "type": "string" }, "description": "Opaque cursor from previous response. Omit for first page.", "index$": 0 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "default": 20, "maximum": 100 }, "description": "Page size (silently clamped at 100).", "index$": 1 }, { "name": "fields", "in": "query", "schema": { "type": "string" }, "description": "Comma-separated sparse fieldset (e.g. id,email,full_name).", "index$": 2 }, { "name": "seed", "in": "query", "schema": { "type": "integer", "default": 42 }, "description": "Deterministic fixture seed.", "index$": 3 }], "securitySource": "unspecified", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "x-api-key" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "session_token" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let agent_user_list_ref01_data = Object.values(setup.data.existing.agent_user_list)[0];
        // LIST
        const agent_user_list_ref01_ent = client.AgentUserList();
        const agent_user_list_ref01_match = {};
        const agent_user_list_ref01_list = (await agent_user_list_ref01_ent.list(agent_user_list_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_user_list/AgentUserListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HostedRestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_user_list01', 'agent_user_list02', 'agent_user_list03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOSTED_REST_TEST_AGENT_USER_LIST_ENTID': idmap,
        'HOSTED_REST_TEST_LIVE': 'FALSE',
        'HOSTED_REST_TEST_EXPLAIN': 'FALSE',
        'HOSTED_REST_APIKEY': '',
    });
    idmap = env['HOSTED_REST_TEST_AGENT_USER_LIST_ENTID'];
    const live = 'TRUE' === env.HOSTED_REST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOSTED_REST_TEST_AGENT_USER_LIST_ENTID'];
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
//# sourceMappingURL=AgentUserListEntity.test.js.map