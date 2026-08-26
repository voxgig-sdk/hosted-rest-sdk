// Typed models for the HostedRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/hosted-rest-sdk/go/core"
)

// AgentHealth is the typed data model for the agent_health entity.
type AgentHealth struct {
	Deprecations []any `json:"deprecations"`
	RateLimitStatus map[string]any `json:"rate_limit_status"`
	Status string `json:"status"`
	UptimeSeconds int `json:"uptime_seconds"`
	Version string `json:"version"`
}

// AgentHealthLoadMatch is the typed request payload for AgentHealth.LoadTyped.
type AgentHealthLoadMatch struct {
	Deprecations *[]any `json:"deprecations,omitempty"`
	RateLimitStatus *map[string]any `json:"rate_limit_status,omitempty"`
	Status *string `json:"status,omitempty"`
	UptimeSeconds *int `json:"uptime_seconds,omitempty"`
	Version *string `json:"version,omitempty"`
}

// AgentSandbox is the typed data model for the agent_sandbox entity.
type AgentSandbox struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

// AgentSandboxLoadMatch is the typed request payload for AgentSandbox.LoadTyped.
type AgentSandboxLoadMatch struct {
	Scenario string `json:"scenario"`
}

// AgentSandboxCreateData is the typed request payload for AgentSandbox.CreateTyped.
type AgentSandboxCreateData struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

// AgentUserDetail is the typed data model for the agent_user_detail entity.
type AgentUserDetail struct {
	CreatedAt string `json:"created_at"`
	Email string `json:"email"`
	FullName string `json:"full_name"`
	Id string `json:"id"`
	Locale string `json:"locale"`
	Preferences map[string]any `json:"preferences"`
	Profile map[string]any `json:"profile"`
	Status string `json:"status"`
	Timezone string `json:"timezone"`
	UpdatedAt string `json:"updated_at"`
}

// AgentUserDetailLoadMatch is the typed request payload for AgentUserDetail.LoadTyped.
type AgentUserDetailLoadMatch struct {
	Id string `json:"id"`
}

// AgentUserList is the typed data model for the agent_user_list entity.
type AgentUserList struct {
	CreatedAt string `json:"created_at"`
	Email string `json:"email"`
	FullName string `json:"full_name"`
	Id string `json:"id"`
	Locale string `json:"locale"`
	Preferences map[string]any `json:"preferences"`
	Profile map[string]any `json:"profile"`
	Status string `json:"status"`
	Timezone string `json:"timezone"`
	UpdatedAt string `json:"updated_at"`
}

// AgentUserListListMatch is the typed request payload for AgentUserList.ListTyped.
type AgentUserListListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *string `json:"email,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	Id *string `json:"id,omitempty"`
	Locale *string `json:"locale,omitempty"`
	Preferences *map[string]any `json:"preferences,omitempty"`
	Profile *map[string]any `json:"profile,omitempty"`
	Status *string `json:"status,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// AppUser is the typed data model for the app_user entity.
type AppUser struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email string `json:"email"`
	Id string `json:"id"`
	LastLoginAt *string `json:"last_login_at,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AppUserLoadMatch is the typed request payload for AppUser.LoadTyped.
type AppUserLoadMatch struct {
	Id string `json:"id"`
}

// AppUserListMatch is the typed request payload for AppUser.ListTyped.
type AppUserListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	LastLoginAt *string `json:"last_login_at,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AppUserCreateData is the typed request payload for AppUser.CreateTyped.
type AppUserCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email string `json:"email"`
	Id string `json:"id"`
	LastLoginAt *string `json:"last_login_at,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AppUserUpdateData is the typed request payload for AppUser.UpdateTyped.
type AppUserUpdateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"created_at,omitempty"`
	Email *string `json:"email,omitempty"`
	LastLoginAt *string `json:"last_login_at,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AppUserRemoveMatch is the typed request payload for AppUser.RemoveTyped.
type AppUserRemoveMatch struct {
	Id string `json:"id"`
}

// AppUserLogin is the typed data model for the app_user_login entity.
type AppUserLogin struct {
	Email string `json:"email"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
}

