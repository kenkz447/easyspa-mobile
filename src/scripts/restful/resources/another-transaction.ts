import { Booking } from './booking';

export interface AnotherTransaction {
    readonly bookingId: number;
    readonly booking: Booking;
    readonly currency: string;
    readonly id: number;
    readonly name: string;
    readonly price: number;
    readonly quantity: number;
    readonly spaBranchId: number;
    readonly spaId: number;
    readonly status: 'DELETED' | 'ENABLE';
}