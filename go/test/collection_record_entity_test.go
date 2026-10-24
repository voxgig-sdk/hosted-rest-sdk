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

	sdk "github.com/voxgig-sdk/hosted-rest-sdk/go"
	"github.com/voxgig-sdk/hosted-rest-sdk/go/core"

	vs "github.com/voxgig-sdk/hosted-rest-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const collection_recordEntityLiveStrict = true


func TestCollectionRecordEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CollectionRecord(nil)
		if ent == nil {
			t.Fatal("expected non-nil CollectionRecordEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CollectionRecord(nil).List(map[string]any{"slug": 1}, nil)
		if sdkerr, ok := err.(*core.HostedRestError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := collection_recordBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "collection_record." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"slug01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, collection_recordEntityLiveStrict, "Live entity test blocked: needs %s via HOSTED_REST_TEST_COLLECTION_RECORD_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		collectionRecordRef01Ent := client.CollectionRecord(nil)
		collectionRecordRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "collection_record"}), "collection_record_ref01"))
		collectionRecordRef01Data["slug"] = setup.idmap["slug01"]

		collectionRecordRef01DataResult, err := collectionRecordRef01Ent.Create(collectionRecordRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		collectionRecordRef01Data = core.ToMapAny(entityData(collectionRecordRef01DataResult))
		if collectionRecordRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if collectionRecordRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		collectionRecordRef01Match := map[string]any{
			"slug": setup.idmap["slug01"],
		}

		collectionRecordRef01ListResult, err := collectionRecordRef01Ent.List(collectionRecordRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		collectionRecordRef01List, collectionRecordRef01ListOk := collectionRecordRef01ListResult.([]any)
		if !collectionRecordRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", collectionRecordRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(collectionRecordRef01List), map[string]any{"id": collectionRecordRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		collectionRecordRef01DataUp0Up := map[string]any{
			"id": collectionRecordRef01Data["id"],
			"slug": setup.idmap["slug"],
		}

		collectionRecordRef01MarkdefUp0Name := "app_user_id"
		collectionRecordRef01MarkdefUp0Value := fmt.Sprintf("Mark01-collection_record_ref01_%d", setup.now)
		collectionRecordRef01DataUp0Up[collectionRecordRef01MarkdefUp0Name] = collectionRecordRef01MarkdefUp0Value

		collectionRecordRef01ResdataUp0Result, err := collectionRecordRef01Ent.Update(collectionRecordRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		collectionRecordRef01ResdataUp0 := core.ToMapAny(entityData(collectionRecordRef01ResdataUp0Result))
		if collectionRecordRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if collectionRecordRef01ResdataUp0["id"] != collectionRecordRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if collectionRecordRef01ResdataUp0[collectionRecordRef01MarkdefUp0Name] != collectionRecordRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", collectionRecordRef01MarkdefUp0Name, collectionRecordRef01ResdataUp0[collectionRecordRef01MarkdefUp0Name])
		}

		// LOAD
		collectionRecordRef01MatchDt0 := map[string]any{
			"id": collectionRecordRef01Data["id"],
		}
		if v := setup.idmap["slug"]; v != nil {
			collectionRecordRef01MatchDt0["slug"] = v
		} else {
			collectionRecordRef01MatchDt0["slug"] = setup.idmap["slug01"]
		}
		collectionRecordRef01DataDt0Loaded, err := collectionRecordRef01Ent.Load(collectionRecordRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		collectionRecordRef01DataDt0LoadResult := core.ToMapAny(entityData(collectionRecordRef01DataDt0Loaded))
		if collectionRecordRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if collectionRecordRef01DataDt0LoadResult["id"] != collectionRecordRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		collectionRecordRef01MatchRm0 := map[string]any{
			"id": collectionRecordRef01Data["id"],
		}
		if v := setup.idmap["slug"]; v != nil {
			collectionRecordRef01MatchRm0["slug"] = v
		} else {
			collectionRecordRef01MatchRm0["slug"] = setup.idmap["slug01"]
		}
		_, err = collectionRecordRef01Ent.Remove(collectionRecordRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		collectionRecordRef01MatchRt0 := map[string]any{
			"slug": setup.idmap["slug01"],
		}

		collectionRecordRef01ListRt0Result, err := collectionRecordRef01Ent.List(collectionRecordRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		collectionRecordRef01ListRt0, collectionRecordRef01ListRt0Ok := collectionRecordRef01ListRt0Result.([]any)
		if !collectionRecordRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", collectionRecordRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(collectionRecordRef01ListRt0), map[string]any{"id": collectionRecordRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
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
	idmap, _ := vs.Transform(
		[]any{"collection_record01", "collection_record02", "collection_record03", "collection01", "collection02", "collection03", "slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HOSTED_REST_TEST_COLLECTION_RECORD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOSTED_REST_TEST_COLLECTION_RECORD_ENTID": idmap,
		"HOSTED_REST_TEST_LIVE":      "FALSE",
		"HOSTED_REST_TEST_EXPLAIN":   "FALSE",
		"HOSTED_REST_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HOSTED_REST_TEST_COLLECTION_RECORD_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add slug alias for update test.
	if idmapResolved["slug"] == nil {
		idmapResolved["slug"] = idmapResolved["slug01"]
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
