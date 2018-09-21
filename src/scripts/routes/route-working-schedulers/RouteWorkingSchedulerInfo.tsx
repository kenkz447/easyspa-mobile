// tslint:disable:max-line-length
import * as React from 'react';

import { RouteInfo } from '@/app';

const workingSchedulerIcon = (
<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em"><path d="M408 64H104c-22.091 0-40 17.908-40 40v304c0 22.092 17.909 40 40 40h304c22.092 0 40-17.908 40-40V104c0-22.092-17.908-40-40-40zM304 368H144v-48h160v48zm64-88H144v-48h224v48zm0-88H144v-48h224v48z"/></svg>
);

export const routeWorkingSchedulerInfo: RouteInfo = {
    path: '/working-scheduler',
    title: 'Lịch làm việc',
    icon: workingSchedulerIcon,
    isActive: () => {
        const currentPath = window.location.pathname;
        return currentPath === routeWorkingSchedulerInfo.path;
    }
};
