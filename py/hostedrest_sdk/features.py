# HostedRest SDK feature factory

from hostedrest_sdk.feature.base_feature import HostedRestBaseFeature
from hostedrest_sdk.feature.test_feature import HostedRestTestFeature


def _make_feature(name):
    features = {
        "base": lambda: HostedRestBaseFeature(),
        "test": lambda: HostedRestTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
