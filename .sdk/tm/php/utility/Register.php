<?php
declare(strict_types=1);

// HostedRest SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

HostedRestUtility::setRegistrar(function (HostedRestUtility $u): void {
    $u->clean = [HostedRestClean::class, 'call'];
    $u->done = [HostedRestDone::class, 'call'];
    $u->make_error = [HostedRestMakeError::class, 'call'];
    $u->feature_add = [HostedRestFeatureAdd::class, 'call'];
    $u->feature_hook = [HostedRestFeatureHook::class, 'call'];
    $u->feature_init = [HostedRestFeatureInit::class, 'call'];
    $u->fetcher = [HostedRestFetcher::class, 'call'];
    $u->make_fetch_def = [HostedRestMakeFetchDef::class, 'call'];
    $u->make_context = [HostedRestMakeContext::class, 'call'];
    $u->make_options = [HostedRestMakeOptions::class, 'call'];
    $u->make_request = [HostedRestMakeRequest::class, 'call'];
    $u->make_response = [HostedRestMakeResponse::class, 'call'];
    $u->make_result = [HostedRestMakeResult::class, 'call'];
    $u->make_point = [HostedRestMakePoint::class, 'call'];
    $u->make_spec = [HostedRestMakeSpec::class, 'call'];
    $u->make_url = [HostedRestMakeUrl::class, 'call'];
    $u->param = [HostedRestParam::class, 'call'];
    $u->prepare_auth = [HostedRestPrepareAuth::class, 'call'];
    $u->prepare_body = [HostedRestPrepareBody::class, 'call'];
    $u->prepare_headers = [HostedRestPrepareHeaders::class, 'call'];
    $u->prepare_method = [HostedRestPrepareMethod::class, 'call'];
    $u->prepare_params = [HostedRestPrepareParams::class, 'call'];
    $u->prepare_path = [HostedRestPreparePath::class, 'call'];
    $u->prepare_query = [HostedRestPrepareQuery::class, 'call'];
    $u->result_basic = [HostedRestResultBasic::class, 'call'];
    $u->result_body = [HostedRestResultBody::class, 'call'];
    $u->result_headers = [HostedRestResultHeaders::class, 'call'];
    $u->transform_request = [HostedRestTransformRequest::class, 'call'];
    $u->transform_response = [HostedRestTransformResponse::class, 'call'];
});
