import { Fetcher } from 'react-restful';

import { AntdMotification } from '@/components/antd-component';
import { Authenticator } from '@/domain/Auth';

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

        AntdMotification.error({
            message: 'Opps!',
            description: response.statusText
        });

        if (process.env.NODE_ENV !== 'production') {
            const error = await response.text();
            // tslint:disable-next-line:no-console
            console.error(error);
        }
    }
});