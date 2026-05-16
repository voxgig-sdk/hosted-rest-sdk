<?php
declare(strict_types=1);

// HostedRest SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class HostedRestFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new HostedRestBaseFeature();
            case "test":
                return new HostedRestTestFeature();
            default:
                return new HostedRestBaseFeature();
        }
    }
}
