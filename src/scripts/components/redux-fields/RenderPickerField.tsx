import { Picker } from 'antd-mobile';
import { PickerPropsType } from 'antd-mobile/lib/picker/PropsType';
import * as React from 'react';

import { BaseField } from './BaseField';

interface RenderPickerFieldProps {
    readonly inputProps: PickerPropsType & {
        readonly children: JSX.Element | Function
    };
}

export class RenderPickerField extends BaseField<RenderPickerFieldProps> {
    render() {
        const { input, inputProps } = this.props;
        const { children } = inputProps;
        return (
            <Picker
                {...input}
                {...inputProps}
            >
                {(typeof children === 'function') ? children(input.value) : (children || null)}
            </Picker>
        );
    }
}