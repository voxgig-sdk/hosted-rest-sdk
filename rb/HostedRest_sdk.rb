# HostedRest SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'HostedRest_types'


class HostedRestSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = HostedRestUtility.new
    @_utility = utility

    config = HostedRestConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = HostedRestHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = HostedRestHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, HostedRestFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    HostedRestUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = HostedRestHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = HostedRestHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = HostedRestHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = HostedRestSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue HostedRestError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = HostedRestHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = HostedRestHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.agent_health.list / client.agent_health.load({ "id" => ... })
  def agent_health
    require_relative 'entity/agent_health_entity'
    @agent_health ||= AgentHealthEntity.new(self, nil)
  end

  # Deprecated: use client.agent_health instead.
  def AgentHealth(data = nil)
    require_relative 'entity/agent_health_entity'
    AgentHealthEntity.new(self, data)
  end


  # Idiomatic facade: client.agent_sandbox.list / client.agent_sandbox.load({ "id" => ... })
  def agent_sandbox
    require_relative 'entity/agent_sandbox_entity'
    @agent_sandbox ||= AgentSandboxEntity.new(self, nil)
  end

  # Deprecated: use client.agent_sandbox instead.
  def AgentSandbox(data = nil)
    require_relative 'entity/agent_sandbox_entity'
    AgentSandboxEntity.new(self, data)
  end


  # Idiomatic facade: client.agent_user_detail.list / client.agent_user_detail.load({ "id" => ... })
  def agent_user_detail
    require_relative 'entity/agent_user_detail_entity'
    @agent_user_detail ||= AgentUserDetailEntity.new(self, nil)
  end

  # Deprecated: use client.agent_user_detail instead.
  def AgentUserDetail(data = nil)
    require_relative 'entity/agent_user_detail_entity'
    AgentUserDetailEntity.new(self, data)
  end


  # Idiomatic facade: client.agent_user_list.list / client.agent_user_list.load({ "id" => ... })
  def agent_user_list
    require_relative 'entity/agent_user_list_entity'
    @agent_user_list ||= AgentUserListEntity.new(self, nil)
  end

  # Deprecated: use client.agent_user_list instead.
  def AgentUserList(data = nil)
    require_relative 'entity/agent_user_list_entity'
    AgentUserListEntity.new(self, data)
  end


  # Idiomatic facade: client.app_user.list / client.app_user.load({ "id" => ... })
  def app_user
    require_relative 'entity/app_user_entity'
    @app_user ||= AppUserEntity.new(self, nil)
  end

  # Deprecated: use client.app_user instead.
  def AppUser(data = nil)
    require_relative 'entity/app_user_entity'
    AppUserEntity.new(self, data)
  end


  # Idiomatic facade: client.app_user_login.list / client.app_user_login.load({ "id" => ... })
  def app_user_login
    require_relative 'entity/app_user_login_entity'
    @app_user_login ||= AppUserLoginEntity.new(self, nil)
  end

  # Deprecated: use client.app_user_login instead.
  def AppUserLogin(data = nil)
    require_relative 'entity/app_user_login_entity'
    AppUserLoginEntity.new(self, data)
  end


  # Idiomatic facade: client.app_user_session.list / client.app_user_session.load({ "id" => ... })
  def app_user_session
    require_relative 'entity/app_user_session_entity'
    @app_user_session ||= AppUserSessionEntity.new(self, nil)
  end

  # Deprecated: use client.app_user_session instead.
  def AppUserSession(data = nil)
    require_relative 'entity/app_user_session_entity'
    AppUserSessionEntity.new(self, data)
  end


  # Idiomatic facade: client.app_user_total.list / client.app_user_total.load({ "id" => ... })
  def app_user_total
    require_relative 'entity/app_user_total_entity'
    @app_user_total ||= AppUserTotalEntity.new(self, nil)
  end

  # Deprecated: use client.app_user_total instead.
  def AppUserTotal(data = nil)
    require_relative 'entity/app_user_total_entity'
    AppUserTotalEntity.new(self, data)
  end


  # Idiomatic facade: client.app_user_verify.list / client.app_user_verify.load({ "id" => ... })
  def app_user_verify
    require_relative 'entity/app_user_verify_entity'
    @app_user_verify ||= AppUserVerifyEntity.new(self, nil)
  end

  # Deprecated: use client.app_user_verify instead.
  def AppUserVerify(data = nil)
    require_relative 'entity/app_user_verify_entity'
    AppUserVerifyEntity.new(self, data)
  end


  # Idiomatic facade: client.authentication.list / client.authentication.load({ "id" => ... })
  def authentication
    require_relative 'entity/authentication_entity'
    @authentication ||= AuthenticationEntity.new(self, nil)
  end

  # Deprecated: use client.authentication instead.
  def Authentication(data = nil)
    require_relative 'entity/authentication_entity'
    AuthenticationEntity.new(self, data)
  end


  # Idiomatic facade: client.collection.list / client.collection.load({ "id" => ... })
  def collection
    require_relative 'entity/collection_entity'
    @collection ||= CollectionEntity.new(self, nil)
  end

  # Deprecated: use client.collection instead.
  def Collection(data = nil)
    require_relative 'entity/collection_entity'
    CollectionEntity.new(self, data)
  end


  # Idiomatic facade: client.collection_record.list / client.collection_record.load({ "id" => ... })
  def collection_record
    require_relative 'entity/collection_record_entity'
    @collection_record ||= CollectionRecordEntity.new(self, nil)
  end

  # Deprecated: use client.collection_record instead.
  def CollectionRecord(data = nil)
    require_relative 'entity/collection_record_entity'
    CollectionRecordEntity.new(self, data)
  end


  # Idiomatic facade: client.collection_record_list.list / client.collection_record_list.load({ "id" => ... })
  def collection_record_list
    require_relative 'entity/collection_record_list_entity'
    @collection_record_list ||= CollectionRecordListEntity.new(self, nil)
  end

  # Deprecated: use client.collection_record_list instead.
  def CollectionRecordList(data = nil)
    require_relative 'entity/collection_record_list_entity'
    CollectionRecordListEntity.new(self, data)
  end


  # Idiomatic facade: client.custom.list / client.custom.load({ "id" => ... })
  def custom
    require_relative 'entity/custom_entity'
    @custom ||= CustomEntity.new(self, nil)
  end

  # Deprecated: use client.custom instead.
  def Custom(data = nil)
    require_relative 'entity/custom_entity'
    CustomEntity.new(self, data)
  end


  # Idiomatic facade: client.legacy.list / client.legacy.load({ "id" => ... })
  def legacy
    require_relative 'entity/legacy_entity'
    @legacy ||= LegacyEntity.new(self, nil)
  end

  # Deprecated: use client.legacy instead.
  def Legacy(data = nil)
    require_relative 'entity/legacy_entity'
    LegacyEntity.new(self, data)
  end


  # Idiomatic facade: client.legacy_mutation.list / client.legacy_mutation.load({ "id" => ... })
  def legacy_mutation
    require_relative 'entity/legacy_mutation_entity'
    @legacy_mutation ||= LegacyMutationEntity.new(self, nil)
  end

  # Deprecated: use client.legacy_mutation instead.
  def LegacyMutation(data = nil)
    require_relative 'entity/legacy_mutation_entity'
    LegacyMutationEntity.new(self, data)
  end


  # Idiomatic facade: client.legacy_unknown.list / client.legacy_unknown.load({ "id" => ... })
  def legacy_unknown
    require_relative 'entity/legacy_unknown_entity'
    @legacy_unknown ||= LegacyUnknownEntity.new(self, nil)
  end

  # Deprecated: use client.legacy_unknown instead.
  def LegacyUnknown(data = nil)
    require_relative 'entity/legacy_unknown_entity'
    LegacyUnknownEntity.new(self, data)
  end


  # Idiomatic facade: client.legacy_unknown_list.list / client.legacy_unknown_list.load({ "id" => ... })
  def legacy_unknown_list
    require_relative 'entity/legacy_unknown_list_entity'
    @legacy_unknown_list ||= LegacyUnknownListEntity.new(self, nil)
  end

  # Deprecated: use client.legacy_unknown_list instead.
  def LegacyUnknownList(data = nil)
    require_relative 'entity/legacy_unknown_list_entity'
    LegacyUnknownListEntity.new(self, data)
  end


  # Idiomatic facade: client.legacy_user.list / client.legacy_user.load({ "id" => ... })
  def legacy_user
    require_relative 'entity/legacy_user_entity'
    @legacy_user ||= LegacyUserEntity.new(self, nil)
  end

  # Deprecated: use client.legacy_user instead.
  def LegacyUser(data = nil)
    require_relative 'entity/legacy_user_entity'
    LegacyUserEntity.new(self, data)
  end


  # Idiomatic facade: client.legacy_user_list.list / client.legacy_user_list.load({ "id" => ... })
  def legacy_user_list
    require_relative 'entity/legacy_user_list_entity'
    @legacy_user_list ||= LegacyUserListEntity.new(self, nil)
  end

  # Deprecated: use client.legacy_user_list instead.
  def LegacyUserList(data = nil)
    require_relative 'entity/legacy_user_list_entity'
    LegacyUserListEntity.new(self, data)
  end


  # Idiomatic facade: client.login.list / client.login.load({ "id" => ... })
  def login
    require_relative 'entity/login_entity'
    @login ||= LoginEntity.new(self, nil)
  end

  # Deprecated: use client.login instead.
  def Login(data = nil)
    require_relative 'entity/login_entity'
    LoginEntity.new(self, data)
  end


  # Idiomatic facade: client.register.list / client.register.load({ "id" => ... })
  def register
    require_relative 'entity/register_entity'
    @register ||= RegisterEntity.new(self, nil)
  end

  # Deprecated: use client.register instead.
  def Register(data = nil)
    require_relative 'entity/register_entity'
    RegisterEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = HostedRestSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
