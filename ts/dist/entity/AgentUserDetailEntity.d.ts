import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { AgentUserDetail, AgentUserDetailLoadMatch } from '../HostedRestTypes';
declare class AgentUserDetailEntity extends HostedRestEntityBase<AgentUserDetail> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: AgentUserDetailEntity): AgentUserDetailEntity;
    load(this: any, reqmatch?: AgentUserDetailLoadMatch, ctrl?: Control): Promise<AgentUserDetailEntity>;
}
export { AgentUserDetailEntity };
