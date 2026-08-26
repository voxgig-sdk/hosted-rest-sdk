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

func TestCustomEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Custom(nil)
		if ent == nil {
			t.Fatal("expected non-nil CustomEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := customBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "custom." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HOSTED_REST_TEST_CUSTOM_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		customRef01Ent := client.Custom(nil)
		customRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "custom"}, setup.data), "custom_ref01"))
		customRef01Data["path"] = setup.idmap["path01"]

		customRef01DataResult, err := customRef01Ent.Create(customRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		customRef01Data = core.ToMapAny(entityData(customRef01DataResult))
		if customRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if customRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		customRef01DataUp0Up := map[string]any{
			"id": customRef01Data["id"],
		}

		customRef01ResdataUp0Result, err := customRef01Ent.Update(customRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		customRef01ResdataUp0 := core.ToMapAny(entityData(customRef01ResdataUp0Result))
		if customRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if customRef01ResdataUp0["id"] != customRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}

		// LOAD
		customRef01MatchDt0 := map[string]any{
			"id": customRef01Data["id"],
		}
		customRef01DataDt0Loaded, err := customRef01Ent.Load(customRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		customRef01DataDt0LoadResult := core.ToMapAny(entityData(customRef01DataDt0Loaded))
		if customRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if customRef01DataDt0LoadResult["id"] != customRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		customRef01MatchRm0 := map[string]any{
			"id": customRef01Data["id"],
		}
		_, err = customRef01Ent.Remove(customRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func customBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "custom", "CustomTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read custom test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse custom test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"custom01", "custom02", "custom03", "path01"},
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
	entidEnvRaw := os.Getenv("HOSTED_REST_TEST_CUSTOM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOSTED_REST_TEST_CUSTOM_ENTID": idmap,
		"HOSTED_REST_TEST_LIVE":      "FALSE",
		"HOSTED_REST_TEST_EXPLAIN":   "FALSE",
		"HOSTED_REST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["HOSTED_REST_TEST_CUSTOM_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HOSTED_REST_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["HOSTED_REST_APIKEY"],
			},
			extra,
		})
		client = sdk.NewHostedRestSDK(core.ToMapAny(mergedOpts))
	}

	live := env["HOSTED_REST_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["HOSTED_REST_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
