import { InputItem } from 'antd-mobile';
import { InputItemProps } from 'antd-mobile/lib/input-item';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { BaseField } from '@/components/redux-fields/BaseField';

interface RenderInputField {
    readonly inputProps: InputItemProps;
}

export class RenderInput extends BaseField<RenderInputField> {
    render() {
        const { input, meta, inputProps } = this.props;

        const validateStatus = meta.touched && meta.invalid ? 'error' : undefined;
        const isError = validateStatus === 'error';

        return (
            <InputItem
                value={input.value ? input.value : undefined}
                onChange={input.onChange}
                onFocus={input.onFocus}
                onBlur={input.onBlur}
                error={isError}
                onErrorClick={this.onErrorClick}
                // tslint:disable-next-line:no-any
                {...inputProps as any}
            />
        );
    }
}