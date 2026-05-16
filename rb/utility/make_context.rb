# HostedRest SDK utility: make_context
require_relative '../core/context'
module HostedRestUtilities
  MakeContext = ->(ctxmap, basectx) {
    HostedRestContext.new(ctxmap, basectx)
  }
end
