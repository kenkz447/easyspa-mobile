import {
    classDecoratorFactory,
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer
} from 'react-restful';

import { DomainContext } from '@/domain';
import { apiEntry, restfulStore } from '@/restful/environments';

export interface User extends RecordType {
    readonly id: number;
    readonly activated: boolean;
    readonly imageUrl: string;
    readonly name: string;
    readonly email: string;
    readonly login: string;
    readonly spaBranchId: number;
    readonly spaId: number;
}

export interface DeletedUserMeta {
    readonly deletedUser: User;
}

export const userResourceType = new ResourceType<User>({
    store: restfulStore,
    name: nameof<User>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const userResources = {
    account: new Resource<User>({
        resourceType: userResourceType,
        url: apiEntry('/accountservice/api/account'),
        method: 'GET',
        mapDataToStore: (data, resourceType, store) => {
            store.dataMapping(resourceType, data);
        }
    }),
    getAllUsersBySpaBranch: new Resource<User[]>({
        resourceType: userResourceType,
        url: apiEntry('/accountservice/api/users/spa-branch/:spaBranchId'),
        method: 'GET',
        mapDataToStore: (users, resourceType, store) => {
            for (const user of users) {
                store.dataMapping(resourceType, user);
            }
        }
    }),
    updateUser: new Resource<User>({
        resourceType: userResourceType,
        url: apiEntry('/accountservice/api/users'),
        method: 'PUT',
        mapDataToStore: (updatedUser, resourceType, store) => {
            store.dataMapping(resourceType, updatedUser);
        }
    }),
    deleteUser: new Resource<{}, DeletedUserMeta>({
        resourceType: userResourceType,
        url: apiEntry('/accountservice/api/users/:id'),
        method: 'DELETE',
        afterFetch: (params, fetchResult, meta, resourceType, store) => {
            store.removeRecord(resourceType, meta!.deletedUser);
        }
    })
};

export interface WithUsersProps {
    readonly users: ReadonlyArray<User>;
}

export type WithUserOwnProps =
    Required<Pick<DomainContext, 'currentUser'>> &
    WithUsersProps;

export const withUsers = <P extends WithUserOwnProps>() => {
    const container = restfulDataContainer<User, WithUsersProps, P>({
        resourceType: userResourceType,
        store: restfulStore,
        shouldTrackingNewRecord: (record, ownProps, trackedUsers) => {
            return true;
        },
        registerToTracking: (ownProps, trackedUsers, event) => {

            if (trackedUsers) {
                return trackedUsers;
            }

            const { currentUser, users } = ownProps;
            const trackingUsers = users.filter(o => o.id !== currentUser.id);
            return trackingUsers;
        },
        mapToProps: (users) => {
            return {
                users: users
            };
        }
    });

    return classDecoratorFactory<P>(container);
};