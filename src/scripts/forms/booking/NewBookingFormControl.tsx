import * as React from 'react';

import { withAppContext } from '@/app';
import { fetchErrorHandler } from '@/components';
import { DomainContext } from '@/domain';
import {
    Appointment,
    Booking,
    bookingResources,
    restfulFetcher
} from '@/restful';
import { AppointmentContent } from '@/restful/resources/appointment-content';
import { getBookingDetailUrl } from '@/routes';

import {
    NewBookingForm,
    NewBookingFormValue
} from './new-booking-from-control';

export interface NewBookingFormControlProps extends
    Pick<DomainContext, 'history'>,
    Pick<DomainContext, 'currentSpa'>,
    Pick<DomainContext, 'currentSpaBranch'> {
}

@withAppContext<DomainContext>('history', 'currentSpa', 'currentSpaBranch')
export class NewBookingFormControl extends React.PureComponent<NewBookingFormControlProps> {
    public render() {
        const { currentSpaBranch } = this.props;
        return (
            <NewBookingForm
                onSubmitSuccess={this.onSubmitSuccess}
                onSubmit={this.onSubmit}
                spaBranch={currentSpaBranch!}
                initialValues={{
                    totalCustomer: ['1'],
                    appointments: [{
                        appointmentContents: [{

                        }]
                        // tslint:disable-next-line:no-any
                    }] as any
                }}
            />
        );
    }

    readonly onSubmit = async (formValues: NewBookingFormValue) => {
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
                appointmentContents: appointment.appointmentContents.map((appointmentContent): AppointmentContent => {
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

        const newBooking: Booking = {
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
            name: formValues.customer!.name || 'Khách vãng lai',
            email: formValues.customer!.email,
            phone: formValues.customer!.mobile,
            note: formValues.note,
            bookingColor: '#108EE9',

            spaId: spaId,
            spaBranchId: spaBranchId
        };
        try {
            return await restfulFetcher.fetchResource(
                bookingResources.createBooking,
                [{
                    type: 'body',
                    value: newBooking
                }]
            );
        } catch (error) {
            throw fetchErrorHandler(error);
        }
    }

    private readonly onSubmitSuccess = (booking) => {
        const { history } = this.props;
        const bookingDetailUrl = getBookingDetailUrl({
            bookingId: booking.id
        });

        history!.push(bookingDetailUrl);
    }
}
