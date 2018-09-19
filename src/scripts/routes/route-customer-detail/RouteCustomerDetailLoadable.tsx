import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

export const RouteCustomerDetailLoadable = Loadable({
    loader: () => import('./RouteCustomerDetail').then(o => o.RouteCustomerDetail),
    loading: () => <Loading />
});

RouteCustomerDetailLoadable.defaultProps = {
    routeProps: {
        path: `/customer/:customerId`,
        exact: true
     }
};