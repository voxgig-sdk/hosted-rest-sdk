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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "created_at", "req": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "email", "name": "email", "req": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "full_name", "req": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "id", "req": true, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "locale", "req": true, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "preferences", "req": true, "type": "`$OBJECT`", "index$": 5 }, { "active": true, "name": "profile", "req": true, "type": "`$OBJECT`", "index$": 6 }, { "active": true, "name": "status", "req": true, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "timezone", "req": true, "type": "`$STRING`", "index$": 8 }, { "active": true, "format": "date-time", "name": "updated_at", "req": true, "type": "`$STRING`", "index$": 9 }], "id": { "field": "id", "name": "id" }, "name": "agent_user_list", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "cursor", "orig": "cursor", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "field", "orig": "field", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 20, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "example": 42, "kind": "query", "name": "seed", "orig": "seed", "reqd": false, "type": "`$INTEGER`", "index$": 3 }] }, "contract": { "id": "GET /agent/v1/users", "json": "{\"operationId\":\"agentListUsers\",\"parameters\":[{\"description\":\"Opaque cursor from previous response. Omit for first page.\",\"in\":\"query\",\"name\":\"cursor\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Page size (silently clamped at 100).\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"maximum\":100,\"type\":\"integer\"}},{\"description\":\"Comma-separated sparse fieldset (e.g. id,email,full_name).\",\"in\":\"query\",\"name\":\"fields\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Deterministic fixture seed.\",\"in\":\"query\",\"name\":\"seed\",\"schema\":{\"default\":42,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"full_name\":{\"type\":\"string\"},\"id\":{\"pattern\":\"^usr_[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$\",\"type\":\"string\"},\"locale\":{\"type\":\"string\"},\"preferences\":{\"type\":\"object\"},\"profile\":{\"properties\":{\"avatar_url\":{\"type\":[\"string\",\"null\"]},\"bio\":{\"type\":[\"string\",\"null\"]},\"company\":{\"properties\":{\"department\":{\"type\":\"string\"},\"employee_id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":[\"object\",\"null\"]},\"social\":{\"properties\":{\"github\":{\"type\":[\"string\",\"null\"]},\"linkedin\":{\"type\":[\"string\",\"null\"]},\"twitter\":{\"type\":[\"string\",\"null\"]}},\"type\":\"object\"}},\"type\":\"object\"},\"status\":{\"enum\":[\"active\",\"suspended\"],\"type\":\"string\"},\"timezone\":{\"type\":\"string\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"id\",\"email\",\"full_name\",\"locale\",\"created_at\",\"updated_at\",\"timezone\",\"profile\",\"preferences\",\"status\"],\"type\":\"object\"},\"type\":\"array\"},\"meta\":{\"properties\":{\"has_more\":{\"type\":\"boolean\"},\"limit\":{\"type\":\"integer\"},\"next_cursor\":{\"description\":\"Opaque cursor or null if at end.\",\"type\":[\"string\",\"null\"]},\"prev_cursor\":{\"description\":\"Always null in v1 (forward-only pagination).\",\"type\":[\"string\",\"null\"]},\"returned\":{\"type\":\"integer\"},\"total_estimate\":{\"type\":\"integer\"}},\"required\":[\"limit\",\"returned\",\"next_cursor\",\"prev_cursor\",\"has_more\",\"total_estimate\"],\"type\":\"object\"}},\"required\":[\"data\",\"meta\"],\"type\":\"object\"}}},\"description\":\"Paginated user list\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"session_token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/agent/v1/users", "segments": [{ "lit": "agent" }, { "lit": "v1" }, { "lit": "users" }], "select": { "exist": ["cursor", "field", "limit", "seed"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "agent_user_list", "name__orig": "agent_user_list", "Name": "AgentUserList", "name_": "agent_user_list", "name-": "agent-user-list", "NAME": "AGENT_USER_LIST", "index$": 3 }, { "active": true, "entity": "agent_user_list", "key$": "BasicAgentUserListFlow", "kind": "basic", "name": "BasicAgentUserListFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "agent_user_list_ref01" } }], "index$": 0 }] }, 'AgentUserList');
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