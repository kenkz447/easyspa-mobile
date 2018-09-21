import { RecordType, Resource, ResourceType } from 'react-restful';

import { apiEntry } from '@/restful/environments';
import { ServicePackage } from '@/restful/resources/service-package';

import { DiscountUnit, SpabranchTransaction } from './spa-branch-transaction';

export type CustomerServicePackageStatus = 'ENABLE' | 'DISABLE';

export interface CustomerServicePackage extends RecordType {
    readonly id: number;
    readonly created: string;
    readonly udpated: string;
    readonly status: CustomerServicePackageStatus;
    readonly minute: number;
    readonly servicePackage: ServicePackage;
    readonly customerName: string;
    readonly total: number;
    readonly discountUnit: DiscountUnit;
    readonly discount: number;
    readonly quantity: number;
    readonly numbersOfUse: number;
    readonly numbersOfUseOrigin: number;
    readonly expiryDate: string;
    readonly payed: boolean;
    readonly spaBranchId: number;
    readonly spaId: number;
    readonly spaBranchTransaction: SpabranchTransaction;
}

export const customerServicePackageResourceType = new ResourceType({
    name: nameof<CustomerServicePackage>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const customerServicePackageResources = {
    getCustomerServicePackageByCustomerId: new Resource<CustomerServicePackage[]>({
        resourceType: customerServicePackageResourceType,
        url: apiEntry('/productservice/api/customer-service-package/customer'),
        method: 'POST'
    })
};