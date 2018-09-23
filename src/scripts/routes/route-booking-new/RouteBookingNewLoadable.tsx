import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

import { routeBookingNewInfo } from './RouteBookingNewInfo';

export const RouteBookingNewLoadable = Loadable({
    loader: () => import('./RouteBookingNew').then(o => o.RouteBookingNew),
    loading: () => <Loading />
});

RouteBookingNewLoadable.defaultProps = {
    routeProps: {
        path: routeBookingNewInfo.path,
        exact: true
    }
};