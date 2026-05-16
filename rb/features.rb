# HostedRest SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module HostedRestFeatures
  def self.make_feature(name)
    case name
    when "base"
      HostedRestBaseFeature.new
    when "test"
      HostedRestTestFeature.new
    else
      HostedRestBaseFeature.new
    end
  end
end
