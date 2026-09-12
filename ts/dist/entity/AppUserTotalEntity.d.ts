import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { AppUserTotal, AppUserTotalLoadMatch } from '../HostedRestTypes';
declare class AppUserTotalEntity extends HostedRestEntityBase<AppUserTotal> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: AppUserTotalEntity): AppUserTotalEntity;
    load(this: any, reqmatch?: AppUserTotalLoadMatch, ctrl?: Control): Promise<AppUserTotalEntity>;
}
export { AppUserTotalEntity };
