import { Button, List, WhiteSpace, WingBlank } from 'antd-mobile';
import { Moment } from 'moment';
import * as React from 'react';
import { Field, Form, reduxForm } from 'redux-form';

import { RenderDatePickerField, RenderInput } from '@/components';
import { BaseForm } from '@/components/redux-fields/BaseForm';
import { Booking, SpaBranch } from '@/restful';

export const createBookingFormName = 'booking-form';

export interface NewBookingFormValue extends Booking {
    readonly dayTime: Moment;
}

export interface NewBookingFormStep01Props {
    readonly spaBranch: SpaBranch;
    readonly next: () => void;
}

export class NewBookingFormStep01Component extends BaseForm<NewBookingFormValue, NewBookingFormStep01Props> {
    render() {
        const { invalid, next } = this.props;
        return (
            <Form>
                <List renderHeader={() => 'Thông tin khách hàng'}>
                    <Field
                        name={nameof<NewBookingFormValue>(o => o.customer.name)}
                        component={RenderInput}
                        inputProps={{
                            children: <img src="/static/assets/search.png" />,
                            placeholder: 'Nhập tên khách hàng'
                        }}
                    />
                    <Field
                        name={nameof<NewBookingFormValue>(o => o.customer.mobile)}
                        component={RenderInput}
                        inputProps={{
                            children: <img src="/static/assets/phone.png" />,
                            placeholder: 'Nhập số điện thoại'
                        }}
                    />
                    <Field
                        name={nameof<NewBookingFormValue>(o => o.customer.email)}
                        component={RenderInput}
                        type="email"
                        inputProps={{
                            children: <img src="/static/assets/email.png" />,
                            placeholder: 'Nhập email'
                        }}
                    />
                </List>
                <List renderHeader={() => 'Thông tin lịch hẹn'}>
                    <Field
                        name={nameof<NewBookingFormValue>(o => o.date)}
                        component={RenderDatePickerField}
                        inputProps={{
                            mode: 'date',
                            children: (
                                <List.Item>
                                    <img src="/static/assets/calendar.png" />
                                </List.Item>
                            )
                        }}
                    />
                    <Field
                        name={nameof<NewBookingFormValue>(o => o.dayTime)}
                        component={RenderDatePickerField}
                        inputProps={{
                            mode: 'time',
                            children: (
                                <List.Item>
                                    <img src="/static/assets/clock.png" />
                                </List.Item>
                            )
                        }}
                    />
                </List>
                <WhiteSpace />
                <Button
                    type="primary"
                    disabled={invalid}
                    onClick={next}
                >
                    Chọn dịch vụ
                </Button>
                <WhiteSpace />
            </Form>
        );
    }
}

export const NewBookingForm = reduxForm<Booking, NewBookingFormStep01Props>({
    form: createBookingFormName,
    destroyOnUnmount: false
})(NewBookingFormStep01Component);