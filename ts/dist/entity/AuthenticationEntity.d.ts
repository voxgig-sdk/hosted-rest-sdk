import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { Authentication, AuthenticationCreateData } from '../HostedRestTypes';
declare class AuthenticationEntity extends HostedRestEntityBase<Authentication> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: AuthenticationEntity): AuthenticationEntity;
    create(this: any, reqdata?: AuthenticationCreateData, ctrl?: Control): Promise<AuthenticationEntity>;
}
export { AuthenticationEntity };
