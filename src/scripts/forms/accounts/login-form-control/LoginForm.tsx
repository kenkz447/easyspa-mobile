import { Button, List, WhiteSpace, WingBlank } from 'antd-mobile';
import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';

import { RenderInput, required } from '@/components';
import { BaseForm } from '@/components/redux-fields/BaseForm';

export interface LoginFormOwnProps {

}

export interface LoginFormValues {
    readonly email: string;
    readonly password: string;
}

class LoginFormComponent extends BaseForm<LoginFormValues, LoginFormOwnProps> {
    static readonly EmailRequired = required('Nhập Email');
    static readonly PasswordRequired = required('Nhập Mật khẩu');

    public render() {
        const { handleSubmit } = this.props;
        return (
            <Form
                onSubmit={handleSubmit}
            >
                <List>
                    <Field
                        name={nameof<LoginFormValues>(o => o.email)}
                        component={RenderInput}
                        validate={LoginFormComponent.EmailRequired}
                        inputProps={{
                            children: 'Emai',
                            placeholder: 'Email',
                            type: 'email'
                        }}
                    />
                    <Field
                        name={nameof<LoginFormValues>(o => o.password)}
                        component={RenderInput}
                        validate={LoginFormComponent.PasswordRequired}
                        inputProps={{
                            children: 'Password',
                            placeholder: 'Password',
                            type: 'password'
                        }}
                    />
                </List>
                <WhiteSpace size="lg" />
                <WingBlank>
                    <Button
                        type="primary"
                        onClick={this.props.submit}
                    >
                        Đăng nhập
                    </Button>
                </WingBlank>
            </Form >
        );
    }
}

export const LoginForm = reduxForm({
    form: 'LoginForm'
})(LoginFormComponent);