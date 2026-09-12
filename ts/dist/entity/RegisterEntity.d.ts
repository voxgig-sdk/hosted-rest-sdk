import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { Register, RegisterCreateData } from '../HostedRestTypes';
declare class RegisterEntity extends HostedRestEntityBase<Register> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: RegisterEntity): RegisterEntity;
    create(this: any, reqdata?: RegisterCreateData, ctrl?: Control): Promise<RegisterEntity>;
}
export { RegisterEntity };
