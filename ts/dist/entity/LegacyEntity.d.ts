import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { Legacy, LegacyRemoveMatch } from '../HostedRestTypes';
declare class LegacyEntity extends HostedRestEntityBase<Legacy> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: LegacyEntity): LegacyEntity;
    remove(this: any, reqmatch?: LegacyRemoveMatch, ctrl?: Control): Promise<LegacyEntity>;
}
export { LegacyEntity };
