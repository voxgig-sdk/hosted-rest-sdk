import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { Legacy, LegacyListMatch, LegacyCreateData, LegacyRemoveMatch } from '../HostedRestTypes';
declare class LegacyEntity extends HostedRestEntityBase<Legacy> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: LegacyEntity): LegacyEntity;
    list(this: any, reqmatch?: LegacyListMatch, ctrl?: Control): Promise<LegacyEntity[]>;
    create(this: any, reqdata?: LegacyCreateData, ctrl?: Control): Promise<LegacyEntity>;
    remove(this: any, reqmatch?: LegacyRemoveMatch, ctrl?: Control): Promise<LegacyEntity>;
}
export { LegacyEntity };
