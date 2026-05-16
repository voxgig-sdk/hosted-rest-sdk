<?php
declare(strict_types=1);

// HostedRest SDK utility: prepare_body

class HostedRestPrepareBody
{
    public static function call(HostedRestContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
