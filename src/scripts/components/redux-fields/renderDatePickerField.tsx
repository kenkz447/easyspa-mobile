import { DatePicker } from 'antd-mobile';
import { DatePickerProps } from 'antd-mobile/lib/date-picker-view/PropsType';
import * as React from 'react';

import { BaseField } from './BaseField';

interface RenderDatePickerFieldProps {
    readonly inputProps: Partial<DatePickerProps>;
}

export const datePickerDefaultProps: DatePickerProps = {
    locale: {
        DatePickerLocale: {
            year: '',
            month: '',
            day: '',
            hour: ' giờ',
            minute: ' phút'
        },
        extra: 'Chọn',
        okText: 'OK',
        dismissText: 'Hủy chọn'
    }
};

export class RenderDatePickerField extends BaseField<RenderDatePickerFieldProps> {
    static readonly defaultProps: Partial<RenderDatePickerFieldProps> = {
        inputProps: datePickerDefaultProps
    };

    render() {
        const { input, inputProps } = this.props;
        return (
            <DatePicker
                {...input}
                {...datePickerDefaultProps}
                {...inputProps}
            />
        );
    }
}