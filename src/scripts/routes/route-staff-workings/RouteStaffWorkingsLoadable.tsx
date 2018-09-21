import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Loading } from '@/components';

import { routeWorkingSchedulerInfo } from './RouteStaffWorkingsInfo';

export const RouteStaffWorkingsLoadable = Loadable({
    loader: () => import('./RouteStaffWorkings').then(o => o.RouteStaffWorkings),
    loading: () => <Loading />
});

RouteStaffWorkingsLoadable.defaultProps = {
    routeProps: {
        path: routeWorkingSchedulerInfo.path,
        exact: true
    }
};