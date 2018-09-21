import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

import { routeCashierInfo } from './RouteCashierInfo';

export const RouteCashierLoadable = Loadable({
    loader: () => import('./RouteCashier').then(o => o.RouteCashier),
    loading: () => <Loading />
});

RouteCashierLoadable.defaultProps = {
    routeProps: {
        path: routeCashierInfo.path,
        exact: true
    }
};