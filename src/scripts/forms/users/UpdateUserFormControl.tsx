import * as React from 'react';

import { fetchErrorHandler } from '@/components';
import { restfulFetcher, User, userResources } from '@/restful';

import { UpdateUserForm, UpdateUserFormValues } from './update-user-form';

export interface UpdateUserFormControlProps {
    readonly user: User;
}

export class UpdateUserFormControl extends React.PureComponent<UpdateUserFormControlProps> {
    public render() {
        const { user } = this.props;
        return (
            <UpdateUserForm
                onSubmit={this.onSubmit}
                initialValues={user}
                enableReinitialize={true}
            />
        );
    }

    readonly onSubmit = async (values: UpdateUserFormValues) => {
        try {
            await restfulFetcher.fetchResource(
                userResources.updateUser,
                [{
                    type: 'body',
                    value: values
                }]
            );
        } catch (error) {
            throw fetchErrorHandler(error);
        }
    }
}