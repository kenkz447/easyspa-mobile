import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

import { routeWorkingSchedulerInfo } from './RouteWorkingSchedulerInfo';

export const RouteWorkingSchedulerLoadable = Loadable({
    loader: () => import('./RouteWorkingScheduler').then(o => o.RouteWorkingScheduler),
    loading: () => <Loading />
});

RouteWorkingSchedulerLoadable.defaultProps = {
    routeProps: {
        path: routeWorkingSchedulerInfo.path,
        exact: true
    }
};