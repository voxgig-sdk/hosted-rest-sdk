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

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const customEntityLiveStrict = true


func TestCustomEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Custom(nil)
		if ent == nil {
			t.Fatal("expected non-nil CustomEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Custom(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.HostedRestError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := customBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "custom." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			liveMiss(t, customEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a custom record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		customRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.custom")))
		var customRef01Data map[string]any
		if len(customRef01DataRaw) > 0 {
			customRef01Data = core.ToMapAny(customRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = customRef01Data

		// UPDATE
		customRef01Ent := client.Custom(nil)
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
	idmap, _ := vs.Transform(
		[]any{"custom01", "custom02", "custom03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HOSTED_REST_TEST_CUSTOM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOSTED_REST_TEST_CUSTOM_ENTID": idmap,
		"HOSTED_REST_TEST_LIVE":      "FALSE",
		"HOSTED_REST_TEST_EXPLAIN":   "FALSE",
		"HOSTED_REST_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HOSTED_REST_TEST_CUSTOM_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HOSTED_REST_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["HOSTED_REST_APIKEY"],
			},
			extraOpts,
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
