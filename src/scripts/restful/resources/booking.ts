import { AnotherTransaction } from '@/restful/resources/another-transaction';
import { Customer } from '@/restful/resources/customer';
import { PaymentMethodItem } from '@/restful/resources/spa-branch-transaction';

import { Appointment } from './appointment';

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

export interface TransactionDTO {
    readonly invoiceCode?: string;
    readonly note?: string;
    readonly paymentMethodDTOS?: PaymentMethodItem[];
}