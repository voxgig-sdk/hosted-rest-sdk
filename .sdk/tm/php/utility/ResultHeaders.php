<?php
declare(strict_types=1);

// HostedRest SDK utility: result_headers

class HostedRestResultHeaders
{
    public static function call(HostedRestContext $ctx): ?HostedRestResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
