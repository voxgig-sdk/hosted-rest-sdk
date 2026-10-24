import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { LegacyUser, LegacyUserLoadMatch, LegacyUserRemoveMatch } from '../HostedRestTypes';
declare class LegacyUserEntity extends HostedRestEntityBase<LegacyUser> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: LegacyUserEntity): LegacyUserEntity;
    load(this: any, reqmatch?: LegacyUserLoadMatch, ctrl?: Control): Promise<LegacyUserEntity>;
    remove(this: any, reqmatch?: LegacyUserRemoveMatch, ctrl?: Control): Promise<LegacyUserEntity>;
}
export { LegacyUserEntity };
