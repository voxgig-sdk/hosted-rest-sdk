<?php
declare(strict_types=1);

// HostedRest SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class HostedRestMakeContext
{
    public static function call(array $ctxmap, ?HostedRestContext $basectx): HostedRestContext
    {
        return new HostedRestContext($ctxmap, $basectx);
    }
}
