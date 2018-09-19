import { RecordType, Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environments';

export interface RevenueDTO {
    readonly revenueTotal: number;
    readonly time: string;
}

export type PaymentMethod = 'CASH' | 'CARD' | 'ORTHER' | 'TRANSFER' | 'DEBIT' | 'CASH_BACK' | 'ALL';

export interface ReportRevenue extends RecordType {
    readonly revenueDTOS: ReadonlyArray<RevenueDTO>;
    readonly paymentMethod: PaymentMethod;
}

export const reportRevenueResourceType = new ResourceType<ReportRevenue>({
    store: restfulStore,
    name: nameof<ReportRevenue>(),
    schema: [{
        field: 'paymentMethod',
        type: 'PK'
    }]
});

export interface ReportRevenuePayPayload {
    readonly from: string;
    readonly paymentMethods: ReadonlyArray<string> | null;
    readonly spaBranchId: number | null;
    readonly to: string;
}

export const reportRevenuseResources = {
    getRevenueByPaymentMethod: new Resource<ReportRevenue[]>({
        resourceType: reportRevenueResourceType,
        url: apiEntry('/reportservice/api/spa/statistic/revenue/payment-method'),
        method: 'POST',
        mapDataToStore: (reportRevenues, resourceType, store) => {
            for (const reportRevenue of reportRevenues) {
                store.dataMapping(resourceType, reportRevenue);
            }
        }
    })
};