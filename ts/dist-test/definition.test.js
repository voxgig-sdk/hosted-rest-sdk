"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "agent_health",
        "accessor": "AgentHealth",
        "op": "load",
        "method": "GET",
        "path": "/agent/v1/health",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "data": {
                "status": "healthy",
                "version": "x",
                "uptime_seconds": 1,
                "rate_limit_status": {
                    "tier": "x",
                    "remaining_today": 1,
                    "limit_today": 1,
                    "reset_at": "2026-01-01T00:00:00Z"
                },
                "deprecations": [
                    {}
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "agent_sandbox",
        "accessor": "AgentSandbox",
        "op": "create",
        "method": "POST",
        "path": "/agent/v1/auth/login",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "agent_sandbox",
        "accessor": "AgentSandbox",
        "op": "load",
        "method": "GET",
        "path": "/agent/v1/scenarios/{scenario}",
        "args": [
            {
                "name": "scenario",
                "wire": "scenario",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "agent_user",
        "accessor": "AgentUser",
        "op": "list",
        "method": "GET",
        "path": "/agent/v1/users",
        "args": [],
        "select": {
            "cursor": "v1",
            "field": "v1",
            "limit": 20,
            "seed": 42
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "cursor",
            "limit",
            "fields",
            "seed"
        ],
        "queryArgs": [
            {
                "name": "cursor",
                "wire": "cursor"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "seed",
                "wire": "seed"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "email": "x",
                    "full_name": "x",
                    "locale": "x",
                    "created_at": "2026-01-01T00:00:00Z",
                    "updated_at": "2026-01-01T00:00:00Z",
                    "timezone": "x",
                    "profile": {
                        "avatar_url": "x",
                        "bio": "x",
                        "company": {
                            "name": "x",
                            "department": "x",
                            "employee_id": "x"
                        },
                        "social": {
                            "twitter": "x",
                            "github": "x",
                            "linkedin": "x"
                        }
                    },
                    "preferences": {},
                    "status": "active"
                }
            ],
            "meta": {
                "limit": 1,
                "returned": 1,
                "next_cursor": "x",
                "prev_cursor": "x",
                "has_more": true,
                "total_estimate": 1
            }
        },
        "idField": "id"
    },
    {
        "entity": "agent_user",
        "accessor": "AgentUser",
        "op": "load",
        "method": "GET",
        "path": "/agent/v1/users/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "expand": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "expand"
        ],
        "queryArgs": [
            {
                "name": "expand",
                "wire": "expand"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "email": "x",
                "full_name": "x",
                "locale": "x",
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "timezone": "x",
                "profile": {
                    "avatar_url": "x",
                    "bio": "x",
                    "company": {
                        "name": "x",
                        "department": "x",
                        "employee_id": "x"
                    },
                    "social": {
                        "twitter": "x",
                        "github": "x",
                        "linkedin": "x"
                    }
                },
                "preferences": {},
                "status": "active"
            }
        },
        "idField": "id"
    },
    {
        "entity": "app_user",
        "accessor": "AppUser",
        "op": "create",
        "method": "POST",
        "path": "/api/app-users/{id}/sessions/simulate",
        "action": "session_simulate",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "app_user",
        "accessor": "AppUser",
        "op": "create",
        "method": "POST",
        "path": "/api/app-users",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "email": "x",
                "status": "x",
                "last_login_at": "2026-01-01T00:00:00Z",
                "created_at": "2026-01-01T00:00:00Z",
                "metadata": {}
            }
        },
        "idField": "id"
    },
    {
        "entity": "app_user",
        "accessor": "AppUser",
        "op": "list",
        "method": "GET",
        "path": "/api/projects/{projectId}/app-users",
        "args": [
            {
                "name": "project_id",
                "wire": "projectId",
                "value": "p1"
            }
        ],
        "select": {
            "status": "v1"
        },
        "headers": [
            {
                "name": "x_reqres_env",
                "wire": "X-Reqres-Env",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "statuses"
        ],
        "queryArgs": [
            {
                "name": "status",
                "wire": "statuses"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "email": "x",
                    "status": "x",
                    "last_login_at": "2026-01-01T00:00:00Z",
                    "created_at": "2026-01-01T00:00:00Z",
                    "metadata": {}
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "app_user",
        "accessor": "AppUser",
        "op": "list",
        "method": "GET",
        "path": "/api/app-users",
        "args": [],
        "select": {
            "limit": "v1"
        },
        "headers": [
            {
                "name": "x_reqres_env",
                "wire": "X-Reqres-Env",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "email": "x",
                    "status": "x",
                    "last_login_at": "2026-01-01T00:00:00Z",
                    "created_at": "2026-01-01T00:00:00Z",
                    "metadata": {}
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "app_user",
        "accessor": "AppUser",
        "op": "load",
        "method": "GET",
        "path": "/api/app-users/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "email": "x",
                "status": "x",
                "last_login_at": "2026-01-01T00:00:00Z",
                "created_at": "2026-01-01T00:00:00Z",
                "metadata": {}
            }
        },
        "idField": "id"
    },
    {
        "entity": "app_user",
        "accessor": "AppUser",
        "op": "remove",
        "method": "DELETE",
        "path": "/api/app-users/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "app_user",
        "accessor": "AppUser",
        "op": "update",
        "method": "PUT",
        "path": "/api/app-users/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "email": "x",
                "status": "x",
                "last_login_at": "2026-01-01T00:00:00Z",
                "created_at": "2026-01-01T00:00:00Z",
                "metadata": {}
            }
        },
        "idField": "id"
    },
    {
        "entity": "app_user_login",
        "accessor": "AppUserLogin",
        "op": "create",
        "method": "POST",
        "path": "/api/app-users/login",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {}
        },
        "idField": "id"
    },
    {
        "entity": "app_user_total",
        "accessor": "AppUserTotal",
        "op": "load",
        "method": "GET",
        "path": "/api/projects/{projectId}/app-users/total",
        "args": [
            {
                "name": "project_id",
                "wire": "projectId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_reqres_env",
                "wire": "X-Reqres-Env",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "total": 1
        },
        "idField": "id"
    },
    {
        "entity": "app_user_verify",
        "accessor": "AppUserVerify",
        "op": "create",
        "method": "POST",
        "path": "/api/app-users/verify",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {}
        },
        "idField": "id"
    },
    {
        "entity": "authentication",
        "accessor": "Authentication",
        "op": "create",
        "method": "POST",
        "path": "/api/logout",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "collection",
        "accessor": "Collection",
        "op": "create",
        "method": "POST",
        "path": "/api/collections",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_reqres_env",
                "wire": "X-Reqres-Env",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "data": {
                "id": "x",
                "project_id": "x",
                "user_id": "x",
                "name": "x",
                "slug": "x",
                "schema": {},
                "visibility": "x",
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z"
            }
        },
        "idField": "id"
    },
    {
        "entity": "collection",
        "accessor": "Collection",
        "op": "remove",
        "method": "DELETE",
        "path": "/api/collections/{slug}",
        "args": [
            {
                "name": "id",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_reqres_env",
                "wire": "X-Reqres-Env",
                "value": "h1"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "collection",
        "accessor": "Collection",
        "op": "update",
        "method": "PUT",
        "path": "/api/collections/{slug}",
        "args": [
            {
                "name": "id",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_reqres_env",
                "wire": "X-Reqres-Env",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "project_id": "x",
                "user_id": "x",
                "name": "x",
                "slug": "x",
                "schema": {},
                "visibility": "x",
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z"
            }
        },
        "idField": "id"
    },
    {
        "entity": "custom",
        "accessor": "Custom",
        "op": "create",
        "method": "POST",
        "path": "/api/custom/{path}",
        "args": [
            {
                "name": "id",
                "wire": "path",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "custom",
        "accessor": "Custom",
        "op": "load",
        "method": "GET",
        "path": "/api/custom/{path}",
        "args": [
            {
                "name": "id",
                "wire": "path",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "custom",
        "accessor": "Custom",
        "op": "patch",
        "method": "PATCH",
        "path": "/api/custom/{path}",
        "args": [
            {
                "name": "id",
                "wire": "path",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "custom",
        "accessor": "Custom",
        "op": "remove",
        "method": "DELETE",
        "path": "/api/custom/{path}",
        "args": [
            {
                "name": "id",
                "wire": "path",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "custom",
        "accessor": "Custom",
        "op": "update",
        "method": "PUT",
        "path": "/api/custom/{path}",
        "args": [
            {
                "name": "id",
                "wire": "path",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "legacy_mutation",
        "accessor": "LegacyMutation",
        "op": "create",
        "method": "POST",
        "path": "/api/users",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "x",
            "createdAt": "2026-01-01T00:00:00Z",
            "updatedAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "legacy_mutation",
        "accessor": "LegacyMutation",
        "op": "list",
        "method": "GET",
        "path": "/api/users",
        "args": [],
        "select": {
            "page": 1,
            "per_page": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "page": 1,
            "per_page": 1,
            "total": 1,
            "total_pages": 1,
            "data": [
                {
                    "id": 1,
                    "email": "x",
                    "first_name": "x",
                    "last_name": "x",
                    "avatar": "x"
                }
            ],
            "support": {}
        },
        "idField": "id"
    },
    {
        "entity": "legacy_mutation",
        "accessor": "LegacyMutation",
        "op": "patch",
        "method": "PATCH",
        "path": "/api/users/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "createdAt": "2026-01-01T00:00:00Z",
            "updatedAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "legacy_mutation",
        "accessor": "LegacyMutation",
        "op": "update",
        "method": "PUT",
        "path": "/api/users/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "createdAt": "2026-01-01T00:00:00Z",
            "updatedAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "legacy_unknown",
        "accessor": "LegacyUnknown",
        "op": "list",
        "method": "GET",
        "path": "/api/unknown",
        "args": [],
        "select": {
            "page": 1,
            "per_page": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "page": 1,
            "per_page": 1,
            "total": 1,
            "total_pages": 1,
            "data": [
                {
                    "id": 1,
                    "name": "x",
                    "year": 1,
                    "color": "x",
                    "pantone_value": "x"
                }
            ],
            "support": {}
        },
        "idField": "id"
    },
    {
        "entity": "legacy_unknown",
        "accessor": "LegacyUnknown",
        "op": "load",
        "method": "GET",
        "path": "/api/unknown/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "id": 1,
                "name": "x",
                "year": 1,
                "color": "x",
                "pantone_value": "x"
            },
            "support": {}
        },
        "idField": "id"
    },
    {
        "entity": "legacy_user",
        "accessor": "LegacyUser",
        "op": "load",
        "method": "GET",
        "path": "/api/users/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "id": 1,
                "email": "x",
                "first_name": "x",
                "last_name": "x",
                "avatar": "x"
            },
            "support": {}
        },
        "idField": "id"
    },
    {
        "entity": "legacy_user",
        "accessor": "LegacyUser",
        "op": "remove",
        "method": "DELETE",
        "path": "/api/users/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "login",
        "accessor": "Login",
        "op": "create",
        "method": "POST",
        "path": "/api/login",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "token": "x"
        },
        "idField": "id"
    },
    {
        "entity": "register",
        "accessor": "Register",
        "op": "create",
        "method": "POST",
        "path": "/api/register",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "token": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map