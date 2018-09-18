import { RecordType, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environments';

export interface SpaBranch extends RecordType {
    readonly id: number;
}

export const spaBranchResourceType = new ResourceType<SpaBranch>({
    store: restfulStore,
    name: nameof<SpaBranch>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const spaBranchResources = {
    getMySpaBranch: new Resource<SpaBranch>({
        resourceType: spaBranchResourceType,
        url: apiEntry('/accountservice/api/account/spa-branch'),
        method: 'GET',
        mapDataToStore: (spaBranchBranch, resourceType, store) => {
            store.mapRecord(resourceType, spaBranchBranch);
        }
    })
};