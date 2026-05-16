package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAgentHealthEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewAgentSandboxEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewAgentUserDetailEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewAgentUserListEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewAppUserEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewAppUserLoginEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewAppUserSessionEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewAppUserTotalEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewAppUserVerifyEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewAuthenticationEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewCollectionEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewCollectionRecordEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewCollectionRecordListEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewCustomEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewLegacyEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewLegacyMutationEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewLegacyUnknownEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewLegacyUnknownListEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewLegacyUserEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewLegacyUserListEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewLoginEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

var NewRegisterEntityFunc func(client *HostedRestSDK, entopts map[string]any) HostedRestEntity

