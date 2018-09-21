import { RecordType, Resource } from 'react-restful';

import { apiEntry } from '@/restful/environments';

export interface CountByCustomerDTOS {
    readonly quantity: number;
    readonly time: string;
}

export type RevenueCustomerType = 'ALL' | 'NEW' | 'OLD';

export interface ReportCustomerCount extends RecordType {
    readonly countByCustomerDTOS: ReadonlyArray<CountByCustomerDTOS>;
    readonly revenueCustomerType: RevenueCustomerType;
}

export interface ReportCustomerCountPayload {
    readonly from: string;
    readonly to: string;
    readonly objectTypeDTOS: null;
    readonly spaBranchId: number | null;
}

export const reportCustomerResources = {
    countCustomer: new Resource<ReportCustomerCount[]>({
        url: apiEntry('/reportservice/api/spa/statistic/customer/count'),
        method: 'POST'
    })
};