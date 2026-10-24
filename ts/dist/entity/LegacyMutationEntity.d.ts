import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { LegacyMutation, LegacyMutationListMatch, LegacyMutationCreateData, LegacyMutationUpdateData, LegacyMutationPatchData } from '../HostedRestTypes';
declare class LegacyMutationEntity extends HostedRestEntityBase<LegacyMutation> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: LegacyMutationEntity): LegacyMutationEntity;
    list(this: any, reqmatch?: LegacyMutationListMatch, ctrl?: Control): Promise<LegacyMutationEntity[]>;
    create(this: any, reqdata?: LegacyMutationCreateData, ctrl?: Control): Promise<LegacyMutationEntity>;
    update(this: any, reqdata?: LegacyMutationUpdateData, ctrl?: Control): Promise<LegacyMutationEntity>;
    patch(this: any, reqdata?: LegacyMutationPatchData, ctrl?: Control): Promise<LegacyMutationEntity>;
}
export { LegacyMutationEntity };
