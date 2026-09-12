import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { LegacyUserList, LegacyUserListListMatch } from '../HostedRestTypes';
declare class LegacyUserListEntity extends HostedRestEntityBase<LegacyUserList> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: LegacyUserListEntity): LegacyUserListEntity;
    list(this: any, reqmatch?: LegacyUserListListMatch, ctrl?: Control): Promise<LegacyUserListEntity[]>;
}
export { LegacyUserListEntity };
