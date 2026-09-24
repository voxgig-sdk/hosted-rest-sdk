import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { AgentUser, AgentUserLoadMatch } from '../HostedRestTypes';
declare class AgentUserEntity extends HostedRestEntityBase<AgentUser> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: AgentUserEntity): AgentUserEntity;
    load(this: any, reqmatch?: AgentUserLoadMatch, ctrl?: Control): Promise<AgentUserEntity>;
}
export { AgentUserEntity };
