import * as React from 'react'

import { text } from '@/utilities'

import { DatePicker } from '../data-entry'
import { datePickerDefaultProps } from './renderDatePickerField'

export class renderTimePickerField extends React.Component {
    static defaultProps = datePickerDefaultProps

    render() {
        const { input, placeholder, extra, locale, minuteStep } = this.props
        return (
            <DatePicker
                {...input}
                extra={extra}
                okText="Ok"
                dismissText={text('Hủy chọn')}
                mode="time"
                locale={locale}
                minuteStep={minuteStep}
            >
                {(typeof placeholder === 'function') ? placeholder(input.value) : (placeholder || null)}
            </DatePicker>
        )
    }
}