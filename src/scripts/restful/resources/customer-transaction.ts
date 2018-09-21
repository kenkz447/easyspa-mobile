import { RecordType, Resource, ResourceType } from 'react-restful';

import { apiEntry } from '@/restful/environments';

import { PaymentType } from './spa-branch-transaction';

export interface CustomerTransaction extends RecordType {
    readonly appointmentId: number;
    readonly bookingId: number;
    readonly code: string;
    readonly created: string;
    readonly createdBy: string;
    readonly creatorName: string;
    readonly customerId: number;
    readonly customerName: string;
    readonly id: string;
    readonly paymentType: PaymentType;
    readonly spaBranchId: number;
    readonly spaId: number;
    readonly total: number;
  }
  
export const customerTransactionResourceType = new ResourceType({
    name: nameof<CustomerTransaction>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const customerTransactionResources = {
    getCustomerTransactionByCustomerId: new Resource<CustomerTransaction[]>({
        resourceType: customerTransactionResourceType,
        url: apiEntry('/cashierservice/api/customer-transactions/customer/:customerId'),
        method: 'GET'
    })
};