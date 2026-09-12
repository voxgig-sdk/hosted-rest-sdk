import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { AgentUserList, AgentUserListListMatch } from '../HostedRestTypes';
declare class AgentUserListEntity extends HostedRestEntityBase<AgentUserList> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: AgentUserListEntity): AgentUserListEntity;
    list(this: any, reqmatch?: AgentUserListListMatch, ctrl?: Control): Promise<AgentUserListEntity[]>;
}
export { AgentUserListEntity };
