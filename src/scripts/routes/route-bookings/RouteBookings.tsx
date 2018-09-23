import { WhiteSpace, WingBlank } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';
import {
    getRouteBookingNewUrl
} from '@/routes/route-booking-new/RouteBookingNewInfo';
import { BookingsContainer } from '@/routes/route-bookings/containers';

import { routeBookingsInfo } from './RouteBookingsInfo';

type RouteBookingsProps = AppPageProps;

const NewBookingButton = styled.button`
    position: fixed;
    right: 15px;
    bottom: 15px;
    background: #4CD964;
    border: 0;
    height: 50px;
    width: 50px;
    line-height: 50px;
    border-radius: 50%;
    font-size: 50px;
    color: #fff;
    box-shadow: 2px 2px 5px rgba(0,0,0,.25);
`;

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
                    {this.renderNewBookingButton()}
                </DefaultLayout>
            </Page >
        );
    }

    readonly renderNewBookingButton = () => {
        const { history } = this.props;
        const toBookingNewUrl = getRouteBookingNewUrl();
        return (
            <NewBookingButton onClick={(o) => history.push(toBookingNewUrl)}>
                +
            </NewBookingButton>
        );
    }
}