package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/hosted-rest-sdk"
	"github.com/voxgig-sdk/hosted-rest-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestCollectionRecordEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CollectionRecord(nil)
		if ent == nil {
			t.Fatal("expected non-nil CollectionRecordEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := collection_recordBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "collection_record." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HOSTEDREST_TEST_COLLECTION_RECORD_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		collectionRecordRef01Ent := client.CollectionRecord(nil)
		collectionRecordRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "collection_record"}, setup.data), "collection_record_ref01"))
		collectionRecordRef01Data["collection_id"] = setup.idmap["collection01"]
		collectionRecordRef01Data["slug"] = setup.idmap["slug01"]

		collectionRecordRef01DataResult, err := collectionRecordRef01Ent.Create(collectionRecordRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		collectionRecordRef01Data = core.ToMapAny(collectionRecordRef01DataResult)
		if collectionRecordRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// UPDATE
		collectionRecordRef01DataUp0Up := map[string]any{
			"collection_id": setup.idmap["collection_id"],
		}

		collectionRecordRef01ResdataUp0Result, err := collectionRecordRef01Ent.Update(collectionRecordRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		collectionRecordRef01ResdataUp0 := core.ToMapAny(collectionRecordRef01ResdataUp0Result)
		if collectionRecordRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}

		// LOAD
		collectionRecordRef01MatchDt0 := map[string]any{}
		collectionRecordRef01DataDt0Loaded, err := collectionRecordRef01Ent.Load(collectionRecordRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if collectionRecordRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func collection_recordBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "collection_record", "CollectionRecordTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read collection_record test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse collection_record test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"collection_record01", "collection_record02", "collection_record03", "collection01", "collection02", "collection03", "slug01"},
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
	entidEnvRaw := os.Getenv("HOSTEDREST_TEST_COLLECTION_RECORD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOSTEDREST_TEST_COLLECTION_RECORD_ENTID": idmap,
		"HOSTEDREST_TEST_LIVE":      "FALSE",
		"HOSTEDREST_TEST_EXPLAIN":   "FALSE",
		"HOSTEDREST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["HOSTEDREST_TEST_COLLECTION_RECORD_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add collection_id alias for update test.
	if idmapResolved["collection_id"] == nil {
		idmapResolved["collection_id"] = idmapResolved["collection01"]
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
