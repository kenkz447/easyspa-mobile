import { Switch } from 'antd-mobile';
import * as React from 'react';

import { BaseField } from '@/components/redux-fields/BaseField';

export class RenderSwitchField extends BaseField<{}> {
    render() {
        const { input } = this.props;
        return (
            <Switch
                {...input}
                checked={input.value || false}
            />
        );
    }
}