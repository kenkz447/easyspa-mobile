import { Button } from 'antd-mobile';
import * as React from 'react';
import { ResourceParameter } from 'react-restful';

import { UpdateUserFormControl } from '@/forms/users/UpdateUserFormControl';
import {
    DeletedUserMeta,
    restfulFetcher,
    User,
    userResources,
    WithUserOwnProps,
    withUsers
} from '@/restful';

export interface TestProps extends WithUserOwnProps {

}

interface UserListState {
    readonly selectedUser?: User;
}

@withUsers()
export class UserList extends React.PureComponent<TestProps, UserListState> {
    readonly state: UserListState = {};

    public render() {
        const { users } = this.props;
        const { selectedUser } = this.state;

        return (
            <div style={{ padding: 15 }}>
                {
                    users.map(user => {
                        return (
                            <p key={user.id}>
                                Wellcome, <strong>{user.name}</strong>
                                <Button onClick={() => this.setState({ selectedUser: user })}>
                                    Sửa
                                </Button>
                                <Button
                                    type="warning"
                                    onClick={() => this.onDeleteUser(user)}
                                >
                                    Xóa
                                </Button>
                            </p>
                        );
                    })
                }
                {selectedUser && <UpdateUserFormControl user={selectedUser} />}
            </div>
        );
    }

    readonly onDeleteUser = async (user: User) => {
        const resourceMeta: DeletedUserMeta = {
            deletedUser: user
        };

        const resourceParam: ResourceParameter = {
            type: 'path',
            parameter: 'id',
            value: user.id
        };

        await restfulFetcher.fetchResource(
            userResources.deleteUser,
            [resourceParam],
            resourceMeta
        );
    }
}