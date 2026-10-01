"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'HostedRest',
        slug: "hosted-rest",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://reqres.in",
        auth: {
            prefix: '',
            name: 'x-api-key',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            agent_health: {},
            agent_sandbox: {},
            agent_user: {},
            app_user: {},
            app_user_login: {},
            app_user_session: {},
            app_user_total: {},
            app_user_verify: {},
            authentication: {},
            collection: {},
            collection_record: {},
            custom: {},
            legacy: {},
            legacy_mutation: {},
            legacy_unknown: {},
            legacy_user: {},
            login: {},
            register: {},
        }
    };
    entity = {
        "agent_health": {
            "fields": [
                {
                    "name": "deprecations",
                    "title": "Deprecations",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "rate_limit_status",
                    "title": "Rate Limit Status",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "uptime_seconds",
                    "title": "Uptime Seconds",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "name": "agent_health",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/agent/v1/health",
                            "segments": [
                                {
                                    "lit": "agent"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "health"
                                }
                            ],
                            "parts": [
                                "agent",
                                "v1",
                                "health"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "agent_sandbox": {
            "fields": [
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "email"
                },
                {
                    "name": "password",
                    "title": "Password",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "name": "agent_sandbox",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/agent/v1/auth/login",
                            "segments": [
                                {
                                    "lit": "agent"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "login"
                                }
                            ],
                            "parts": [
                                "agent",
                                "v1",
                                "auth",
                                "login"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/agent/v1/orders",
                            "segments": [
                                {
                                    "lit": "agent"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "orders"
                                }
                            ],
                            "parts": [
                                "agent",
                                "v1",
                                "orders"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 20
                                    },
                                    {
                                        "name": "seed",
                                        "orig": "seed",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 42
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cursor",
                                    "limit",
                                    "seed",
                                    "status"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/agent/v1/scenarios/{scenario}",
                            "segments": [
                                {
                                    "lit": "agent"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "scenarios"
                                },
                                {
                                    "var": "scenario"
                                }
                            ],
                            "parts": [
                                "agent",
                                "v1",
                                "scenarios",
                                "{scenario}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "scenario",
                                        "orig": "scenario",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "scenario"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/agent/v1/scenarios",
                            "segments": [
                                {
                                    "lit": "agent"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "scenarios"
                                }
                            ],
                            "parts": [
                                "agent",
                                "v1",
                                "scenarios"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "agent_user": {
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "email"
                },
                {
                    "name": "full_name",
                    "title": "Full Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "locale",
                    "title": "Locale",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "preferences",
                    "title": "Preferences",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "profile",
                    "title": "Profile",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "timezone",
                    "title": "Timezone",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "agent_user",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/agent/v1/users",
                            "segments": [
                                {
                                    "lit": "agent"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "users"
                                }
                            ],
                            "parts": [
                                "agent",
                                "v1",
                                "users"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "field",
                                        "orig": "fields",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 20
                                    },
                                    {
                                        "name": "seed",
                                        "orig": "seed",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 42
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cursor",
                                    "field",
                                    "limit",
                                    "seed"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/agent/v1/users/{id}",
                            "segments": [
                                {
                                    "lit": "agent"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "agent",
                                "v1",
                                "users",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "expand",
                                        "orig": "expand",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "expand",
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "app_user": {
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "format": "email"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "last_login_at",
                    "title": "Last Login At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "app_user",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/app-users/{id}/sessions/simulate",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "app-users"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "sessions"
                                },
                                {
                                    "lit": "simulate"
                                }
                            ],
                            "parts": [
                                "api",
                                "app-users",
                                "{id}",
                                "sessions",
                                "simulate"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "session_simulate",
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/app-users",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "app-users"
                                }
                            ],
                            "parts": [
                                "api",
                                "app-users"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/projects/{projectId}/app-users",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "app-users"
                                }
                            ],
                            "parts": [
                                "api",
                                "projects",
                                "{project_id}",
                                "app-users"
                            ],
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "project_id",
                                        "orig": "projectId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "status",
                                        "orig": "statuses",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "project_id",
                                    "status",
                                    "x_reqres_env"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/app-users",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "app-users"
                                }
                            ],
                            "parts": [
                                "api",
                                "app-users"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "limit",
                                    "x_reqres_env"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/app-users/{id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "app-users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "app-users",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/app/collections/{slug}/records/{recordId}",
                            "segments": [
                                {
                                    "lit": "app"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "collection_id"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "record_id"
                                }
                            ],
                            "parts": [
                                "app",
                                "collections",
                                "{collection_id}",
                                "records",
                                "{record_id}"
                            ],
                            "rename": {
                                "param": {
                                    "recordId": "record_id",
                                    "slug": "collection_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "collection_id",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "record_id",
                                        "orig": "recordId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "collection_id",
                                    "record_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/app-users/{id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "app-users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "app-users",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/api/app-users/{id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "app-users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "app-users",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.collection"
                    ]
                ]
            }
        },
        "app_user_login": {
            "fields": [
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "email"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`"
                }
            ],
            "name": "app_user_login",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/app-users/login",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "app-users"
                                },
                                {
                                    "lit": "login"
                                }
                            ],
                            "parts": [
                                "api",
                                "app-users",
                                "login"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "app_user_session": {
            "fields": [],
            "name": "app_user_session",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/app-users/me",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "app-users"
                                },
                                {
                                    "lit": "me"
                                }
                            ],
                            "parts": [
                                "api",
                                "app-users",
                                "me"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/app/me",
                            "segments": [
                                {
                                    "lit": "app"
                                },
                                {
                                    "lit": "me"
                                }
                            ],
                            "parts": [
                                "app",
                                "me"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "app_user_total": {
            "fields": [
                {
                    "name": "total",
                    "title": "Total",
                    "type": "`$INTEGER`",
                    "req": true
                }
            ],
            "name": "app_user_total",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/projects/{projectId}/app-users/total",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "app-users"
                                },
                                {
                                    "lit": "total"
                                }
                            ],
                            "parts": [
                                "api",
                                "projects",
                                "{project_id}",
                                "app-users",
                                "total"
                            ],
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "project_id",
                                        "orig": "projectId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "project_id",
                                    "x_reqres_env"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "app_user_verify": {
            "fields": [
                {
                    "name": "token",
                    "title": "Token",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "name": "app_user_verify",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/app-users/verify",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "app-users"
                                },
                                {
                                    "lit": "verify"
                                }
                            ],
                            "parts": [
                                "api",
                                "app-users",
                                "verify"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "authentication": {
            "fields": [],
            "name": "authentication",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/logout",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "logout"
                                }
                            ],
                            "parts": [
                                "api",
                                "logout"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "collection": {
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "schema",
                    "title": "Schema",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "slug",
                    "title": "Slug",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "user_id",
                    "title": "User Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "visibility",
                    "title": "Visibility",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "collection",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/collections",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "collections"
                                }
                            ],
                            "parts": [
                                "api",
                                "collections"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "x_reqres_env"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/collections",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "collections"
                                }
                            ],
                            "parts": [
                                "api",
                                "collections"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "x_reqres_env"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/app/collections",
                            "segments": [
                                {
                                    "lit": "app"
                                },
                                {
                                    "lit": "collections"
                                }
                            ],
                            "parts": [
                                "app",
                                "collections"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/collections/{slug}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "collections",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "slug": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "x_reqres_env"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/app/collections/{slug}",
                            "segments": [
                                {
                                    "lit": "app"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "app",
                                "collections",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "slug": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/collections/{slug}/records/{recordId}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "collection_id"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "record_id"
                                }
                            ],
                            "parts": [
                                "api",
                                "collections",
                                "{collection_id}",
                                "records",
                                "{record_id}"
                            ],
                            "rename": {
                                "param": {
                                    "recordId": "record_id",
                                    "slug": "collection_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "collection_id",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "record_id",
                                        "orig": "recordId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "collection_id",
                                    "record_id",
                                    "x_reqres_env"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/collections/{slug}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "collections",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "slug": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "x_reqres_env"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/api/collections/{slug}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "collections",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "slug": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "x_reqres_env"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "collection_record": {
            "fields": [
                {
                    "name": "app_user_id",
                    "title": "App User Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "collection_id",
                    "title": "Collection Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "created_by",
                    "title": "Created By",
                    "type": "`$STRING`"
                },
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "deleted_at",
                    "title": "Deleted At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "format": "date-time"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "collection_record",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/collections/{slug}/records",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "slug"
                                },
                                {
                                    "lit": "records"
                                }
                            ],
                            "parts": [
                                "api",
                                "collections",
                                "{slug}",
                                "records"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "slug",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "slug",
                                    "x_reqres_env"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/app/collections/{slug}/records",
                            "segments": [
                                {
                                    "lit": "app"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "slug"
                                },
                                {
                                    "lit": "records"
                                }
                            ],
                            "parts": [
                                "app",
                                "collections",
                                "{slug}",
                                "records"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "slug",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "slug"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/collections/{slug}/records",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "slug"
                                },
                                {
                                    "lit": "records"
                                }
                            ],
                            "parts": [
                                "api",
                                "collections",
                                "{slug}",
                                "records"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "slug",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "created_after",
                                        "orig": "created_after",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "created_before",
                                        "orig": "created_before",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "data_contain",
                                        "orig": "data_contains",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include_deleted",
                                        "orig": "include_deleted",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "order",
                                        "orig": "order",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "created_after",
                                    "created_before",
                                    "data_contain",
                                    "include_deleted",
                                    "limit",
                                    "order",
                                    "page",
                                    "search",
                                    "slug",
                                    "x_reqres_env"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/app/collections/{slug}/records",
                            "segments": [
                                {
                                    "lit": "app"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "slug"
                                },
                                {
                                    "lit": "records"
                                }
                            ],
                            "parts": [
                                "app",
                                "collections",
                                "{slug}",
                                "records"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "slug",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "slug"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/collections/{slug}/records/{recordId}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "collection_id"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "collections",
                                "{collection_id}",
                                "records",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "recordId": "id",
                                    "slug": "collection_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "collection_id",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "recordId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "collection_id",
                                    "id",
                                    "x_reqres_env"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/app/collections/{slug}/records/{recordId}",
                            "segments": [
                                {
                                    "lit": "app"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "collection_id"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "app",
                                "collections",
                                "{collection_id}",
                                "records",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "recordId": "id",
                                    "slug": "collection_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "collection_id",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "recordId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "collection_id",
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/api/collections/{slug}/records/{recordId}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "collection_id"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "collections",
                                "{collection_id}",
                                "records",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "recordId": "id",
                                    "slug": "collection_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_reqres_env",
                                        "orig": "X-Reqres-Env",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "collection_id",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "recordId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "collection_id",
                                    "id",
                                    "x_reqres_env"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/app/collections/{slug}/records/{recordId}",
                            "segments": [
                                {
                                    "lit": "app"
                                },
                                {
                                    "lit": "collections"
                                },
                                {
                                    "var": "collection_id"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "app",
                                "collections",
                                "{collection_id}",
                                "records",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "recordId": "id",
                                    "slug": "collection_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "collection_id",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "recordId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "collection_id",
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.collection"
                    ]
                ]
            }
        },
        "custom": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "custom",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/custom/{path}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "custom"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "custom",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "path": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "path",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/custom/{path}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "custom"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "custom",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "path": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "path",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/api/custom/{path}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "custom"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "custom",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "path": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "path",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/custom/{path}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "custom"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "custom",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "path": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "path",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/api/custom/{path}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "custom"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "custom",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "path": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "path",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "legacy": {
            "fields": [
                {
                    "name": "avatar",
                    "title": "Avatar",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "email"
                },
                {
                    "name": "first_name",
                    "title": "First Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "last_name",
                    "title": "Last Name",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "legacy",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/users",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "users"
                                }
                            ],
                            "parts": [
                                "api",
                                "users"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/users",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "users"
                                }
                            ],
                            "parts": [
                                "api",
                                "users"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "page",
                                    "per_page"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/users/{id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "users",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "legacy_mutation": {
            "fields": [
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "format": "date-time"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "legacy_mutation",
            "op": {
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/api/users/{id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "users",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/api/users/{id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "users",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "legacy_unknown": {
            "fields": [
                {
                    "name": "color",
                    "title": "Color",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "pantone_value",
                    "title": "Pantone Value",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "support",
                    "title": "Support",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "year",
                    "title": "Year",
                    "type": "`$INTEGER`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "legacy_unknown",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/unknown",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "unknown"
                                }
                            ],
                            "parts": [
                                "api",
                                "unknown"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "page",
                                    "per_page"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/unknown/{id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "unknown"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "unknown",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "legacy_user": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "support",
                    "title": "Support",
                    "type": "`$OBJECT`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "legacy_user",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/users/{id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "users",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "login": {
            "fields": [
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "email"
                },
                {
                    "name": "password",
                    "title": "Password",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "token",
                    "title": "Token",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "name": "login",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/login",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "login"
                                }
                            ],
                            "parts": [
                                "api",
                                "login"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "register": {
            "fields": [
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "email"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "password",
                    "title": "Password",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "token",
                    "title": "Token",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "register",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/register",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "register"
                                }
                            ],
                            "parts": [
                                "api",
                                "register"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map