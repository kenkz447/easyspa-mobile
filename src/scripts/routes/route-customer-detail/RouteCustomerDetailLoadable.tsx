import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

import { routeCustomerDetailInfo } from './RouteCustomerDetailInfo';

export const RouteCustomerDetailLoadable = Loadable({
    loader: () => import('./RouteCustomerDetail').then(o => o.RouteCustomerDetail),
    loading: () => <Loading />
});

RouteCustomerDetailLoadable.defaultProps = {
    routeProps: {
        path: routeCustomerDetailInfo.path,
        exact: true
     }
};