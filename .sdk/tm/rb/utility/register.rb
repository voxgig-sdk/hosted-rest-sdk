# HostedRest SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

HostedRestUtility.registrar = ->(u) {
  u.clean = HostedRestUtilities::Clean
  u.done = HostedRestUtilities::Done
  u.make_error = HostedRestUtilities::MakeError
  u.feature_add = HostedRestUtilities::FeatureAdd
  u.feature_hook = HostedRestUtilities::FeatureHook
  u.feature_init = HostedRestUtilities::FeatureInit
  u.fetcher = HostedRestUtilities::Fetcher
  u.make_fetch_def = HostedRestUtilities::MakeFetchDef
  u.make_context = HostedRestUtilities::MakeContext
  u.make_options = HostedRestUtilities::MakeOptions
  u.make_request = HostedRestUtilities::MakeRequest
  u.make_response = HostedRestUtilities::MakeResponse
  u.make_result = HostedRestUtilities::MakeResult
  u.make_point = HostedRestUtilities::MakePoint
  u.make_spec = HostedRestUtilities::MakeSpec
  u.make_url = HostedRestUtilities::MakeUrl
  u.param = HostedRestUtilities::Param
  u.prepare_auth = HostedRestUtilities::PrepareAuth
  u.prepare_body = HostedRestUtilities::PrepareBody
  u.prepare_headers = HostedRestUtilities::PrepareHeaders
  u.prepare_method = HostedRestUtilities::PrepareMethod
  u.prepare_params = HostedRestUtilities::PrepareParams
  u.prepare_path = HostedRestUtilities::PreparePath
  u.prepare_query = HostedRestUtilities::PrepareQuery
  u.graphql_body = HostedRestUtilities::GraphqlBody
  u.graphql_errors = HostedRestUtilities::GraphqlErrors
  u.result_basic = HostedRestUtilities::ResultBasic
  u.result_body = HostedRestUtilities::ResultBody
  u.result_headers = HostedRestUtilities::ResultHeaders
  u.transform_request = HostedRestUtilities::TransformRequest
  u.transform_response = HostedRestUtilities::TransformResponse
}
