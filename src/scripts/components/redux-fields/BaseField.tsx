import { Toast } from 'antd-mobile';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

export class BaseField<P> extends React.PureComponent<P & WrappedFieldProps> {
    readonly onErrorClick = () => {
        const { meta } = this.props;
        Toast.info(meta.error);
    }
}