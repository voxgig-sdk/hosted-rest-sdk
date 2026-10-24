# HostedRest SDK utility: prepare_body
require_relative 'media'
module HostedRestUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return HostedRestUtilities.raw_body(ctx.reqdata) if HostedRestUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
