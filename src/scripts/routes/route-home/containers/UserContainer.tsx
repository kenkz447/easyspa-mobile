import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withAppContext } from '@/app';
import { DomainContext } from '@/domain';
import { restfulFetcher, restfulStore, User, userResources } from '@/restful';

import { UserList } from './user-container';

type UserContainerProps =
    Pick<DomainContext, 'currentUser'> &
    Pick<DomainContext, 'currentSpaBranch'>;

@withAppContext<UserContainerProps>(
    'currentUser',
    'currentSpaBranch'
)
export class UserContainer extends React.PureComponent<UserContainerProps> {
    public render() {
        const { currentSpaBranch, currentUser } = this.props;

        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                resource={userResources.getAllUsersBySpaBranch}
                parameters={[{
                    type: 'path',
                    parameter: nameof<User>(o => o.spaBranchId),
                    value: currentSpaBranch!.id
                }]}
                render={(renderProps) => {
                    const { data } = renderProps;

                    if (!data) {
                        return null;
                    }

                    return (
                        <UserList
                            users={data}
                            currentUser={currentUser!}
                        />
                    );
                }}
            />
        );
    }
}