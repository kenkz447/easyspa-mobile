import { Picker } from 'antd-mobile';
import { PickerPropsType } from 'antd-mobile/lib/picker/PropsType';
import * as React from 'react';

import { BaseField } from './BaseField';

interface RenderPickerFieldProps {
    readonly inputProps: PickerPropsType;
}

export class RenderPickerField extends BaseField<RenderPickerFieldProps> {
    render() {
        const { input, inputProps } = this.props;
        return (
            <Picker
                {...input}
                {...inputProps}
            />
        );
    }
}