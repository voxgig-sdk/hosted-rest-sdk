import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { AppUserSession, AppUserSessionLoadMatch } from '../HostedRestTypes';
declare class AppUserSessionEntity extends HostedRestEntityBase<AppUserSession> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: AppUserSessionEntity): AppUserSessionEntity;
    load(this: any, reqmatch?: AppUserSessionLoadMatch, ctrl?: Control): Promise<AppUserSessionEntity>;
}
export { AppUserSessionEntity };
