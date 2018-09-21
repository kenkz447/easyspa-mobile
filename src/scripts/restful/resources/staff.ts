import { RecordType, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environments';

import { Service } from './service';

export interface Staff extends RecordType {
    readonly dob: string;
    readonly id: number;
    readonly mobile: string;
    readonly name: string;
    readonly position: string;
    readonly spaBranchId: number;
    readonly spaId: number;
    readonly status: string;
    readonly services: Array<Service>;
    readonly workAllServices: boolean;
    readonly staffStatus: 'WORKED' | 'STOPPED' | 'BLOCKED';
    readonly staffType: 'OFFICIAL' | 'CASUAL';
}

export const staffResourceType = new ResourceType<Staff>({
    store: restfulStore,
    name: nameof<Staff>(),
    schema: [{
        type: 'PK',
        field: 'id'
    }]
});

export const staffResources = {
    getById: new Resource<Staff>({
        resourceType: staffResourceType,
        url: apiEntry('/employeeservice/api/staff/:id'),
        method: 'GET',
        mapDataToStore: (staff, resourceType, store) => {
            store.mapRecord(resourceType, staff);
        }
    })
};