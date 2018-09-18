import { Button, List } from 'antd-mobile';
import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';

import { RenderInput, required } from '@/components';
import { User } from '@/restful';

export interface UpdateUserFormOwnProps {

}

export interface UpdateUserFormValues extends User {
}

type UpdateUserFormProps = InjectedFormProps<UpdateUserFormValues, UpdateUserFormOwnProps>;

class UpdateUserFormComponent extends React.PureComponent<UpdateUserFormProps> {
    static readonly NameRequired = required('Nhập tên đầy đủ');

    public render() {
        const { handleSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <List>
                    <Field
                        name={nameof<UpdateUserFormValues>(o => o.name)}
                        component={RenderInput}
                        validate={UpdateUserFormComponent.NameRequired}
                        inputProps={{
                            children: 'Tên đầy đủ',
                            placeholder: 'Nhập họ tên'
                        }}
                    />
                </List>

                <Button type="primary">
                    Cập nhật
                </Button>
            </Form>
        );
    }
}

export const UpdateUserForm = reduxForm({
    form: 'UpdateUserForm'
})(UpdateUserFormComponent);