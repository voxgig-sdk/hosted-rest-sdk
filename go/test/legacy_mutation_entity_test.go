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

func TestLegacyMutationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LegacyMutation(nil)
		if ent == nil {
			t.Fatal("expected non-nil LegacyMutationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := legacy_mutationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "legacy_mutation." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HOSTEDREST_TEST_LEGACY_MUTATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		legacyMutationRef01Ent := client.LegacyMutation(nil)
		legacyMutationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "legacy_mutation"}, setup.data), "legacy_mutation_ref01"))

		legacyMutationRef01DataResult, err := legacyMutationRef01Ent.Create(legacyMutationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		legacyMutationRef01Data = core.ToMapAny(legacyMutationRef01DataResult)
		if legacyMutationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if legacyMutationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		legacyMutationRef01DataUp0Up := map[string]any{
			"id": legacyMutationRef01Data["id"],
		}

		legacyMutationRef01MarkdefUp0Name := "created_at"
		legacyMutationRef01MarkdefUp0Value := fmt.Sprintf("Mark01-legacy_mutation_ref01_%d", setup.now)
		legacyMutationRef01DataUp0Up[legacyMutationRef01MarkdefUp0Name] = legacyMutationRef01MarkdefUp0Value

		legacyMutationRef01ResdataUp0Result, err := legacyMutationRef01Ent.Update(legacyMutationRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		legacyMutationRef01ResdataUp0 := core.ToMapAny(legacyMutationRef01ResdataUp0Result)
		if legacyMutationRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if legacyMutationRef01ResdataUp0["id"] != legacyMutationRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if legacyMutationRef01ResdataUp0[legacyMutationRef01MarkdefUp0Name] != legacyMutationRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", legacyMutationRef01MarkdefUp0Name, legacyMutationRef01ResdataUp0[legacyMutationRef01MarkdefUp0Name])
		}

	})
}

func legacy_mutationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "legacy_mutation", "LegacyMutationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read legacy_mutation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse legacy_mutation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"legacy_mutation01", "legacy_mutation02", "legacy_mutation03"},
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
	entidEnvRaw := os.Getenv("HOSTEDREST_TEST_LEGACY_MUTATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOSTEDREST_TEST_LEGACY_MUTATION_ENTID": idmap,
		"HOSTEDREST_TEST_LIVE":      "FALSE",
		"HOSTEDREST_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["HOSTEDREST_TEST_LEGACY_MUTATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HOSTEDREST_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