// AppUserLoginCreateData is the typed request payload for AppUserLogin.CreateTyped.
type AppUserLoginCreateData struct {
	Email string `json:"email"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
}

// AppUserSession is the typed data model for the app_user_session entity.
type AppUserSession struct {
}

// AppUserSessionLoadMatch is the typed request payload for AppUserSession.LoadTyped.
type AppUserSessionLoadMatch struct {
}

// AppUserTotal is the typed data model for the app_user_total entity.
type AppUserTotal struct {
	Total int `json:"total"`
}

// AppUserTotalLoadMatch is the typed request payload for AppUserTotal.LoadTyped.
type AppUserTotalLoadMatch struct {
	ProjectId string `json:"project_id"`
}

// AppUserVerify is the typed data model for the app_user_verify entity.
type AppUserVerify struct {
	Token string `json:"token"`
}

// AppUserVerifyCreateData is the typed request payload for AppUserVerify.CreateTyped.
type AppUserVerifyCreateData struct {
	Token string `json:"token"`
}

// Authentication is the typed data model for the authentication entity.
type Authentication struct {
}

// AuthenticationCreateData is the typed request payload for Authentication.CreateTyped.
type AuthenticationCreateData struct {
}

// Collection is the typed data model for the collection entity.
type Collection struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Id string `json:"id"`
	Name string `json:"name"`
	ProjectId *string `json:"project_id,omitempty"`
	Schema *map[string]any `json:"schema,omitempty"`
	Slug string `json:"slug"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
}

// CollectionLoadMatch is the typed request payload for Collection.LoadTyped.
type CollectionLoadMatch struct {
	Id string `json:"id"`
}

// CollectionListMatch is the typed request payload for Collection.ListTyped.
type CollectionListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	Schema *map[string]any `json:"schema,omitempty"`
	Slug *string `json:"slug,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
}

// CollectionCreateData is the typed request payload for Collection.CreateTyped.
type CollectionCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Id string `json:"id"`
	Name string `json:"name"`
	ProjectId *string `json:"project_id,omitempty"`
	Schema *map[string]any `json:"schema,omitempty"`
	Slug string `json:"slug"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
}

// CollectionUpdateData is the typed request payload for Collection.UpdateTyped.
type CollectionUpdateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"created_at,omitempty"`
	Name *string `json:"name,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	Schema *map[string]any `json:"schema,omitempty"`
	Slug *string `json:"slug,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Visibility *string `json:"visibility,omitempty"`
}

// CollectionRemoveMatch is the typed request payload for Collection.RemoveTyped.
type CollectionRemoveMatch struct {
	Id string `json:"id"`
}

// CollectionRecord is the typed data model for the collection_record entity.
type CollectionRecord struct {
	AppUserId *string `json:"app_user_id,omitempty"`
	CollectionId *string `json:"collection_id,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	CreatedBy *string `json:"created_by,omitempty"`
	Data map[string]any `json:"data"`
	DeletedAt *string `json:"deleted_at,omitempty"`
	Id string `json:"id"`
	ProjectId *string `json:"project_id,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// CollectionRecordLoadMatch is the typed request payload for CollectionRecord.LoadTyped.
type CollectionRecordLoadMatch struct {
	CollectionId string `json:"collection_id"`
	Id string `json:"id"`
}

// CollectionRecordCreateData is the typed request payload for CollectionRecord.CreateTyped.
type CollectionRecordCreateData struct {
	Slug string `json:"slug"`
	AppUserId *string `json:"app_user_id,omitempty"`
	CollectionId *string `json:"collection_id,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	CreatedBy *string `json:"created_by,omitempty"`
	Data map[string]any `json:"data"`
	DeletedAt *string `json:"deleted_at,omitempty"`
	Id string `json:"id"`
	ProjectId *string `json:"project_id,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// CollectionRecordUpdateData is the typed request payload for CollectionRecord.UpdateTyped.
type CollectionRecordUpdateData struct {
	CollectionId string `json:"collection_id"`
	Id string `json:"id"`
	AppUserId *string `json:"app_user_id,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	CreatedBy *string `json:"created_by,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	DeletedAt *string `json:"deleted_at,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// CollectionRecordList is the typed data model for the collection_record_list entity.
type CollectionRecordList struct {
	AppUserId *string `json:"app_user_id,omitempty"`
	CollectionId *string `json:"collection_id,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	CreatedBy *string `json:"created_by,omitempty"`
	Data map[string]any `json:"data"`
	DeletedAt *string `json:"deleted_at,omitempty"`
	Id string `json:"id"`
	ProjectId *string `json:"project_id,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// CollectionRecordListListMatch is the typed request payload for CollectionRecordList.ListTyped.
type CollectionRecordListListMatch struct {
	Slug string `json:"slug"`
}

// Custom is the typed data model for the custom entity.
type Custom struct {
	Id *string `json:"id,omitempty"`
}

// CustomLoadMatch is the typed request payload for Custom.LoadTyped.
type CustomLoadMatch struct {
	Id string `json:"id"`
}

// CustomCreateData is the typed request payload for Custom.CreateTyped.
type CustomCreateData struct {
	Id string `json:"id"`
}

// CustomUpdateData is the typed request payload for Custom.UpdateTyped.
type CustomUpdateData struct {
	Id string `json:"id"`
}

// CustomRemoveMatch is the typed request payload for Custom.RemoveTyped.
type CustomRemoveMatch struct {
	Id string `json:"id"`
}

// Legacy is the typed data model for the legacy entity.
type Legacy struct {
	Id *string `json:"id,omitempty"`
}

// LegacyRemoveMatch is the typed request payload for Legacy.RemoveTyped.
type LegacyRemoveMatch struct {
	Id int `json:"id"`
}

// LegacyMutation is the typed data model for the legacy_mutation entity.
type LegacyMutation struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Id *string `json:"id,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// LegacyMutationCreateData is the typed request payload for LegacyMutation.CreateTyped.
type LegacyMutationCreateData struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Id *string `json:"id,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// LegacyMutationUpdateData is the typed request payload for LegacyMutation.UpdateTyped.
type LegacyMutationUpdateData struct {
	Id int `json:"id"`
	CreatedAt *string `json:"createdAt,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// LegacyUnknown is the typed data model for the legacy_unknown entity.
