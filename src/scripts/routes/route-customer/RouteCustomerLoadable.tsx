import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

export const RouteCustomerLoadable = Loadable({
    loader: () => import('./RouteCustomer').then(o => o.RouteCustomer),
    loading: () => <Loading />
});

RouteCustomerLoadable.defaultProps = {
    routeProps: {
        path: '/customer',
        exact: true
     }
};