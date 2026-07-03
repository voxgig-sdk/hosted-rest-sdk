package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/hosted-rest-sdk/go"
	"github.com/voxgig-sdk/hosted-rest-sdk/go/core"

	vs "github.com/voxgig-sdk/hosted-rest-sdk/go/utility/struct"
)

func TestAppUserTotalEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppUserTotal(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppUserTotalEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := app_user_totalBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_user_total." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set HOSTEDREST_TEST_APP_USER_TOTAL_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		appUserTotalRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.app_user_total", setup.data)))
		var appUserTotalRef01Data map[string]any
		if len(appUserTotalRef01DataRaw) > 0 {
			appUserTotalRef01Data = core.ToMapAny(appUserTotalRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = appUserTotalRef01Data

		// LOAD
		appUserTotalRef01Ent := client.AppUserTotal(nil)
		appUserTotalRef01MatchDt0 := map[string]any{}
		appUserTotalRef01DataDt0Loaded, err := appUserTotalRef01Ent.Load(appUserTotalRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if appUserTotalRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func app_user_totalBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_user_total", "AppUserTotalTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_user_total test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_user_total test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"app_user_total01", "app_user_total02", "app_user_total03", "project01", "project02", "project03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("HOSTEDREST_TEST_APP_USER_TOTAL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOSTEDREST_TEST_APP_USER_TOTAL_ENTID": idmap,
		"HOSTEDREST_TEST_LIVE":      "FALSE",
		"HOSTEDREST_TEST_EXPLAIN":   "FALSE",
		"HOSTEDREST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["HOSTEDREST_TEST_APP_USER_TOTAL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HOSTEDREST_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["HOSTEDREST_APIKEY"],
			},
			extra,
		})
		client = sdk.NewHostedRestSDK(core.ToMapAny(mergedOpts))
	}

	live := env["HOSTEDREST_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["HOSTEDREST_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
