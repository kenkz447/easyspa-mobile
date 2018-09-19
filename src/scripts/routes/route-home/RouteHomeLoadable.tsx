import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

import { routeHomeInfo } from './RouteHomeInfo';

export const RouteHomeLoadable = Loadable({
    loader: () => import('./RouteHome').then(o => o.RouteHome),
    loading: () => <Loading />
});

RouteHomeLoadable.defaultProps = {
    routeProps: {
        path: routeHomeInfo.path,
        exact: true
    }
};