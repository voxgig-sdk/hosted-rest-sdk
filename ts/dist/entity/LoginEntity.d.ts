import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { Login, LoginCreateData } from '../HostedRestTypes';
declare class LoginEntity extends HostedRestEntityBase<Login> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: LoginEntity): LoginEntity;
    create(this: any, reqdata?: LoginCreateData, ctrl?: Control): Promise<LoginEntity>;
}
export { LoginEntity };
