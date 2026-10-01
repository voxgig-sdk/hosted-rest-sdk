import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { LegacyMutation, LegacyMutationUpdateData } from '../HostedRestTypes';
declare class LegacyMutationEntity extends HostedRestEntityBase<LegacyMutation> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: LegacyMutationEntity): LegacyMutationEntity;
    update(this: any, reqdata?: LegacyMutationUpdateData, ctrl?: Control): Promise<LegacyMutationEntity>;
}
export { LegacyMutationEntity };
