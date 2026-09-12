import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { AppUserVerify, AppUserVerifyCreateData } from '../HostedRestTypes';
declare class AppUserVerifyEntity extends HostedRestEntityBase<AppUserVerify> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: AppUserVerifyEntity): AppUserVerifyEntity;
    create(this: any, reqdata?: AppUserVerifyCreateData, ctrl?: Control): Promise<AppUserVerifyEntity>;
}
export { AppUserVerifyEntity };
