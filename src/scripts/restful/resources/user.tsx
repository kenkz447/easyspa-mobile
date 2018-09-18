import {
    classDecoratorFactory,
    RecordType,
    Resource,
    ResourceType,
    restfulDataContainer
} from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environments';

export interface User extends RecordType {
    readonly id: string;
    readonly name: string;
    readonly email: string;
}

export const userResourceType = new ResourceType<User>({
    store: restfulStore,
    name: 'user',
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export interface UserAuthResponse {
    readonly user: User;
    readonly jwt: string;
}

export const userResources = {
    auth: new Resource<UserAuthResponse>({
        resourceType: userResourceType,
        url: apiEntry('/auth/local'),
        method: 'POST',
        mapDataToStore: (data, resourceType, store) => {
            store.dataMapping(resourceType, data.user);
        }
    }),
    me: new Resource<User>({
        resourceType: userResourceType,
        url: apiEntry('/accountservice/api/account'),
        method: 'GET',
        mapDataToStore: (data, resourceType, store) => {
            store.dataMapping(resourceType, data);
        }
    })
};

export interface WithCurrentUserProps {
    readonly user: User;
}

export function withUsers<P extends WithCurrentUserProps>() {
    const container = restfulDataContainer<User, WithCurrentUserProps, P>({
        resourceType: userResourceType,
        store: restfulStore,
        registerToTracking: (ownProps) => {
            return [ownProps.user];
        },
        mapToProps: (users) => {
            return {
                user: users[0]
            };
        }
    });

    return classDecoratorFactory<P>(container);
}