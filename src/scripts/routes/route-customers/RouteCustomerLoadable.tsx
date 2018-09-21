import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

import { routeCustomersInfo } from './RouteCustomersInfo';

export const RouteCustomersLoadable = Loadable({
    loader: () => import('./RouteCustomers').then(o => o.RouteCustomers),
    loading: () => <Loading />
});

RouteCustomersLoadable.defaultProps = {
    routeProps: {
        path: routeCustomersInfo.path,
        exact: true
     }
};