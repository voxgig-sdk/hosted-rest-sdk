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
        "query": [],
        "auth": [],
        "status": 200,
        "sample": {
            "data": {
                "deprecations": [
                    {}
                ],
                "rate_limit_status": {
                    "limit_today": 1,
                    "remaining_today": 1,
                    "reset_at": "2026-01-01T00:00:00Z",
                    "tier": "x"
                },
                "status": "healthy",
                "uptime_seconds": 1,
                "version": "x"
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
        "query": [],
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
        "path": "/agent/v1/orders",
        "args": [],
        "select": {
            "cursor": "v1",
            "limit": "v1",
            "seed": "v1",
            "status": "v1"
        },
        "headers": [],
        "query": [
            "cursor",
            "limit",
            "status",
            "seed"
        ],
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
        "query": [],
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
        "path": "/agent/v1/scenarios",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
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
            "limit": "v1",
            "seed": "v1"
        },
        "headers": [],
        "query": [
            "cursor",
            "limit",
            "fields",
            "seed"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "data": [
                {
                    "created_at": "2026-01-01T00:00:00Z",
                    "email": "x",
                    "full_name": "x",
                    "id": "x",
                    "locale": "x",
                    "preferences": {},
                    "profile": {
                        "avatar_url": "x",
                        "bio": "x",
                        "company": {
                            "department": "x",
                            "employee_id": "x",
                            "name": "x"
                        },
                        "social": {
                            "github": "x",
                            "linkedin": "x",
                            "twitter": "x"
                        }
                    },
                    "status": "active",
                    "timezone": "x",
                    "updated_at": "2026-01-01T00:00:00Z"
                }
            ],
            "meta": {
                "has_more": true,
                "limit": 1,
                "next_cursor": "x",
                "prev_cursor": "x",
                "returned": 1,
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
        "query": [
            "expand"
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
                        "department": "x",
                        "employee_id": "x",
                        "name": "x"
                    },
                    "social": {
                        "github": "x",
                        "linkedin": "x",
                        "twitter": "x"
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
        "query": [],
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
        "query": [],
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
        "query": [
            "statuses"
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
                    "created_at": "2026-01-01T00:00:00Z",
                    "email": "x",
                    "id": "x",
                    "last_login_at": "2026-01-01T00:00:00Z",
                    "metadata": {},
                    "status": "x"
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
        "query": [
            "limit"
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
                    "created_at": "2026-01-01T00:00:00Z",
                    "email": "x",
                    "id": "x",
                    "last_login_at": "2026-01-01T00:00:00Z",
                    "metadata": {},
                    "status": "x"
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
        "query": [],
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
        "path": "/app/collections/{slug}/records/{recordId}",
        "args": [
            {
                "name": "collection_id",
                "wire": "slug",
                "value": "p1"
            },
            {
                "name": "record_id",
                "wire": "recordId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
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
        "query": [],
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
        "query": [],
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
        "query": [],
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
        "query": [],
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
        "query": [],
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
        "query": [],
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
        "query": [],
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
        "op": "list",
        "method": "GET",
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
        "query": [],
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
                    "created_at": "2026-01-01T00:00:00Z",
                    "id": "x",
                    "name": "x",
                    "project_id": "x",
                    "schema": {},
                    "slug": "x",
                    "updated_at": "2026-01-01T00:00:00Z",
                    "user_id": "x",
                    "visibility": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "collection",
        "accessor": "Collection",
        "op": "list",
        "method": "GET",
        "path": "/app/collections",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "created_at": "2026-01-01T00:00:00Z",
                    "id": "x",
                    "name": "x",
                    "project_id": "x",
                    "schema": {},
                    "slug": "x",
                    "updated_at": "2026-01-01T00:00:00Z",
                    "user_id": "x",
                    "visibility": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "collection",
        "accessor": "Collection",
        "op": "load",
        "method": "GET",
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
        "query": [],
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
        "entity": "collection",
        "accessor": "Collection",
        "op": "load",
        "method": "GET",
        "path": "/app/collections/{slug}",
        "args": [
            {
                "name": "id",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
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
        "entity": "collection",
        "accessor": "Collection",
        "op": "remove",
        "method": "DELETE",
        "path": "/api/collections/{slug}/records/{recordId}",
        "args": [
            {
                "name": "collection_id",
                "wire": "slug",
                "value": "p1"
            },
            {
                "name": "record_id",
                "wire": "recordId",
                "value": "p2"
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
        "query": [],
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
        "query": [],
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
        "query": [],
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
        "entity": "collection_record",
        "accessor": "CollectionRecord",
        "op": "create",
        "method": "POST",
        "path": "/api/collections/{slug}/records",
        "args": [
            {
                "name": "slug",
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
        "query": [],
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
                "collection_id": "x",
                "project_id": "x",
                "app_user_id": "x",
                "created_by": "x",
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "deleted_at": "2026-01-01T00:00:00Z",
                "data": {}
            }
        },
        "idField": "id"
    },
    {
        "entity": "collection_record",
        "accessor": "CollectionRecord",
        "op": "create",
        "method": "POST",
        "path": "/app/collections/{slug}/records",
        "args": [
            {
                "name": "slug",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 201,
        "sample": {
            "data": {
                "id": "x",
                "collection_id": "x",
                "project_id": "x",
                "app_user_id": "x",
                "created_by": "x",
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "deleted_at": "2026-01-01T00:00:00Z",
                "data": {}
            }
        },
        "idField": "id"
    },
    {
        "entity": "collection_record",
        "accessor": "CollectionRecord",
        "op": "list",
        "method": "GET",
        "path": "/api/collections/{slug}/records",
        "args": [
            {
                "name": "slug",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {
            "created_after": "v1",
            "created_before": "v1",
            "data_contain": "v1",
            "include_deleted": "v1",
            "limit": "v1",
            "order": "v1",
            "page": "v1",
            "search": "v1"
        },
        "headers": [
            {
                "name": "x_reqres_env",
                "wire": "X-Reqres-Env",
                "value": "h1"
            }
        ],
        "query": [
            "page",
            "limit",
            "search",
            "created_before",
            "created_after",
            "data_contains",
            "order",
            "include_deleted"
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
                    "app_user_id": "x",
                    "collection_id": "x",
                    "created_at": "2026-01-01T00:00:00Z",
                    "created_by": "x",
                    "data": {},
                    "deleted_at": "2026-01-01T00:00:00Z",
                    "id": "x",
                    "project_id": "x",
                    "updated_at": "2026-01-01T00:00:00Z"
                }
            ],
            "meta": {
                "limit": 1,
                "page": 1,
                "pages": 1,
                "total": 1
            }
        },
        "idField": "id"
    },
    {
        "entity": "collection_record",
        "accessor": "CollectionRecord",
        "op": "list",
        "method": "GET",
        "path": "/app/collections/{slug}/records",
        "args": [
            {
                "name": "slug",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "app_user_id": "x",
                    "collection_id": "x",
                    "created_at": "2026-01-01T00:00:00Z",
                    "created_by": "x",
                    "data": {},
                    "deleted_at": "2026-01-01T00:00:00Z",
                    "id": "x",
                    "project_id": "x",
                    "updated_at": "2026-01-01T00:00:00Z"
                }
            ],
            "meta": {
                "limit": 1,
                "page": 1,
                "pages": 1,
                "total": 1
            }
        },
        "idField": "id"
    },
    {
        "entity": "collection_record",
        "accessor": "CollectionRecord",
        "op": "load",
        "method": "GET",
        "path": "/api/collections/{slug}/records/{recordId}",
        "args": [
            {
                "name": "collection_id",
                "wire": "slug",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "recordId",
                "value": "p2"
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
        "query": [],
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
                "collection_id": "x",
                "project_id": "x",
                "app_user_id": "x",
                "created_by": "x",
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "deleted_at": "2026-01-01T00:00:00Z",
                "data": {}
            }
        },
        "idField": "id"
    },
    {
        "entity": "collection_record",
        "accessor": "CollectionRecord",
        "op": "load",
        "method": "GET",
        "path": "/app/collections/{slug}/records/{recordId}",
        "args": [
            {
                "name": "collection_id",
                "wire": "slug",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "recordId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "collection_id": "x",
                "project_id": "x",
                "app_user_id": "x",
                "created_by": "x",
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "deleted_at": "2026-01-01T00:00:00Z",
                "data": {}
            }
        },
        "idField": "id"
    },
    {
        "entity": "collection_record",
        "accessor": "CollectionRecord",
        "op": "update",
        "method": "PUT",
        "path": "/api/collections/{slug}/records/{recordId}",
        "args": [
            {
                "name": "collection_id",
                "wire": "slug",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "recordId",
                "value": "p2"
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
        "query": [],
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
                "collection_id": "x",
                "project_id": "x",
                "app_user_id": "x",
                "created_by": "x",
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "deleted_at": "2026-01-01T00:00:00Z",
                "data": {}
            }
        },
        "idField": "id"
    },
    {
        "entity": "collection_record",
        "accessor": "CollectionRecord",
        "op": "update",
        "method": "PUT",
        "path": "/app/collections/{slug}/records/{recordId}",
        "args": [
            {
                "name": "collection_id",
                "wire": "slug",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "recordId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "collection_id": "x",
                "project_id": "x",
                "app_user_id": "x",
                "created_by": "x",
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "deleted_at": "2026-01-01T00:00:00Z",
                "data": {}
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
        "query": [],
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
        "query": [],
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
        "query": [],
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
        "query": [],
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
        "entity": "legacy",
        "accessor": "Legacy",
        "op": "create",
        "method": "POST",
        "path": "/api/users",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
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
        "entity": "legacy",
        "accessor": "Legacy",
        "op": "list",
        "method": "GET",
        "path": "/api/users",
        "args": [],
        "select": {
            "page": "v1",
            "per_page": "v1"
        },
        "headers": [],
        "query": [
            "page",
            "per_page"
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
                    "avatar": "x",
                    "email": "x",
                    "first_name": "x",
                    "id": 1,
                    "last_name": "x"
                }
            ],
            "support": {}
        },
        "idField": "id"
    },
    {
        "entity": "legacy",
        "accessor": "Legacy",
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
        "query": [],
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
        "query": [],
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
            "page": "v1",
            "per_page": "v1"
        },
        "headers": [],
        "query": [
            "page",
            "per_page"
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
                    "color": "x",
                    "id": 1,
                    "name": "x",
                    "pantone_value": "x",
                    "year": 1
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
        "query": [],
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
        "query": [],
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
        "entity": "login",
        "accessor": "Login",
        "op": "create",
        "method": "POST",
        "path": "/api/login",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
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
        "query": [],
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