import { Moment } from 'moment';

import { AnotherTransaction } from './another-transaction';
import { AppointmentContent } from './appointment-content';
import { Booking } from './booking';

export type AppointmentStatus = 'TEMP' | 'CONFIRMED' | 'CHECKIN' | 'CHECKOUT' | 'CANCEL';
export type AppointmentStatusTitle = 'Mới' | 'Đã xác nhận' | 'Đang làm' | 'Đang chờ' | 'Xong' | 'Hủy';

interface AppointmentDomain {
    readonly checkinTime?: string;
    readonly checkoutTime?: string;
    readonly appointmentColor?: Booking['bookingColor'];
    readonly currency?: string;
    readonly discountValue?: number;
    readonly discount?: number;
    readonly discountUnit?: 'MONEY' | 'PRECENT';
    readonly day?: number;
    readonly hour?: number;
    readonly id?: number;
    readonly minute?: number;
    readonly month?: number;
    readonly spaBranchId?: number;
    readonly spaId?: number;
    readonly totalAdult?: number;
    readonly totalAmount?: number;
    readonly totalAmountText?: string;
    readonly customerName?: string;
    readonly totalKids?: number;
    readonly year?: number;
    readonly note?: string;
    readonly appointmentType: 'RECEPTION' | 'PHONE' | 'EMAIL' | 'ONLINE';
    readonly appointmentContents: Array<AppointmentContent>;
    readonly appointmentStatus: AppointmentStatus;
    readonly appointmentCustomerType?: Booking['bookingCustomerType'];
    readonly customerSex?: 'MALE' | 'FEMALE';
    readonly booking?: Booking;
    readonly appointmentDate?: string;
    readonly payed?: boolean;
    readonly anotherTransactions?: AnotherTransaction[];
}

export interface Appointment extends AppointmentDomain {
    readonly appointmentDateMoment?: Moment;
    readonly appointmentDateMomentEnd?: Moment;
}

interface AppointmentType {
    readonly value: AppointmentDomain['appointmentType'];
    readonly title: string;
}

export const allAppointmentType: AppointmentType[] = [
    { value: 'RECEPTION', title: 'Tại Quầy' },
    { value: 'EMAIL', title: 'Email' },
    { value: 'ONLINE', title: 'Online' },
    { value: 'PHONE', title: 'Điện thoại' },
];

interface AppointmentStatusItem {
    readonly value: AppointmentDomain['appointmentStatus'];
    readonly title: string;
}

export const allApointmentStatus: AppointmentStatusItem[] = [
    { value: 'TEMP', title: 'Mới' },
    { value: 'CONFIRMED', title: 'Đã xác nhận' },
    { value: 'CHECKIN', title: 'Checkin' },
    { value: 'CHECKOUT', title: 'Checkout' },
    { value: 'CANCEL', title: 'Hủy bỏ' }
];

export interface AppointmentDiscount {
    readonly discounts: ServiceDiscount[];
    readonly id: number;
    readonly discount: number;
    readonly discountUnit: string;
}

export interface ServiceDiscount {
    readonly discountService: number;
    readonly discountServiceCharge: number;
    readonly discountServiceChargeUnit: string;
    readonly discountServiceUnit: string;
    readonly serviceId: number;
}

export const appointmentUtils = {
    getStatusInfo: (status: AppointmentStatus) => {
        const statusInfo = allApointmentStatus.find(o => o.value === status);
        let statusColor: string = '#FF9500';
        if (status === 'CHECKIN') {
            statusColor = '#5AC8FA';
        } else if (status === 'CHECKOUT') {
            statusColor = '#4CD964';
        }

        return {
            title: statusInfo!.title,
            color: statusColor
        };
    }
};