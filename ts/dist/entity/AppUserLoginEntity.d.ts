import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { AppUserLogin, AppUserLoginCreateData } from '../HostedRestTypes';
declare class AppUserLoginEntity extends HostedRestEntityBase<AppUserLogin> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: AppUserLoginEntity): AppUserLoginEntity;
    create(this: any, reqdata?: AppUserLoginCreateData, ctrl?: Control): Promise<AppUserLoginEntity>;
}
export { AppUserLoginEntity };
