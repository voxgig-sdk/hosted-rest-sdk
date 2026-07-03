# HostedRest SDK configuration


def make_config():
    return {
        "main": {
            "name": "HostedRest",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://reqres.in",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "agent_health": {},
                "agent_sandbox": {},
                "agent_user_detail": {},
                "agent_user_list": {},
                "app_user": {},
                "app_user_login": {},
                "app_user_session": {},
                "app_user_total": {},
                "app_user_verify": {},
                "authentication": {},
                "collection": {},
                "collection_record": {},
                "collection_record_list": {},
                "custom": {},
                "legacy": {},
                "legacy_mutation": {},
                "legacy_unknown": {},
                "legacy_unknown_list": {},
                "legacy_user": {},
                "legacy_user_list": {},
                "login": {},
                "register": {},
            },
        },
        "entity": {
      "agent_health": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 0,
          },
        ],
        "name": "agent_health",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/agent/v1/health",
                "parts": [
                  "agent",
                  "v1",
                  "health",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "agent_sandbox": {
        "fields": [
          {
            "active": True,
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "password",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "agent_sandbox",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/agent/v1/auth/login",
                "parts": [
                  "agent",
                  "v1",
                  "auth",
                  "login",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cursor",
                      "orig": "cursor",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": 42,
                      "kind": "query",
                      "name": "seed",
                      "orig": "seed",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/agent/v1/orders",
                "parts": [
                  "agent",
                  "v1",
                  "orders",
                ],
                "select": {
                  "exist": [
                    "cursor",
                    "limit",
                    "seed",
                    "status",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "scenario",
                      "orig": "scenario",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/agent/v1/scenarios/{scenario}",
                "parts": [
                  "agent",
                  "v1",
                  "scenarios",
                  "{scenario}",
                ],
                "select": {
                  "exist": [
                    "scenario",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/agent/v1/scenarios",
                "parts": [
                  "agent",
                  "v1",
                  "scenarios",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 2,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "scenario",
            ],
          ],
        },
      },
      "agent_user_detail": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 0,
          },
        ],
        "name": "agent_user_detail",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "expand",
                      "orig": "expand",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/agent/v1/users/{id}",
                "parts": [
                  "agent",
                  "v1",
                  "users",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "expand",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "agent_user_list": {
        "fields": [
          {
            "active": True,
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "full_name",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "locale",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "preference",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "profile",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "timezone",
            "req": True,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "updated_at",
            "req": True,
            "type": "`$STRING`",
            "index$": 9,
          },
        ],
        "name": "agent_user_list",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cursor",
                      "orig": "cursor",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "field",
                      "orig": "field",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": 42,
                      "kind": "query",
                      "name": "seed",
                      "orig": "seed",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/agent/v1/users",
                "parts": [
                  "agent",
                  "v1",
                  "users",
                ],
                "select": {
                  "exist": [
                    "cursor",
                    "field",
                    "limit",
                    "seed",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "app_user": {
        "fields": [
          {
            "active": True,
            "name": "created_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "email",
            "op": {
              "update": {
                "req": False,
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "last_login_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "metadata",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
        ],
        "name": "app_user",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "POST",
                "orig": "/api/app-users/{id}/sessions/simulate",
                "parts": [
                  "api",
                  "app-users",
                  "{id}",
                  "sessions",
                  "simulate",
                ],
                "select": {
                  "$action": "session_simulate",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/api/app-users",
                "parts": [
                  "api",
                  "app-users",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/projects/{projectId}/app-users",
                "parts": [
                  "api",
                  "projects",
                  "{project_id}",
                  "app-users",
                ],
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
                "select": {
                  "exist": [
                    "project_id",
                    "status",
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/app-users",
                "parts": [
                  "api",
                  "app-users",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/app-users/{id}",
                "parts": [
                  "api",
                  "app-users",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "record_id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "DELETE",
                "orig": "/app/collections/{slug}/records/{recordId}",
                "parts": [
                  "app",
                  "collections",
                  "{collection_id}",
                  "records",
                  "{record_id}",
                ],
                "rename": {
                  "param": {
                    "recordId": "record_id",
                    "slug": "collection_id",
                  },
                },
                "select": {
                  "exist": [
                    "collection_id",
                    "record_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "DELETE",
                "orig": "/api/app-users/{id}",
                "parts": [
                  "api",
                  "app-users",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "remove",
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "PUT",
                "orig": "/api/app-users/{id}",
                "parts": [
                  "api",
                  "app-users",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "update",
          },
        },
        "relations": {
          "ancestors": [
            [
              "project",
            ],
            [
              "collection",
              "record",
            ],
          ],
        },
      },
      "app_user_login": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "metadata",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "project_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "app_user_login",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/api/app-users/login",
                "parts": [
                  "api",
                  "app-users",
                  "login",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "app_user_session": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 0,
          },
        ],
        "name": "app_user_session",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/app-users/me",
                "parts": [
                  "api",
                  "app-users",
                  "me",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/app/me",
                "parts": [
                  "app",
                  "me",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "app_user_total": {
        "fields": [
          {
            "active": True,
            "name": "total",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 0,
          },
        ],
        "name": "app_user_total",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/projects/{projectId}/app-users/total",
                "parts": [
                  "api",
                  "projects",
                  "{project_id}",
                  "app-users",
                  "total",
                ],
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
                "select": {
                  "exist": [
                    "project_id",
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "project",
            ],
          ],
        },
      },
      "app_user_verify": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "token",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "app_user_verify",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/api/app-users/verify",
                "parts": [
                  "api",
                  "app-users",
                  "verify",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/api/logout",
                "parts": [
                  "api",
                  "logout",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "collection": {
        "fields": [
          {
            "active": True,
            "name": "created_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "name",
            "op": {
              "update": {
                "req": False,
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "project_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "schema",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "slug",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "updated_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "user_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "visibility",
            "req": False,
            "type": "`$STRING`",
            "index$": 9,
          },
        ],
        "name": "collection",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "POST",
                "orig": "/api/collections",
                "parts": [
                  "api",
                  "collections",
                ],
                "select": {
                  "exist": [
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/collections",
                "parts": [
                  "api",
                  "collections",
                ],
                "select": {
                  "exist": [
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/app/collections",
                "parts": [
                  "app",
                  "collections",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/collections/{slug}",
                "parts": [
                  "api",
                  "collections",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "slug": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/app/collections/{slug}",
                "parts": [
                  "app",
                  "collections",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "slug": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "record_id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "DELETE",
                "orig": "/api/collections/{slug}/records/{recordId}",
                "parts": [
                  "api",
                  "collections",
                  "{collection_id}",
                  "records",
                  "{record_id}",
                ],
                "rename": {
                  "param": {
                    "recordId": "record_id",
                    "slug": "collection_id",
                  },
                },
                "select": {
                  "exist": [
                    "collection_id",
                    "record_id",
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "DELETE",
                "orig": "/api/collections/{slug}",
                "parts": [
                  "api",
                  "collections",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "slug": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "remove",
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "PUT",
                "orig": "/api/collections/{slug}",
                "parts": [
                  "api",
                  "collections",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "slug": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "update",
          },
        },
        "relations": {
          "ancestors": [
            [
              "collection",
              "record",
            ],
          ],
        },
      },
      "collection_record": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 0,
          },
        ],
        "name": "collection_record",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "POST",
                "orig": "/api/collections/{slug}/records",
                "parts": [
                  "api",
                  "collections",
                  "{slug}",
                  "records",
                ],
                "select": {
                  "exist": [
                    "slug",
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "POST",
                "orig": "/app/collections/{slug}/records",
                "parts": [
                  "app",
                  "collections",
                  "{slug}",
                  "records",
                ],
                "select": {
                  "exist": [
                    "slug",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "create",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/collections/{slug}/records/{recordId}",
                "parts": [
                  "api",
                  "collections",
                  "{collection_id}",
                  "records",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "recordId": "id",
                    "slug": "collection_id",
                  },
                },
                "select": {
                  "exist": [
                    "collection_id",
                    "id",
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/app/collections/{slug}/records/{recordId}",
                "parts": [
                  "app",
                  "collections",
                  "{collection_id}",
                  "records",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "recordId": "id",
                    "slug": "collection_id",
                  },
                },
                "select": {
                  "exist": [
                    "collection_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "PUT",
                "orig": "/api/collections/{slug}/records/{recordId}",
                "parts": [
                  "api",
                  "collections",
                  "{collection_id}",
                  "records",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "recordId": "id",
                    "slug": "collection_id",
                  },
                },
                "select": {
                  "exist": [
                    "collection_id",
                    "id",
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "PUT",
                "orig": "/app/collections/{slug}/records/{recordId}",
                "parts": [
                  "app",
                  "collections",
                  "{collection_id}",
                  "records",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "recordId": "id",
                    "slug": "collection_id",
                  },
                },
                "select": {
                  "exist": [
                    "collection_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "update",
          },
        },
        "relations": {
          "ancestors": [
            [
              "collection",
            ],
          ],
        },
      },
      "collection_record_list": {
        "fields": [
          {
            "active": True,
            "name": "app_user_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "collection_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "created_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "created_by",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "deleted_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "project_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "updated_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
        ],
        "name": "collection_record_list",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "header": [
                    {
                      "active": True,
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "created_after",
                      "orig": "created_after",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "created_before",
                      "orig": "created_before",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "data_contain",
                      "orig": "data_contain",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "include_deleted",
                      "orig": "include_deleted",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "order",
                      "orig": "order",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/collections/{slug}/records",
                "parts": [
                  "api",
                  "collections",
                  "{slug}",
                  "records",
                ],
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
                    "x_reqres_env",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/app/collections/{slug}/records",
                "parts": [
                  "app",
                  "collections",
                  "{slug}",
                  "records",
                ],
                "select": {
                  "exist": [
                    "slug",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [
            [
              "collection",
            ],
          ],
        },
      },
      "custom": {
        "fields": [],
        "name": "custom",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "POST",
                "orig": "/api/custom/{path}",
                "parts": [
                  "api",
                  "custom",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "path": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/custom/{path}",
                "parts": [
                  "api",
                  "custom",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "path": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "PATCH",
                "orig": "/api/custom/{path}",
                "parts": [
                  "api",
                  "custom",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "path": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "patch",
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "DELETE",
                "orig": "/api/custom/{path}",
                "parts": [
                  "api",
                  "custom",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "path": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "remove",
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "PUT",
                "orig": "/api/custom/{path}",
                "parts": [
                  "api",
                  "custom",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "path": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "update",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "legacy": {
        "fields": [],
        "name": "legacy",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "DELETE",
                "orig": "/api/users/{id}",
                "parts": [
                  "api",
                  "users",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "remove",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "legacy_mutation": {
        "fields": [
          {
            "active": True,
            "name": "created_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "updated_at",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "legacy_mutation",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/api/users",
                "parts": [
                  "api",
                  "users",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "PATCH",
                "orig": "/api/users/{id}",
                "parts": [
                  "api",
                  "users",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "patch",
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "PUT",
                "orig": "/api/users/{id}",
                "parts": [
                  "api",
                  "users",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "update",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "legacy_unknown": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "support",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
        ],
        "name": "legacy_unknown",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/unknown/{id}",
                "parts": [
                  "api",
                  "unknown",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "legacy_unknown_list": {
        "fields": [
          {
            "active": True,
            "name": "color",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "pantone_value",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "year",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 4,
          },
        ],
        "name": "legacy_unknown_list",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/unknown",
                "parts": [
                  "api",
                  "unknown",
                ],
                "select": {
                  "exist": [
                    "page",
                    "per_page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "legacy_user": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "support",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
        ],
        "name": "legacy_user",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/users/{id}",
                "parts": [
                  "api",
                  "users",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "legacy_user_list": {
        "fields": [
          {
            "active": True,
            "name": "avatar",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "first_name",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "last_name",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
        ],
        "name": "legacy_user_list",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/users",
                "parts": [
                  "api",
                  "users",
                ],
                "select": {
                  "exist": [
                    "page",
                    "per_page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "login": {
        "fields": [
          {
            "active": True,
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "password",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "token",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "login",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/api/login",
                "parts": [
                  "api",
                  "login",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "register": {
        "fields": [
          {
            "active": True,
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "password",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "token",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "register",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/api/register",
                "parts": [
                  "api",
                  "register",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
