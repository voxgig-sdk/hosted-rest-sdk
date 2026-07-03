package voxgighostedrestsdk

import (
	"github.com/voxgig-sdk/hosted-rest-sdk/go/core"
	"github.com/voxgig-sdk/hosted-rest-sdk/go/entity"
	"github.com/voxgig-sdk/hosted-rest-sdk/go/feature"
	_ "github.com/voxgig-sdk/hosted-rest-sdk/go/utility"
)

// Type aliases preserve external API.
type HostedRestSDK = core.HostedRestSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type HostedRestEntity = core.HostedRestEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type HostedRestError = core.HostedRestError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAgentHealthEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewAgentHealthEntity(client, entopts)
	}
	core.NewAgentSandboxEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewAgentSandboxEntity(client, entopts)
	}
	core.NewAgentUserDetailEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewAgentUserDetailEntity(client, entopts)
	}
	core.NewAgentUserListEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewAgentUserListEntity(client, entopts)
	}
	core.NewAppUserEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewAppUserEntity(client, entopts)
	}
	core.NewAppUserLoginEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewAppUserLoginEntity(client, entopts)
	}
	core.NewAppUserSessionEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewAppUserSessionEntity(client, entopts)
	}
	core.NewAppUserTotalEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewAppUserTotalEntity(client, entopts)
	}
	core.NewAppUserVerifyEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewAppUserVerifyEntity(client, entopts)
	}
	core.NewAuthenticationEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewAuthenticationEntity(client, entopts)
	}
	core.NewCollectionEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewCollectionEntity(client, entopts)
	}
	core.NewCollectionRecordEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewCollectionRecordEntity(client, entopts)
	}
	core.NewCollectionRecordListEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewCollectionRecordListEntity(client, entopts)
	}
	core.NewCustomEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewCustomEntity(client, entopts)
	}
	core.NewLegacyEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewLegacyEntity(client, entopts)
	}
	core.NewLegacyMutationEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewLegacyMutationEntity(client, entopts)
	}
	core.NewLegacyUnknownEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewLegacyUnknownEntity(client, entopts)
	}
	core.NewLegacyUnknownListEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewLegacyUnknownListEntity(client, entopts)
	}
	core.NewLegacyUserEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewLegacyUserEntity(client, entopts)
	}
	core.NewLegacyUserListEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewLegacyUserListEntity(client, entopts)
	}
	core.NewLoginEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewLoginEntity(client, entopts)
	}
	core.NewRegisterEntityFunc = func(client *core.HostedRestSDK, entopts map[string]any) core.HostedRestEntity {
		return entity.NewRegisterEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewHostedRestSDK = core.NewHostedRestSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewHostedRestSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *HostedRestSDK  { return NewHostedRestSDK(nil) }
func Test() *HostedRestSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
