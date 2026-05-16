# HostedRest SDK utility: feature_add
module HostedRestUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
