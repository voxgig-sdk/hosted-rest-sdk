# HostedRest SDK feature factory

from hostedrest_sdk.feature.base_feature import HostedRestBaseFeature
from hostedrest_sdk.feature.ratelimit_feature import HostedRestRatelimitFeature
from hostedrest_sdk.feature.retry_feature import HostedRestRetryFeature
from hostedrest_sdk.feature.test_feature import HostedRestTestFeature
from hostedrest_sdk.feature.timeout_feature import HostedRestTimeoutFeature


_FEATURES = {
    "base": lambda: HostedRestBaseFeature(),
    "ratelimit": lambda: HostedRestRatelimitFeature(),
    "retry": lambda: HostedRestRetryFeature(),
    "test": lambda: HostedRestTestFeature(),
    "timeout": lambda: HostedRestTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
