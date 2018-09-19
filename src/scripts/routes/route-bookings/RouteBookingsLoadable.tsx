import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

import { routeBookingsInfo } from './RouteBookingsInfo';

export const RouteBookingsLoadable = Loadable({
    loader: () => import('./RouteBookings').then(o => o.RouteBookings),
    loading: () => <Loading />
});

RouteBookingsLoadable.defaultProps = {
    routeProps: {
        path: routeBookingsInfo.path,
        exact: true
    }
};