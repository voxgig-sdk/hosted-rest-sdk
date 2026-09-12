import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { LegacyUnknownList, LegacyUnknownListListMatch } from '../HostedRestTypes';
declare class LegacyUnknownListEntity extends HostedRestEntityBase<LegacyUnknownList> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: LegacyUnknownListEntity): LegacyUnknownListEntity;
    list(this: any, reqmatch?: LegacyUnknownListListMatch, ctrl?: Control): Promise<LegacyUnknownListEntity[]>;
}
export { LegacyUnknownListEntity };