type LegacyUnknown struct {
	Data map[string]any `json:"data"`
	Id *string `json:"id,omitempty"`
	Support *map[string]any `json:"support,omitempty"`
}

// LegacyUnknownLoadMatch is the typed request payload for LegacyUnknown.LoadTyped.
type LegacyUnknownLoadMatch struct {
	Id int `json:"id"`
}

// LegacyUnknownList is the typed data model for the legacy_unknown_list entity.
type LegacyUnknownList struct {
	Color string `json:"color"`
	Id int `json:"id"`
	Name string `json:"name"`
	PantoneValue string `json:"pantone_value"`
	Year int `json:"year"`
}

// LegacyUnknownListListMatch is the typed request payload for LegacyUnknownList.ListTyped.
type LegacyUnknownListListMatch struct {
	Color *string `json:"color,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	PantoneValue *string `json:"pantone_value,omitempty"`
	Year *int `json:"year,omitempty"`
}

// LegacyUser is the typed data model for the legacy_user entity.
type LegacyUser struct {
	Data map[string]any `json:"data"`
	Id *string `json:"id,omitempty"`
	Support *map[string]any `json:"support,omitempty"`
}

// LegacyUserLoadMatch is the typed request payload for LegacyUser.LoadTyped.
type LegacyUserLoadMatch struct {
	Id int `json:"id"`
}

// LegacyUserList is the typed data model for the legacy_user_list entity.
type LegacyUserList struct {
	Avatar string `json:"avatar"`
	Email string `json:"email"`
	FirstName string `json:"first_name"`
	Id int `json:"id"`
	LastName string `json:"last_name"`
}

// LegacyUserListListMatch is the typed request payload for LegacyUserList.ListTyped.
type LegacyUserListListMatch struct {
	Avatar *string `json:"avatar,omitempty"`
	Email *string `json:"email,omitempty"`
	FirstName *string `json:"first_name,omitempty"`
	Id *int `json:"id,omitempty"`
	LastName *string `json:"last_name,omitempty"`
}

// Login is the typed data model for the login entity.
type Login struct {
	Email string `json:"email"`
	Password string `json:"password"`
	Token string `json:"token"`
}

// LoginCreateData is the typed request payload for Login.CreateTyped.
type LoginCreateData struct {
	Email string `json:"email"`
	Password string `json:"password"`
	Token string `json:"token"`
}

// Register is the typed data model for the register entity.
type Register struct {
	Email string `json:"email"`
	Id *int `json:"id,omitempty"`
	Password string `json:"password"`
	Token string `json:"token"`
}

// RegisterCreateData is the typed request payload for Register.CreateTyped.
type RegisterCreateData struct {
	Email string `json:"email"`
	Id *int `json:"id,omitempty"`
	Password string `json:"password"`
	Token string `json:"token"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
