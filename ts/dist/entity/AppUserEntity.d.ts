import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { AppUser, AppUserLoadMatch, AppUserListMatch, AppUserCreateData, AppUserUpdateData, AppUserRemoveMatch } from '../HostedRestTypes';
declare class AppUserEntity extends HostedRestEntityBase<AppUser> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: AppUserEntity): AppUserEntity;
    load(this: any, reqmatch?: AppUserLoadMatch, ctrl?: Control): Promise<AppUserEntity>;
    list(this: any, reqmatch?: AppUserListMatch, ctrl?: Control): Promise<AppUserEntity[]>;
    create(this: any, reqdata?: AppUserCreateData, ctrl?: Control): Promise<AppUserEntity>;
    update(this: any, reqdata?: AppUserUpdateData, ctrl?: Control): Promise<AppUserEntity>;
    remove(this: any, reqmatch?: AppUserRemoveMatch, ctrl?: Control): Promise<AppUserEntity>;
}
export { AppUserEntity };
