// tslint:disable:max-line-length
import * as React from 'react';

import { RouteInfo } from '@/app';

export interface BookingDetailParams {
    readonly bookingId: number | string;
}
 
export const routeBookingDetailInfo: RouteInfo = {
    path: `/booking/:${nameof<BookingDetailParams>(o => o.bookingId)}`,
    title: 'Thông tin lịch hẹn',
    isActive: () => {
        return false;
    }
};

export const getBookingDetailUrl = (params: BookingDetailParams) => {
    return routeBookingDetailInfo
        .path
        .replace(`:${nameof<BookingDetailParams>(o => o.bookingId)}`, params.bookingId as string);
};