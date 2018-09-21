// tslint:disable:max-line-length
import * as React from 'react';

import { RouteInfo } from '@/app';

const bookingIcon = (
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em">
        <path d="M368.005 272h-96v96h96v-96zm-32-208v32h-160V64h-48v32h-24.01c-22.002 0-40 17.998-40 40v272c0 22.002 17.998 40 40 40h304.01c22.002 0 40-17.998 40-40V136c0-22.002-17.998-40-40-40h-24V64h-48zm72 344h-304.01V196h304.01v212z" />
    </svg>
);

export const routeBookingsInfo: RouteInfo = {
    path: '/bookings',
    title: 'Lịch hẹn',
    icon: bookingIcon,
    isActive: () => {
        const currentPath = window.location.pathname;
        return currentPath === routeBookingsInfo.path;
    }
};