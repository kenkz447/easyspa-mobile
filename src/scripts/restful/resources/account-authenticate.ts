import { Resource, ResourceType } from 'react-restful';

import { apiEntry } from '@/restful/environments';

export interface AccountAuthenticate {
    readonly id_token: string;
}

export const accountResourceType = new ResourceType<AccountAuthenticate>({
    name: 'Account',
    schema: [{
        field: nameof<AccountAuthenticate>(o => o.id_token),
        type: 'PK'
    }]
});

export const accountAuthenticateResources = {
    authenticate: new Resource({
        resourceType: accountResourceType,
        url: apiEntry('/api/authenticate'),
        method: 'POST'
    })
};