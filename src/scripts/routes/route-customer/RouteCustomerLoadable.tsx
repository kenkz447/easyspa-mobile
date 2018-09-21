import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';
import { routeCustomerInfo } from '@/routes/route-customer/RouteCustomerInfo';

export const RouteCustomerLoadable = Loadable({
    loader: () => import('./RouteCustomer').then(o => o.RouteCustomer),
    loading: () => <Loading />
});

RouteCustomerLoadable.defaultProps = {
    routeProps: {
        path: routeCustomerInfo.path,
        exact: true
     }
};