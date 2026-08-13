# HostedRest SDK utility: make_context

from hostedrest_sdk.core.context import HostedRestContext


def make_context_util(ctxmap, basectx):
    return HostedRestContext(ctxmap, basectx)
