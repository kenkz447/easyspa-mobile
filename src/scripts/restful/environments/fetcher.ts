// tslint:disable:no-console
import { Fetcher } from 'react-restful';

import { AntdNotification } from '@/components/antd-component';
import { Authenticator } from '@/domain/Authenticator';

import { restfulStore } from './store';

export const restfulFetcher = new Fetcher({
    store: restfulStore,
    beforeFetch: (url: string, requestInit: RequestInit) => {
        const token = Authenticator.instance.getToken();

        if (token && requestInit.headers instanceof Headers) {
            requestInit.headers.append('Authorization', `Bearer ${token}`);
        }
        return requestInit;
    },
    afterFetch: async (response) => {
        if (response.ok) {
            return;
        }

        const error = await response.text();
        console.error(error);

        if (process.env.NODE_ENV !== 'production') {
            AntdNotification.error({
                message: `Opps! ${response.statusText}`,
                description: error
            });
        }
    }
});