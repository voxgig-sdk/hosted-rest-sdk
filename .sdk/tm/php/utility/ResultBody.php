<?php
declare(strict_types=1);

// HostedRest SDK utility: result_body

class HostedRestResultBody
{
    public static function call(HostedRestContext $ctx): ?HostedRestResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
