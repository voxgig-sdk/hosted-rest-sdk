import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { CollectionRecord, CollectionRecordLoadMatch, CollectionRecordListMatch, CollectionRecordCreateData, CollectionRecordUpdateData } from '../HostedRestTypes';
declare class CollectionRecordEntity extends HostedRestEntityBase<CollectionRecord> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: CollectionRecordEntity): CollectionRecordEntity;
    load(this: any, reqmatch?: CollectionRecordLoadMatch, ctrl?: Control): Promise<CollectionRecordEntity>;
    list(this: any, reqmatch?: CollectionRecordListMatch, ctrl?: Control): Promise<CollectionRecordEntity[]>;
    create(this: any, reqdata?: CollectionRecordCreateData, ctrl?: Control): Promise<CollectionRecordEntity>;
    update(this: any, reqdata?: CollectionRecordUpdateData, ctrl?: Control): Promise<CollectionRecordEntity>;
}
export { CollectionRecordEntity };
