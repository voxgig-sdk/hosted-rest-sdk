# HostedRest SDK exists test

require "minitest/autorun"
require_relative "../HostedRest_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = HostedRestSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
