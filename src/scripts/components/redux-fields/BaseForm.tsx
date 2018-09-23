import * as React from 'react';
import { InjectedFormProps } from 'redux-form';

interface BaseFormProps {
    readonly submit: () => void;
}

type LoginFormProps<FormValues, FormProps> = InjectedFormProps<FormValues, FormProps>;

export class BaseForm<FormValues, FormProps, S = {}> extends React.PureComponent<
    BaseFormProps &
    FormProps &
    LoginFormProps<FormValues, FormProps>,
    S> {

}