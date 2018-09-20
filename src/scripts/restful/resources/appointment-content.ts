import { RecordType } from 'react-restful';

import { Appointment } from './appointment';
import { Facility } from './facility';
import { Service } from './service';
import { Staff } from './staff';

export type CustomerType = 'SIGNLE' | 'GROUP';

export interface AppointmentContent extends RecordType {
    readonly appointmentCustomerType: CustomerType;
    readonly appointmentState?: string;
    readonly appointmentYear: number;
    readonly appointmentMonth: number;
    readonly appointmentDate: string;
    readonly appointmentDay: number;
    readonly appointmentHour: number;
    readonly appointmentMinute: number;

    readonly customerName: string;
    readonly humanStage?: string;
    readonly id?: number;

    readonly facilityId?: number;
    readonly staffId?: number;
    readonly serviceId?: number;
    readonly serviceName: string;
    readonly servicePrice: number;
    readonly serviceTime: number;

    readonly spaBranchId: number;
    readonly spaId: number;

    readonly appointment?: Appointment;
    readonly facility?: Facility;
    readonly staff?: Staff;
    readonly service: Service;

    readonly discountService?: number;
    readonly discountServiceUnit?: string;
    readonly discountServiceCharge?: number;
    readonly discountServiceChargeUnit?: string;
    readonly discountServiceValue?: number;
    readonly discountServiceChargeValue?: number;

    readonly customerServicePackageId?: number;
}
