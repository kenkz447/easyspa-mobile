import { Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environments';
import { Service } from '@/restful/resources/service';
import { dateSortDesc } from '@/utilities';

import { AnotherTransaction } from './another-transaction';
import { Appointment, AppointmentStatus } from './appointment';
import { Customer } from './customer';
import { TransactionDTO } from './spa-branch-transaction';

const groupBy = require('lodash/groupBy');
const map = require('lodash/map');

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
    readonly appointments: Array<Appointment>;
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
    store: restfulStore,
    name: nameof<Booking>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export interface GetBookingBySpaBranchPayload {
    readonly from: string;
    readonly to: string;
    readonly status?: AppointmentStatus;
}

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
    getById: new Resource<Booking>({
        resourceType: bookingResourceType,
        url: apiEntry('/bookingservice/api/bookings/:id'),
        method: 'GET',
        mapDataToStore: (booking, resourceTYpe, store) => {
            store.dataMapping(resourceTYpe, booking);
        }
    })
};

export const bookingUtils = {
    getServices: (booking: Booking): Array<{
        readonly quantity: number;
        readonly service: Service;
    }> => {
        const services: Service[] = [];
        for (const appointment of booking.appointments) {
            for (const appointmentContent of appointment.appointmentContents!) {
                services.push(appointmentContent.service);
            }
        }

        const serviceGroupById = groupBy(services, 'id');
        const result = map(serviceGroupById, (serviceGroup: Service[]) => {
            return {
                quantity: serviceGroup.length,
                service: serviceGroup[0]
            };
        });

        return result;
    },
    getCompletedTime: (booking: Booking) => {
        const appointmentContentTime: Date[] = [];
        for (const appointment of booking.appointments) {
            const lastAppointmentContentIndex = appointment.appointmentContents.length - 1;
            const lastAppointmentContent = appointment.appointmentContents[lastAppointmentContentIndex];

            const appointmentContextTime = new Date(lastAppointmentContent.appointmentDate);
            appointmentContextTime.setMinutes(
                appointmentContextTime.getMinutes() + lastAppointmentContent.service.timeValue
            );
            appointmentContentTime.push(appointmentContextTime);
        }

        const sortedDates = appointmentContentTime.sort(dateSortDesc);

        return sortedDates[0];
    }
};