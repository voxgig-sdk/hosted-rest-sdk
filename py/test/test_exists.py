# ProjectName SDK exists test

import pytest
from hostedrest_sdk import HostedRestSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = HostedRestSDK.test(None, None)
        assert testsdk is not None
