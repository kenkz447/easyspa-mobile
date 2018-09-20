import { RecordType, Resource } from 'react-restful';

import { apiEntry } from '@/restful/environments';

export interface RevenueDTO {
    readonly revenueTotal: number;
    readonly time: string;
}

export type PaymentMethod = 'CASH' | 'CARD' | 'ORTHER' | 'TRANSFER' | 'DEBIT' | 'CASH_BACK' | 'ALL';

export interface ReportRevenue extends RecordType {
    readonly revenueDTOS: ReadonlyArray<RevenueDTO>;
    readonly paymentMethod: PaymentMethod;
}

export interface ReportRevenuePayPayload {
    readonly from: string;
    readonly paymentMethods: ReadonlyArray<string> | null;
    readonly spaBranchId: number | null;
    readonly to: string;
}

export const reportRevenuseResources = {
    getRevenueByPaymentMethod: new Resource<ReportRevenue[]>({
        url: apiEntry('/reportservice/api/spa/statistic/revenue/payment-method'),
        method: 'POST'
    })
};