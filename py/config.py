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
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
        ],
        "name": "agent_health",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/agent/v1/health",
                "parts": [
                  "agent",
                  "v1",
                  "health",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "password",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "agent_sandbox",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/agent/v1/auth/login",
                "parts": [
                  "agent",
                  "v1",
                  "auth",
                  "login",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "cursor",
                      "orig": "cursor",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": 42,
                      "kind": "query",
                      "name": "seed",
                      "orig": "seed",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "scenario",
                      "orig": "scenario",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 1,
              },
              {
                "method": "GET",
                "orig": "/agent/v1/scenarios",
                "parts": [
                  "agent",
                  "v1",
                  "scenarios",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 2,
              },
            ],
            "input": "data",
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
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
        ],
        "name": "agent_user_detail",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "expand",
                      "orig": "expand",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "full_name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "locale",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "preference",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "profile",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "status",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "timezone",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "updated_at",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
        ],
        "name": "agent_user_list",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "cursor",
                      "orig": "cursor",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "field",
                      "orig": "field",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": 42,
                      "kind": "query",
                      "name": "seed",
                      "orig": "seed",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "created_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "email",
            "op": {
              "update": {
                "req": False,
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "last_login_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "metadata",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
        ],
        "name": "app_user",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "method": "POST",
                "orig": "/api/app-users",
                "parts": [
                  "api",
                  "app-users",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "create",
          },
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
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
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
          "remove": {
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "record_id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "remove",
          },
          "update": {
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "metadata",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "project_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "app_user_login",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/api/app-users/login",
                "parts": [
                  "api",
                  "app-users",
                  "login",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
        ],
        "name": "app_user_session",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/api/app-users/me",
                "parts": [
                  "api",
                  "app-users",
                  "me",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
              {
                "method": "GET",
                "orig": "/app/me",
                "parts": [
                  "app",
                  "me",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 1,
              },
            ],
            "input": "data",
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
            "name": "total",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
        ],
        "name": "app_user_total",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "token",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "app_user_verify",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/api/app-users/verify",
                "parts": [
                  "api",
                  "app-users",
                  "verify",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/api/logout",
                "parts": [
                  "api",
                  "logout",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "created_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "name",
            "op": {
              "update": {
                "req": False,
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "project_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "schema",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "slug",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "updated_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "user_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "visibility",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
        ],
        "name": "collection",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "method": "GET",
                "orig": "/app/collections",
                "parts": [
                  "app",
                  "collections",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "load",
          },
          "remove": {
            "name": "remove",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "record_id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "remove",
          },
          "update": {
            "name": "update",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
        ],
        "name": "collection_record",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "create",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "load",
          },
          "update": {
            "name": "update",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "record_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
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
            "name": "app_user_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "collection_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "created_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "created_by",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "deleted_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "project_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "updated_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 8,
          },
        ],
        "name": "collection_record_list",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "x_reqres_env",
                      "orig": "x_reqres_env",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "created_after",
                      "orig": "created_after",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "created_before",
                      "orig": "created_before",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "data_contain",
                      "orig": "data_contain",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include_deleted",
                      "orig": "include_deleted",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "order",
                      "orig": "order",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
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
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
          "patch": {
            "name": "patch",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "patch",
          },
          "remove": {
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "remove",
          },
          "update": {
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "created_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "updated_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "legacy_mutation",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/api/users",
                "parts": [
                  "api",
                  "users",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
          "patch": {
            "name": "patch",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "patch",
          },
          "update": {
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "support",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "legacy_unknown",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "color",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "pantone_value",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "year",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "legacy_unknown_list",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "data",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "support",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "legacy_user",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "avatar",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "first_name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "last_name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "legacy_user_list",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "password",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "token",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "login",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/api/login",
                "parts": [
                  "api",
                  "login",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "email",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "password",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "token",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "register",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/api/register",
                "parts": [
                  "api",
                  "register",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
