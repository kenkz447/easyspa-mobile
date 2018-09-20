import {
    classDecoratorFactory,
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer
} from 'react-restful';

import { DomainContext } from '@/domain';
import { apiEntry, restfulStore } from '@/restful/environments';

export interface Customer extends RecordType {
    readonly id: number;
    readonly mobile: string;
    readonly name: string;
    readonly email: string;
    readonly spaBranchId: number;
    readonly spaId: number;
}

export const customerResourceType = new ResourceType<Customer>({
    store: restfulStore,
    name: nameof<Customer>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const customerResources = {
    createCustomer: new Resource<Customer>({
        resourceType: customerResourceType,
        url: apiEntry('/customerservice/api/customer-spa-branches'),
        method: 'POST',
        mapDataToStore: (data, resourceType, store) => {
            store.dataMapping(resourceType, data);
        }
    }),
    getCustomersBySpaBranch: new Resource<Customer[]>({
        resourceType: customerResourceType,
        url: apiEntry('/customerservice/api/customer-spa-branches'),
        method: 'GET',
        mapDataToStore: (customers, resourceType, store) => {
            for (const customer of customers) {
                store.dataMapping(resourceType, customer);
            }
        }
    }),
    getCustomerById: new Resource<Customer>({
        resourceType: customerResourceType,
        url: apiEntry('/customerservice/api/customer-spa-branches/:customerId'),
        method: 'GET'
    })
    ,
    updateUser: new Resource<Customer>({
        resourceType: customerResourceType,
        url: apiEntry('/customerservice/api/customer-spa-branches'),
        method: 'PUT',
        mapDataToStore: (updatedCustomer, resourceType, store) => {
            store.dataMapping(resourceType, updatedCustomer);
        }
    })
};

export interface WithCustomersProps {
    readonly customers: ReadonlyArray<Customer>;
}

export type WithCustomerOwnProps =  WithCustomersProps;

export const withCustomers = <P extends WithCustomerOwnProps>() => {
    const container = restfulDataContainer<Customer, WithCustomersProps, P>({
        resourceType: customerResourceType,
        store: restfulStore,
        shouldTrackingNewRecord: (record, ownProps, trackedUsers) => {
            return true;
        },
        mapToProps: (customers) => {
            return {
                customers: customers
            };
        }
    });

    return classDecoratorFactory<P>(container);
};