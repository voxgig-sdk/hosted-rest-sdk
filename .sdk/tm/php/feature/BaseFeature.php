<?php
declare(strict_types=1);

// HostedRest SDK base feature

class HostedRestBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(HostedRestContext $ctx, array $options): void {}
    public function PostConstruct(HostedRestContext $ctx): void {}
    public function PostConstructEntity(HostedRestContext $ctx): void {}
    public function SetData(HostedRestContext $ctx): void {}
    public function GetData(HostedRestContext $ctx): void {}
    public function GetMatch(HostedRestContext $ctx): void {}
    public function SetMatch(HostedRestContext $ctx): void {}
    public function PrePoint(HostedRestContext $ctx): void {}
    public function PreSpec(HostedRestContext $ctx): void {}
    public function PreRequest(HostedRestContext $ctx): void {}
    public function PreResponse(HostedRestContext $ctx): void {}
    public function PreResult(HostedRestContext $ctx): void {}
    public function PreDone(HostedRestContext $ctx): void {}
    public function PreUnexpected(HostedRestContext $ctx): void {}
}
