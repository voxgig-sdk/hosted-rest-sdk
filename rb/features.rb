# HostedRest SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module HostedRestFeatures
  def self.make_feature(name)
    case name
    when "base"
      HostedRestBaseFeature.new
    when "ratelimit"
      HostedRestRatelimitFeature.new
    when "retry"
      HostedRestRetryFeature.new
    when "test"
      HostedRestTestFeature.new
    when "timeout"
      HostedRestTimeoutFeature.new
    else
      HostedRestBaseFeature.new
    end
  end
end
