<?php
declare(strict_types=1);

// HostedRest SDK utility: feature_add

class HostedRestFeatureAdd
{
    public static function call(HostedRestContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
