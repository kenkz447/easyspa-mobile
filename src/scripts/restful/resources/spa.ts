import { RecordType, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environments';

export interface Spa extends RecordType {
    readonly id: number;
}

export const spaResourceType = new ResourceType<Spa>({
    store: restfulStore,
    name: nameof<Spa>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const spaResources = {
    getMySpa: new Resource<Spa[]>({
        resourceType: spaResourceType,
        url: apiEntry('/accountservice/api/account/spa'),
        method: 'GET',
        mapDataToStore: (spa, resourceType, store) => {
            store.mapRecord(resourceType, spa);
        }
    })
};