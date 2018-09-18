import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

export const RouteHomeLoadable = Loadable({
    loader: () => import('./RouteHome').then(o => o.RouteHome),
    loading: () => <Loading />
});

RouteHomeLoadable.defaultProps = {
    routeProps: {
        path: '/',
        exact: true
     }
};