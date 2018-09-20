import { Resource } from 'react-restful';

import { apiEntry } from '@/restful/environments';
import { AppointmentStatus } from '@/restful/resources/appointment';

export interface ReportCount {
    readonly countResult: number;
}

export interface ReportTransactionCountPayload {
    readonly from: string;
    readonly to: string;
    readonly spaBranchId: number | null;
}

export interface ReportBookingCountPayload extends ReportTransactionCountPayload {
    readonly statuses: Array<AppointmentStatus>;
}

export const reportCountResources = {
    transaction: new Resource<ReportCount>({
        url: apiEntry('/reportservice/api/statistic/transaction'),
        method: 'POST'
    }),
    booking: new Resource<ReportCount>({
        url: apiEntry('/reportservice/api/statistic/booking'),
        method: 'POST'
    })
};