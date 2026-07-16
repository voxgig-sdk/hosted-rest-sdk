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

func TestAppUserEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppUser(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppUserEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"app_user": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.AppUser(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.MakeConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.AppUser(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := app_userBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_user." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HOSTEDREST_TEST_APP_USER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		appUserRef01Ent := client.AppUser(nil)
		appUserRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "app_user"}, setup.data), "app_user_ref01"))
		appUserRef01Data["collection_id"] = setup.idmap["collection01"]
		appUserRef01Data["project_id"] = setup.idmap["project01"]

		appUserRef01DataResult, err := appUserRef01Ent.Create(appUserRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appUserRef01Data = core.ToMapAny(appUserRef01DataResult)
		if appUserRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appUserRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		appUserRef01Match := map[string]any{}

		appUserRef01ListResult, err := appUserRef01Ent.List(appUserRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appUserRef01List, appUserRef01ListOk := appUserRef01ListResult.([]any)
		if !appUserRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appUserRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(appUserRef01List), map[string]any{"id": appUserRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		appUserRef01DataUp0Up := map[string]any{
			"id": appUserRef01Data["id"],
		}

		appUserRef01MarkdefUp0Name := "created_at"
		appUserRef01MarkdefUp0Value := fmt.Sprintf("Mark01-app_user_ref01_%d", setup.now)
		appUserRef01DataUp0Up[appUserRef01MarkdefUp0Name] = appUserRef01MarkdefUp0Value

		appUserRef01ResdataUp0Result, err := appUserRef01Ent.Update(appUserRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		appUserRef01ResdataUp0 := core.ToMapAny(appUserRef01ResdataUp0Result)
		if appUserRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if appUserRef01ResdataUp0["id"] != appUserRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if appUserRef01ResdataUp0[appUserRef01MarkdefUp0Name] != appUserRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", appUserRef01MarkdefUp0Name, appUserRef01ResdataUp0[appUserRef01MarkdefUp0Name])
		}

		// LOAD
		appUserRef01MatchDt0 := map[string]any{
			"id": appUserRef01Data["id"],
		}
		appUserRef01DataDt0Loaded, err := appUserRef01Ent.Load(appUserRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appUserRef01DataDt0LoadResult := core.ToMapAny(appUserRef01DataDt0Loaded)
		if appUserRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if appUserRef01DataDt0LoadResult["id"] != appUserRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		appUserRef01MatchRm0 := map[string]any{
			"id": appUserRef01Data["id"],
		}
		_, err = appUserRef01Ent.Remove(appUserRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		appUserRef01MatchRt0 := map[string]any{}

		appUserRef01ListRt0Result, err := appUserRef01Ent.List(appUserRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appUserRef01ListRt0, appUserRef01ListRt0Ok := appUserRef01ListRt0Result.([]any)
		if !appUserRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", appUserRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(appUserRef01ListRt0), map[string]any{"id": appUserRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func app_userBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_user", "AppUserTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_user test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_user test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"app_user01", "app_user02", "app_user03", "project01", "project02", "project03", "collection01", "collection02", "collection03", "record01", "record02", "record03"},
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
	entidEnvRaw := os.Getenv("HOSTEDREST_TEST_APP_USER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOSTEDREST_TEST_APP_USER_ENTID": idmap,
		"HOSTEDREST_TEST_LIVE":      "FALSE",
		"HOSTEDREST_TEST_EXPLAIN":   "FALSE",
		"HOSTEDREST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["HOSTEDREST_TEST_APP_USER_ENTID"])
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
