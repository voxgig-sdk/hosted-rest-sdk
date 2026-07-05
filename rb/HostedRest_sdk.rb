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

    # make_fetch_def returns a (fetchdef, err) tuple; destructure it and
    # return just the fetchdef Hash (raising on error) so callers — including
    # direct(), which indexes fetchdef["url"] — receive a Hash, mirroring the
    # ts/py prepare().
    fetchdef, fd_err = utility.make_fetch_def.call(ctx)
    raise fd_err if fd_err

    fetchdef
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


  # Canonical facade: client.AgentHealth.list / client.AgentHealth.load({ "id" => ... })
  def AgentHealth(data = nil)
    require_relative 'entity/agent_health_entity'
    AgentHealthEntity.new(self, data)
  end


  # Canonical facade: client.AgentSandbox.list / client.AgentSandbox.load({ "id" => ... })
  def AgentSandbox(data = nil)
    require_relative 'entity/agent_sandbox_entity'
    AgentSandboxEntity.new(self, data)
  end


  # Canonical facade: client.AgentUserDetail.list / client.AgentUserDetail.load({ "id" => ... })
  def AgentUserDetail(data = nil)
    require_relative 'entity/agent_user_detail_entity'
    AgentUserDetailEntity.new(self, data)
  end


  # Canonical facade: client.AgentUserList.list / client.AgentUserList.load({ "id" => ... })
  def AgentUserList(data = nil)
    require_relative 'entity/agent_user_list_entity'
    AgentUserListEntity.new(self, data)
  end


  # Canonical facade: client.AppUser.list / client.AppUser.load({ "id" => ... })
  def AppUser(data = nil)
    require_relative 'entity/app_user_entity'
    AppUserEntity.new(self, data)
  end


  # Canonical facade: client.AppUserLogin.list / client.AppUserLogin.load({ "id" => ... })
  def AppUserLogin(data = nil)
    require_relative 'entity/app_user_login_entity'
    AppUserLoginEntity.new(self, data)
  end


  # Canonical facade: client.AppUserSession.list / client.AppUserSession.load({ "id" => ... })
  def AppUserSession(data = nil)
    require_relative 'entity/app_user_session_entity'
    AppUserSessionEntity.new(self, data)
  end


  # Canonical facade: client.AppUserTotal.list / client.AppUserTotal.load({ "id" => ... })
  def AppUserTotal(data = nil)
    require_relative 'entity/app_user_total_entity'
    AppUserTotalEntity.new(self, data)
  end


  # Canonical facade: client.AppUserVerify.list / client.AppUserVerify.load({ "id" => ... })
  def AppUserVerify(data = nil)
    require_relative 'entity/app_user_verify_entity'
    AppUserVerifyEntity.new(self, data)
  end


  # Canonical facade: client.Authentication.list / client.Authentication.load({ "id" => ... })
  def Authentication(data = nil)
    require_relative 'entity/authentication_entity'
    AuthenticationEntity.new(self, data)
  end


  # Canonical facade: client.Collection.list / client.Collection.load({ "id" => ... })
  def Collection(data = nil)
    require_relative 'entity/collection_entity'
    CollectionEntity.new(self, data)
  end


  # Canonical facade: client.CollectionRecord.list / client.CollectionRecord.load({ "id" => ... })
  def CollectionRecord(data = nil)
    require_relative 'entity/collection_record_entity'
    CollectionRecordEntity.new(self, data)
  end


  # Canonical facade: client.CollectionRecordList.list / client.CollectionRecordList.load({ "id" => ... })
  def CollectionRecordList(data = nil)
    require_relative 'entity/collection_record_list_entity'
    CollectionRecordListEntity.new(self, data)
  end


  # Canonical facade: client.Custom.list / client.Custom.load({ "id" => ... })
  def Custom(data = nil)
    require_relative 'entity/custom_entity'
    CustomEntity.new(self, data)
  end


  # Canonical facade: client.Legacy.list / client.Legacy.load({ "id" => ... })
  def Legacy(data = nil)
    require_relative 'entity/legacy_entity'
    LegacyEntity.new(self, data)
  end


  # Canonical facade: client.LegacyMutation.list / client.LegacyMutation.load({ "id" => ... })
  def LegacyMutation(data = nil)
    require_relative 'entity/legacy_mutation_entity'
    LegacyMutationEntity.new(self, data)
  end


  # Canonical facade: client.LegacyUnknown.list / client.LegacyUnknown.load({ "id" => ... })
  def LegacyUnknown(data = nil)
    require_relative 'entity/legacy_unknown_entity'
    LegacyUnknownEntity.new(self, data)
  end


  # Canonical facade: client.LegacyUnknownList.list / client.LegacyUnknownList.load({ "id" => ... })
  def LegacyUnknownList(data = nil)
    require_relative 'entity/legacy_unknown_list_entity'
    LegacyUnknownListEntity.new(self, data)
  end


  # Canonical facade: client.LegacyUser.list / client.LegacyUser.load({ "id" => ... })
  def LegacyUser(data = nil)
    require_relative 'entity/legacy_user_entity'
    LegacyUserEntity.new(self, data)
  end


  # Canonical facade: client.LegacyUserList.list / client.LegacyUserList.load({ "id" => ... })
  def LegacyUserList(data = nil)
    require_relative 'entity/legacy_user_list_entity'
    LegacyUserListEntity.new(self, data)
  end


  # Canonical facade: client.Login.list / client.Login.load({ "id" => ... })
  def Login(data = nil)
    require_relative 'entity/login_entity'
    LoginEntity.new(self, data)
  end


  # Canonical facade: client.Register.list / client.Register.load({ "id" => ... })
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
