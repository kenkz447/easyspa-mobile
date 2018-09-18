import * as React from 'react';

import { fetchErrorHandler } from '@/components';
import { Authenticator } from '@/domain';

import { LoginForm, LoginFormValues } from './login-form-control';

export interface LoginFormControlProps {
}

export class LoginFormControl extends React.PureComponent<LoginFormControlProps> {
    public render() {
        return (
            <LoginForm
                onSubmit={this.onSubmit}
            />
        );
    }

    readonly onSubmit = async (values: LoginFormValues) => {
        try {
            await Authenticator.instance.login(values.email, values.password, true);
        } catch (error) {
            throw fetchErrorHandler(error);
        }
    }
}