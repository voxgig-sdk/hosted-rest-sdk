package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestCollectionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Collection(nil)
		if ent == nil {
			t.Fatal("expected non-nil CollectionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := collectionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "collection." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HOSTEDREST_TEST_COLLECTION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		collectionRef01Ent := client.Collection(nil)
		collectionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "collection"}, setup.data), "collection_ref01"))
		collectionRef01Data["collection_id"] = setup.idmap["collection01"]

		collectionRef01DataResult, err := collectionRef01Ent.Create(collectionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		collectionRef01Data = core.ToMapAny(collectionRef01DataResult)
		if collectionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if collectionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		collectionRef01Match := map[string]any{}

		collectionRef01ListResult, err := collectionRef01Ent.List(collectionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		collectionRef01List, collectionRef01ListOk := collectionRef01ListResult.([]any)
		if !collectionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", collectionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(collectionRef01List), map[string]any{"id": collectionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		collectionRef01DataUp0Up := map[string]any{
			"id": collectionRef01Data["id"],
		}

		collectionRef01MarkdefUp0Name := "created_at"
		collectionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-collection_ref01_%d", setup.now)
		collectionRef01DataUp0Up[collectionRef01MarkdefUp0Name] = collectionRef01MarkdefUp0Value

		collectionRef01ResdataUp0Result, err := collectionRef01Ent.Update(collectionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		collectionRef01ResdataUp0 := core.ToMapAny(collectionRef01ResdataUp0Result)
		if collectionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if collectionRef01ResdataUp0["id"] != collectionRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if collectionRef01ResdataUp0[collectionRef01MarkdefUp0Name] != collectionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", collectionRef01MarkdefUp0Name, collectionRef01ResdataUp0[collectionRef01MarkdefUp0Name])
		}

		// LOAD
		collectionRef01MatchDt0 := map[string]any{
			"id": collectionRef01Data["id"],
		}
		collectionRef01DataDt0Loaded, err := collectionRef01Ent.Load(collectionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		collectionRef01DataDt0LoadResult := core.ToMapAny(collectionRef01DataDt0Loaded)
		if collectionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if collectionRef01DataDt0LoadResult["id"] != collectionRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		collectionRef01MatchRm0 := map[string]any{
			"id": collectionRef01Data["id"],
		}
		_, err = collectionRef01Ent.Remove(collectionRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		collectionRef01MatchRt0 := map[string]any{}

		collectionRef01ListRt0Result, err := collectionRef01Ent.List(collectionRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		collectionRef01ListRt0, collectionRef01ListRt0Ok := collectionRef01ListRt0Result.([]any)
		if !collectionRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", collectionRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(collectionRef01ListRt0), map[string]any{"id": collectionRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func collectionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "collection", "CollectionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read collection test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse collection test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"collection01", "collection02", "collection03", "record01", "record02", "record03"},
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
	entidEnvRaw := os.Getenv("HOSTEDREST_TEST_COLLECTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOSTEDREST_TEST_COLLECTION_ENTID": idmap,
		"HOSTEDREST_TEST_LIVE":      "FALSE",
		"HOSTEDREST_TEST_EXPLAIN":   "FALSE",
		"HOSTEDREST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["HOSTEDREST_TEST_COLLECTION_ENTID"])
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
