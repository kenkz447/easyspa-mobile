import { RecordType, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environments';

import { ServiceCategory } from './service-category';

export interface Service extends RecordType {
    readonly id: number;
    readonly description: string;
    readonly name: string;
    readonly time: number;
    readonly timeValue: number;
    readonly price: number;
    readonly priceText: string;
    readonly serviceCategory: ServiceCategory;
    readonly spaBranchId: number;
    readonly spaId: number;
    readonly status: 'ENABLE' | 'DISABLE';
}

export const serviceResourceType = new ResourceType<Service>({
    store: restfulStore,
    name: nameof<Service>(),
    schema: [{
        type: 'PK',
        field: 'id'
    }]
});

export const serviceResources = {
    getBySpaBranch: new Resource<{ readonly content: Service[] }>({
        resourceType: serviceResourceType,
        url: apiEntry('/productservice/api/services/spa-branch/:spaBranchId'),
        method: 'GET',
        mapDataToStore: (response, resourceType, store) => {
            for (const service of response.content) {
                store.mapRecord(resourceType, service);
            }
        }
    })
};