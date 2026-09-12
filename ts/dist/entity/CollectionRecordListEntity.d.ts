import { HostedRestEntityBase } from '../HostedRestEntityBase';
import type { HostedRestSDK } from '../HostedRestSDK';
import type { Control } from '../types';
import type { CollectionRecordList, CollectionRecordListListMatch } from '../HostedRestTypes';
declare class CollectionRecordListEntity extends HostedRestEntityBase<CollectionRecordList> {
    constructor(client: HostedRestSDK, entopts: any);
    make(this: CollectionRecordListEntity): CollectionRecordListEntity;
    list(this: any, reqmatch?: CollectionRecordListListMatch, ctrl?: Control): Promise<CollectionRecordListEntity[]>;
}
export { CollectionRecordListEntity };
