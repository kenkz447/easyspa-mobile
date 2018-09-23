import * as React from 'react';

import { withAppContext } from '@/app';
import { DomainContext } from '@/domain';
import { Appointment } from '@/restful';

import { NewBookingForm } from './new-booking-from-control';

export interface NewBookingFormControlProps extends
    Pick<DomainContext, 'currentSpa'>,
    Pick<DomainContext, 'currentSpaBranch'> {
}

@withAppContext<DomainContext>('currentSpa', 'currentSpaBranch')
export class NewBookingFormControl extends React.PureComponent<NewBookingFormControlProps> {
    public render() {
        const { currentSpaBranch } = this.props;
        return (
            <NewBookingForm
                next={() => null}
                spaBranch={currentSpaBranch!}
            />
        );
    }

    readonly onSubmit = (formValues) => {
        const { currentSpa, currentSpaBranch } = this.props;

        const spaId = currentSpa!.id;
        const spaBranchId = currentSpaBranch!.id;

        const appointmentStatus = 'CONFIRMED';
        const totalCustomer = +formValues.totalCustomer[0];
        const bookingYears = formValues.date.getFullYear();
        const bookingMonth = formValues.date.getMonth();
        const bookingDay = formValues.date.getDate();
        const bookingHour = formValues.dayTime.getHours();
        const bookingMinute = formValues.dayTime.getMinutes();
        const bookingDate = new Date(bookingYears, bookingMonth, bookingDay, bookingHour, bookingMinute, 0);

        const appointments: Appointment[] = [];
        for (const appointmentIndex in formValues.appointments) {
            if (!formValues.appointments.hasOwnProperty(appointmentIndex)) {
                continue;
            }

            const appointment = formValues.appointments[appointmentIndex];
            let customerName = appointment.customerName;

            if (totalCustomer === 1) {
                customerName = formValues.name || 'Khách vãng lai';
            } else {
                if (!customerName) {
                    customerName = `Khách ${appointmentIndex + 1}`;
                }
            }

            const appointmentContentDate = new Date(bookingDate);

            appointments.push({
                spaId: spaId,
                spaBranchId: spaBranchId,
                appointmentStatus: appointmentStatus,
                appointmentType: 'RECEPTION',
                customerName: customerName,
                appointmentDate: bookingDate.toISOString(),
                year: bookingYears,
                month: bookingMonth,
                day: bookingDay,
                hour: bookingHour,
                minute: bookingMinute,
                appointmentContents: appointment.appointmentContents.map((appointmentContent) => {
                    const appointmentContentHour = appointmentContentDate.getHours();
                    const appointmentContentMinute = appointmentContentDate.getMinutes();

                    appointmentContentDate.setMinutes(appointmentContentMinute + appointmentContent.service.timeValue);
                    return {
                        spaId: spaId,
                        spaBranchId: spaBranchId,
                        humanStage: 'ADULT',

                        appointmentDate: bookingDate.toISOString(),
                        appointmentYear: bookingYears,
                        appointmentMonth: bookingMonth,
                        appointmentDay: bookingDay,
                        appointmentHour: appointmentContentHour,
                        appointmentMinute: appointmentContentMinute,

                        service: appointmentContent.service,
                        serviceId: appointmentContent.service.id,
                        serviceName: appointmentContent.service.name,
                        servicePrice: appointmentContent.service.price,
                        serviceTime: appointmentContent.service.timeValue,

                        appointmentCustomerType: 'SINGLE',
                        customerName: customerName,
                    };
                })
            });
        }

        const newBooking = {
            appointmentStatus: appointmentStatus,
            appointments: appointments,
            bookingCustomerType: 'SINGLE',
            date: bookingDate.toISOString(),
            year: bookingYears,
            month: bookingMonth,
            day: bookingDay,
            hour: bookingHour,
            minute: bookingMinute,
            totalCustomer: totalCustomer,

            customerId: formValues.customerId,
            name: formValues.name || 'Khách vãng lai',
            email: formValues.email,
            phone: formValues.mobile,

            spaId: spaId,
            spaBranchId: spaBranchId
        };
    }

    readonly onSubmitSuccess = (booking) => {
        // ...
    }
}
