import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { LegacyUnknown, LegacyUnknownLoadMatch } from '../HostedRestTypes';
declare class LegacyUnknownEntity extends HostedRestEntityBase<LegacyUnknown> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: LegacyUnknownEntity): LegacyUnknownEntity;
    load(this: any, reqmatch?: LegacyUnknownLoadMatch, ctrl?: Control): Promise<LegacyUnknownEntity>;
}
export { LegacyUnknownEntity };
