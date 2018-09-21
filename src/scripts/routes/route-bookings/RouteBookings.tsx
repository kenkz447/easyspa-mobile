import { WhiteSpace, WingBlank } from 'antd-mobile';
import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';
import { BookingsContainer } from '@/routes/route-bookings/containers';

import { routeBookingsInfo } from './RouteBookingsInfo';

type RouteBookingsProps = AppPageProps;

@readyState()
@withAppContext()
export class RouteBookings extends AppPage<RouteBookingsProps> {
    constructor(props: RouteBookingsProps) {
        super(props);
        const { setAppContext } = this.props;

        setAppContext<DomainContext>({
            navbar: {
                children: routeBookingsInfo.title
            }
        });
    }

    render() {
        return (
            <Page>
                <DefaultLayout>
                    <BookingsContainer />
                </DefaultLayout>
            </Page >
        );
    }
}