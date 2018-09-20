import { Resource, ResourceType } from 'react-restful';

import { apiEntry } from '@/restful/environments';

import { AnotherTransaction } from './another-transaction';
import { Appointment } from './appointment';
import { Customer } from './customer';
import { TransactionDTO } from './spa-branch-transaction';

export type AppointmentStatus = 'TEMP' | 'CONFIRMED' | 'CHECKIN' | 'CHECKOUT' | 'PAYED' | 'CANCEL';
export interface Booking {
    readonly id: number;
    readonly code: string;
    readonly date: string;
    readonly hour: number;
    readonly minute: number;
    readonly day: number;
    readonly month: number;
    readonly year: number;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly spaBranchId: number;
    readonly spaId: number;
    readonly totalAdult: number;
    readonly totalAmount: number;
    readonly totalAmountText: string;
    readonly totalCustomer: number;
    readonly totalKids: number;
    readonly appointments?: Array<Appointment>;
    readonly appointmentStatus: AppointmentStatus;
    readonly customerId: number;
    readonly customer: Customer;
    readonly bookingCustomerType?: 'SINGLE' | 'GROUP';
    readonly country?: string;
    readonly bookingColor: string;
    readonly anotherTransactions?: AnotherTransaction[];
    readonly payed?: boolean;
    readonly transactionDTO?: TransactionDTO;
    readonly note?: string;
}

export const bookingResourceType = new ResourceType({
    name: nameof<Booking>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const bookingResources = {
    getBySpaBranch: new Resource<Booking[]>({
        resourceType: bookingResourceType,
        url: apiEntry('/bookingservice/api/bookings/spa-branch/:spaBranchId'),
        method: 'POST',
        mapDataToStore: (bookings, resourceTYpe, store) => {
            for (const booking of bookings) {
                store.dataMapping(resourceTYpe, booking);
            }
        }
    }),
    getBookingByCustomerAndRangeTime: new Resource<Booking[]>({
        resourceType: bookingResourceType,
        url: apiEntry('/customerservice/api/customer-spa-branches/bookings'),
        method: 'POST'
    })
};