import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { Custom, CustomLoadMatch, CustomCreateData, CustomUpdateData, CustomPatchData, CustomRemoveMatch } from '../HostedRestTypes';
declare class CustomEntity extends HostedRestEntityBase<Custom> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: CustomEntity): CustomEntity;
    load(this: any, reqmatch?: CustomLoadMatch, ctrl?: Control): Promise<CustomEntity>;
    create(this: any, reqdata?: CustomCreateData, ctrl?: Control): Promise<CustomEntity>;
    update(this: any, reqdata?: CustomUpdateData, ctrl?: Control): Promise<CustomEntity>;
    patch(this: any, reqdata?: CustomPatchData, ctrl?: Control): Promise<CustomEntity>;
    remove(this: any, reqmatch?: CustomRemoveMatch, ctrl?: Control): Promise<CustomEntity>;
}
export { CustomEntity };
