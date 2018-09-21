import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

import { routeBookingDetailInfo } from './RouteBookingDetailInfo';

export const RouteBookingDetailLoadable = Loadable({
    loader: () => import('./RouteBookingDetail').then(o => o.RouteBookingDetail),
    loading: () => <Loading />
});

RouteBookingDetailLoadable.defaultProps = {
    routeProps: {
        path: routeBookingDetailInfo.path, 
        exact: true
    }
}; 