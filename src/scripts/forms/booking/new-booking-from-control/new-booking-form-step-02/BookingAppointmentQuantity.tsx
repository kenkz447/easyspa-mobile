import { List } from 'antd-mobile';
import * as React from 'react';
import { Store } from 'redux';
import { change, Field, formValueSelector } from 'redux-form';

import { RenderPickerField } from '@/components';
import { Appointment } from '@/restful';

const totalCustomerData: {
    readonly [key: string]: string
}[] = [];

for (let index = 1; index <= 50; index++) {
    totalCustomerData.push({
        value: String(index),
        label: String(index)
    });
}

export interface BookingAppointmentQuantityProps {
    readonly fieldName: string;
    readonly store: Store;
}

export class BookingAppointmentQuantity extends React.PureComponent<BookingAppointmentQuantityProps> {
    public render() {
        const { fieldName } = this.props;
        return (
            <Field
                name={fieldName}
                component={RenderPickerField}
                onChange={this.onTotalCustomerChange}
                inputProps={{
                    data: totalCustomerData,
                    cols: 1,
                    children: (
                        <List.Item>
                            <span>Số lượng khách</span>
                        </List.Item>
                    ),
                    extra: 'Chọn'
                }}
            />
        );
    }

    private readonly onTotalCustomerChange = (value) => {
        const { store } = this.props;
        const totalCustomer = +value[0];

        const selector = formValueSelector('booking-form');
        const currentAppointments = selector(store.getState(), 'appointments');

        const nextAppointments: Partial<Appointment>[] = [];
        for (let index = 0; index < totalCustomer; index++) {
            if (currentAppointments[index]) {
                nextAppointments.push(currentAppointments[index]);
            } else {
                nextAppointments.push({
                    // tslint:disable-next-line:no-any
                    appointmentContents: [{}] as any,
                });
            }
        }
        const changeAppointmentAction = change('booking-form', 'appointments', nextAppointments);
        store.dispatch(changeAppointmentAction);
    }
}