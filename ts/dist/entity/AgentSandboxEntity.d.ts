import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { AgentSandbox, AgentSandboxLoadMatch, AgentSandboxCreateData } from '../HostedRestTypes';
declare class AgentSandboxEntity extends HostedRestEntityBase<AgentSandbox> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: AgentSandboxEntity): AgentSandboxEntity;
    load(this: any, reqmatch?: AgentSandboxLoadMatch, ctrl?: Control): Promise<AgentSandboxEntity>;
    create(this: any, reqdata?: AgentSandboxCreateData, ctrl?: Control): Promise<AgentSandboxEntity>;
}
export { AgentSandboxEntity };
