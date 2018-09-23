import { Button, List, WhiteSpace } from 'antd-mobile';
import * as React from 'react';
import { Field, Form, InjectedFormProps } from 'redux-form';

import { RenderDatePickerField, RenderInput, required } from '@/components';

import { NewBookingFormProps, NewBookingFormValue } from './NewBookingForm';

interface NewBookingFormStep01Props extends InjectedFormProps<
    NewBookingFormValue,
    NewBookingFormProps
    > {
    readonly next: () => void;
}
export class NewBookingFormStep01 extends React.Component<
    NewBookingFormProps & NewBookingFormStep01Props> {
    private readonly nameRequired = required('Nhập tên khách hàng');
    private readonly dateRequired = required('Nhập ngày tháng');
    private readonly timeRequired = required('Nhập thời gian');

    render() {
        const { invalid, next } = this.props;
        return (
            <React.Fragment>
                <List renderHeader={() => 'Thông tin khách hàng'}>
                    <Field
                        name={nameof.full<NewBookingFormValue>(o => o.customer!.name)}
                        component={RenderInput}
                        validate={this.nameRequired}
                        inputProps={{
                            children: <img src="/static/assets/search.png" />,
                            placeholder: 'Nhập tên khách hàng'
                        }}
                    />
                    <Field
                        name={nameof.full<NewBookingFormValue>(o => o.customer!.mobile)}
                        component={RenderInput}
                        inputProps={{
                            children: <img src="/static/assets/phone.png" />,
                            placeholder: 'Nhập số điện thoại'
                        }}
                    />
                    <Field
                        name={nameof.full<NewBookingFormValue>(o => o.customer!.email)}
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
                        validate={this.dateRequired}
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
                        validate={this.timeRequired}
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
            </React.Fragment>
        );
    }
}