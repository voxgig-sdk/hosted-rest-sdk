# HostedRest SDK configuration

module HostedRestConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "HostedRest",
        "slug" => "hosted-rest",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://reqres.in",
        "auth" => {
          "prefix" => "",
          "name" => "x-api-key",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "agent_health" => {},
          "agent_sandbox" => {},
          "agent_user_detail" => {},
          "agent_user_list" => {},
          "app_user" => {},
          "app_user_login" => {},
          "app_user_session" => {},
          "app_user_total" => {},
          "app_user_verify" => {},
          "authentication" => {},
          "collection" => {},
          "collection_record" => {},
          "collection_record_list" => {},
          "custom" => {},
          "legacy" => {},
          "legacy_mutation" => {},
          "legacy_unknown" => {},
          "legacy_unknown_list" => {},
          "legacy_user" => {},
          "legacy_user_list" => {},
          "login" => {},
          "register" => {},
        },
      },
      "entity" => {
        "agent_health" => {
          "fields" => [
            {
              "name" => "deprecations",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "rate_limit_status",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "status",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "uptime_seconds",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "version",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "agent_health",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/agent/v1/health",
                  "segments" => [
                    {
                      "lit" => "agent",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "health",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "agent",
                    "v1",
                    "health",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "agent_sandbox" => {
          "fields" => [
            {
              "format" => "email",
              "name" => "email",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "password",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "agent_sandbox",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/agent/v1/auth/login",
                  "segments" => [
                    {
                      "lit" => "agent",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "auth",
                    },
                    {
                      "lit" => "login",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "agent",
                    "v1",
                    "auth",
                    "login",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cursor",
                        "orig" => "cursor",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 42,
                        "kind" => "query",
                        "name" => "seed",
                        "orig" => "seed",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "status",
                        "orig" => "status",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/agent/v1/orders",
                  "segments" => [
                    {
                      "lit" => "agent",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "orders",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cursor",
                      "limit",
                      "seed",
                      "status",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "agent",
                    "v1",
                    "orders",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "scenario",
                        "orig" => "scenario",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/agent/v1/scenarios/{scenario}",
                  "segments" => [
                    {
                      "lit" => "agent",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "scenarios",
                    },
                    {
                      "var" => "scenario",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "scenario",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "agent",
                    "v1",
                    "scenarios",
                    "{scenario}",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/agent/v1/scenarios",
                  "segments" => [
                    {
                      "lit" => "agent",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "scenarios",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "agent",
                    "v1",
                    "scenarios",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "scenario",
              ],
            ],
          },
        },
        "agent_user_detail" => {
          "fields" => [
            {
              "format" => "date-time",
              "name" => "created_at",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "format" => "email",
              "name" => "email",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "full_name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "locale",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "preferences",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "profile",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "status",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "timezone",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "updated_at",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "agent_user_detail",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "expand",
                        "orig" => "expand",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/agent/v1/users/{id}",
                  "segments" => [
                    {
                      "lit" => "agent",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "users",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "expand",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "agent",
                    "v1",
                    "users",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "agent_user_list" => {
          "fields" => [
            {
              "format" => "date-time",
              "name" => "created_at",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "format" => "email",
              "name" => "email",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "full_name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "locale",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "preferences",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "profile",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "status",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "timezone",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "updated_at",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "agent_user_list",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cursor",
                        "orig" => "cursor",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 42,
                        "kind" => "query",
                        "name" => "seed",
                        "orig" => "seed",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/agent/v1/users",
                  "segments" => [
                    {
                      "lit" => "agent",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "users",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cursor",
                      "field",
                      "limit",
                      "seed",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "agent",
                    "v1",
                    "users",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "app_user" => {
          "fields" => [
            {
              "format" => "date-time",
              "name" => "created_at",
              "type" => "`$STRING`",
            },
            {
              "format" => "email",
              "name" => "email",
              "op" => {
                "update" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "last_login_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "metadata",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "status",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "app_user",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/app-users/{id}/sessions/simulate",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "app-users",
                    },
                    {
                      "var" => "id",
                    },
                    {
                      "lit" => "sessions",
                    },
                    {
                      "lit" => "simulate",
                    },
                  ],
                  "select" => {
                    "$action" => "session_simulate",
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "app-users",
                    "{id}",
                    "sessions",
                    "simulate",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/app-users",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "app-users",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "app-users",
                  ],
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "project_id",
                        "orig" => "project_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "status",
                        "orig" => "status",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/projects/{projectId}/app-users",
                  "rename" => {
                    "param" => {
                      "projectId" => "project_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "projects",
                    },
                    {
                      "var" => "project_id",
                    },
                    {
                      "lit" => "app-users",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "project_id",
                      "status",
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "projects",
                    "{project_id}",
                    "app-users",
                  ],
                },
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/app-users",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "app-users",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "app-users",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/app-users/{id}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "app-users",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "app-users",
                    "{id}",
                  ],
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "collection_id",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "record_id",
                        "orig" => "record_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/app/collections/{slug}/records/{recordId}",
                  "rename" => {
                    "param" => {
                      "recordId" => "record_id",
                      "slug" => "collection_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "app",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "collection_id",
                    },
                    {
                      "lit" => "records",
                    },
                    {
                      "var" => "record_id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "collection_id",
                      "record_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "app",
                    "collections",
                    "{collection_id}",
                    "records",
                    "{record_id}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/api/app-users/{id}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "app-users",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "app-users",
                    "{id}",
                  ],
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/api/app-users/{id}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "app-users",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "app-users",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
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
        "app_user_login" => {
          "fields" => [
            {
              "format" => "email",
              "name" => "email",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "metadata",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "project_id",
              "type" => "`$STRING`",
              "union" => {
                "branches" => 2,
                "count" => 1,
                "depth" => 0,
              },
            },
          ],
          "name" => "app_user_login",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/app-users/login",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "app-users",
                    },
                    {
                      "lit" => "login",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "app-users",
                    "login",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "app_user_session" => {
          "fields" => [],
          "name" => "app_user_session",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/app-users/me",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "app-users",
                    },
                    {
                      "lit" => "me",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "app-users",
                    "me",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/app/me",
                  "segments" => [
                    {
                      "lit" => "app",
                    },
                    {
                      "lit" => "me",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "app",
                    "me",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "app_user_total" => {
          "fields" => [
            {
              "name" => "total",
              "req" => true,
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "app_user_total",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "project_id",
                        "orig" => "project_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/projects/{projectId}/app-users/total",
                  "rename" => {
                    "param" => {
                      "projectId" => "project_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "projects",
                    },
                    {
                      "var" => "project_id",
                    },
                    {
                      "lit" => "app-users",
                    },
                    {
                      "lit" => "total",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "project_id",
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "projects",
                    "{project_id}",
                    "app-users",
                    "total",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "project",
              ],
            ],
          },
        },
        "app_user_verify" => {
          "fields" => [
            {
              "name" => "token",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "app_user_verify",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/app-users/verify",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "app-users",
                    },
                    {
                      "lit" => "verify",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "app-users",
                    "verify",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "authentication" => {
          "fields" => [],
          "name" => "authentication",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/logout",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "logout",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "logout",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "collection" => {
          "fields" => [
            {
              "format" => "date-time",
              "name" => "created_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "op" => {
                "update" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "project_id",
              "type" => "`$STRING`",
            },
            {
              "name" => "schema",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "slug",
              "op" => {
                "create" => {
                  "type" => "`$STRING`",
                },
                "update" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "updated_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "user_id",
              "type" => "`$STRING`",
            },
            {
              "name" => "visibility",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "collection",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/collections",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "collections",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "collections",
                  ],
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/collections",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "collections",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "collections",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/app/collections",
                  "segments" => [
                    {
                      "lit" => "app",
                    },
                    {
                      "lit" => "collections",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "app",
                    "collections",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/collections/{slug}",
                  "rename" => {
                    "param" => {
                      "slug" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "collections",
                    "{id}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/app/collections/{slug}",
                  "rename" => {
                    "param" => {
                      "slug" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "app",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "app",
                    "collections",
                    "{id}",
                  ],
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "collection_id",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "record_id",
                        "orig" => "record_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/api/collections/{slug}/records/{recordId}",
                  "rename" => {
                    "param" => {
                      "recordId" => "record_id",
                      "slug" => "collection_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "collection_id",
                    },
                    {
                      "lit" => "records",
                    },
                    {
                      "var" => "record_id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "collection_id",
                      "record_id",
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "collections",
                    "{collection_id}",
                    "records",
                    "{record_id}",
                  ],
                },
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/api/collections/{slug}",
                  "rename" => {
                    "param" => {
                      "slug" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "collections",
                    "{id}",
                  ],
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/api/collections/{slug}",
                  "rename" => {
                    "param" => {
                      "slug" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "collections",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "collection",
                "record",
              ],
            ],
          },
        },
        "collection_record" => {
          "fields" => [
            {
              "name" => "app_user_id",
              "type" => "`$STRING`",
            },
            {
              "name" => "collection_id",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "created_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "created_by",
              "type" => "`$STRING`",
            },
            {
              "name" => "data",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "format" => "date-time",
              "name" => "deleted_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "project_id",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "updated_at",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "collection_record",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "slug",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/collections/{slug}/records",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "slug",
                    },
                    {
                      "lit" => "records",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "slug",
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "collections",
                    "{slug}",
                    "records",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "slug",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/app/collections/{slug}/records",
                  "segments" => [
                    {
                      "lit" => "app",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "slug",
                    },
                    {
                      "lit" => "records",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "slug",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "app",
                    "collections",
                    "{slug}",
                    "records",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "collection_id",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "record_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/collections/{slug}/records/{recordId}",
                  "rename" => {
                    "param" => {
                      "recordId" => "id",
                      "slug" => "collection_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "collection_id",
                    },
                    {
                      "lit" => "records",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "collection_id",
                      "id",
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "collections",
                    "{collection_id}",
                    "records",
                    "{id}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "collection_id",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "record_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/app/collections/{slug}/records/{recordId}",
                  "rename" => {
                    "param" => {
                      "recordId" => "id",
                      "slug" => "collection_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "app",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "collection_id",
                    },
                    {
                      "lit" => "records",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "collection_id",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "app",
                    "collections",
                    "{collection_id}",
                    "records",
                    "{id}",
                  ],
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "collection_id",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "record_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/api/collections/{slug}/records/{recordId}",
                  "rename" => {
                    "param" => {
                      "recordId" => "id",
                      "slug" => "collection_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "collection_id",
                    },
                    {
                      "lit" => "records",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "collection_id",
                      "id",
                      "x_reqres_env",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "api",
                    "collections",
                    "{collection_id}",
                    "records",
                    "{id}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "collection_id",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "record_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/app/collections/{slug}/records/{recordId}",
                  "rename" => {
                    "param" => {
                      "recordId" => "id",
                      "slug" => "collection_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "app",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "collection_id",
                    },
                    {
                      "lit" => "records",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "collection_id",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "app",
                    "collections",
                    "{collection_id}",
                    "records",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "collection",
              ],
            ],
          },
        },
        "collection_record_list" => {
          "fields" => [
            {
              "name" => "app_user_id",
              "type" => "`$STRING`",
            },
            {
              "name" => "collection_id",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "created_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "created_by",
              "type" => "`$STRING`",
            },
            {
              "name" => "data",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "format" => "date-time",
              "name" => "deleted_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "project_id",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "updated_at",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "collection_record_list",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "x_reqres_env",
                        "orig" => "x_reqres_env",
                        "type" => "`$STRING`",
                      },
                    ],
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "slug",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "created_after",
                        "orig" => "created_after",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "created_before",
                        "orig" => "created_before",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "data_contain",
                        "orig" => "data_contain",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "include_deleted",
                        "orig" => "include_deleted",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "order",
                        "orig" => "order",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/collections/{slug}/records",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "slug",
                    },
                    {
                      "lit" => "records",
                    },
                  ],
                  "select" => {
                    "exist" => [
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "collections",
                    "{slug}",
                    "records",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "slug",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/app/collections/{slug}/records",
                  "segments" => [
                    {
                      "lit" => "app",
                    },
                    {
                      "lit" => "collections",
                    },
                    {
                      "var" => "slug",
                    },
                    {
                      "lit" => "records",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "slug",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "app",
                    "collections",
                    "{slug}",
                    "records",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "collection",
              ],
            ],
          },
        },
        "custom" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "custom",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "path",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/custom/{path}",
                  "rename" => {
                    "param" => {
                      "path" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "custom",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "custom",
                    "{id}",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "path",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/custom/{path}",
                  "rename" => {
                    "param" => {
                      "path" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "custom",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "custom",
                    "{id}",
                  ],
                },
              ],
            },
            "patch" => {
              "input" => "data",
              "name" => "patch",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "path",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PATCH",
                  "orig" => "/api/custom/{path}",
                  "rename" => {
                    "param" => {
                      "path" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "custom",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "custom",
                    "{id}",
                  ],
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "path",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/api/custom/{path}",
                  "rename" => {
                    "param" => {
                      "path" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "custom",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "custom",
                    "{id}",
                  ],
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "path",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/api/custom/{path}",
                  "rename" => {
                    "param" => {
                      "path" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "custom",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "custom",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "legacy" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "legacy",
          "op" => {
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/api/users/{id}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "users",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "users",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "legacy_mutation" => {
          "fields" => [
            {
              "format" => "date-time",
              "name" => "createdAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "updatedAt",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "legacy_mutation",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/users",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "users",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "users",
                  ],
                },
              ],
            },
            "patch" => {
              "input" => "data",
              "name" => "patch",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PATCH",
                  "orig" => "/api/users/{id}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "users",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "users",
                    "{id}",
                  ],
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/api/users/{id}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "users",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "users",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "legacy_unknown" => {
          "fields" => [
            {
              "name" => "data",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "support",
              "type" => "`$OBJECT`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "legacy_unknown",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/unknown/{id}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "unknown",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "unknown",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "legacy_unknown_list" => {
          "fields" => [
            {
              "name" => "color",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "pantone_value",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "year",
              "req" => true,
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "legacy_unknown_list",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "per_page",
                        "orig" => "per_page",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/unknown",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "unknown",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "per_page",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "unknown",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "legacy_user" => {
          "fields" => [
            {
              "name" => "data",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "support",
              "type" => "`$OBJECT`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "legacy_user",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/users/{id}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "users",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "users",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "legacy_user_list" => {
          "fields" => [
            {
              "name" => "avatar",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "format" => "email",
              "name" => "email",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "first_name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "last_name",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "legacy_user_list",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "per_page",
                        "orig" => "per_page",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/users",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "users",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "per_page",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "users",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "login" => {
          "fields" => [
            {
              "format" => "email",
              "name" => "email",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "password",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "token",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "login",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/login",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "login",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "login",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "register" => {
          "fields" => [
            {
              "format" => "email",
              "name" => "email",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "password",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "token",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "register",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/register",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "register",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "register",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    HostedRestFeatures.make_feature(name)
  end
end
