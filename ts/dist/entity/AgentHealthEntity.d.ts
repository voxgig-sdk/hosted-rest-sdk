import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { AgentHealth, AgentHealthLoadMatch } from '../HostedRestTypes';
declare class AgentHealthEntity extends HostedRestEntityBase<AgentHealth> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: AgentHealthEntity): AgentHealthEntity;
    load(this: any, reqmatch?: AgentHealthLoadMatch, ctrl?: Control): Promise<AgentHealthEntity>;
}
export { AgentHealthEntity };
