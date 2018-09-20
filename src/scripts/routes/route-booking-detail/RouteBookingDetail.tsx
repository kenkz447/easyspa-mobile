import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';

import { BookingDetailContainer } from './containers';
import {
    BookingDetailParams,
    routeBookingDetailInfo
} from './RouteBookingDetailInfo';

type RouteBookingDetailProps = AppPageProps<BookingDetailParams>;

@readyState()
@withAppContext()
export class RouteBookingDetail extends AppPage<RouteBookingDetailProps> {
    constructor(props: RouteBookingDetailProps) {
        super(props);
        const { setAppContext } = this.props;

        setAppContext<DomainContext>({
            navbar: {
                children: routeBookingDetailInfo.title,
                action: 'back'
            }
        });
    }

    render() {
        const { match } = this.props;
        return (
            <Page>
                <DefaultLayout>
                    <BookingDetailContainer
                        bookingId={match.params.bookingId as string}
                    />
                </DefaultLayout>
            </Page >
        );
    }
}