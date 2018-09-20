import { WingBlank } from 'antd-mobile';
import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';
import { formatDate } from '@/utilities';

import {
    HomeBookingContainer,
    HomeChartContainer,
    HomeCustomerContainer,
    HomeInvoiceContainer,
    HomeRevenuesContainer
} from './containers';
import { routeHomeInfo } from './RouteHomeInfo';

type RouteHomeProps = AppPageProps;

@readyState()
@withAppContext()
export class RouteHome extends AppPage<RouteHomeProps> {
    constructor(props: RouteHomeProps) {
        super(props);
        const { setAppContext } = this.props;

        setAppContext<DomainContext>({
            navbar: {
                children: this.getNavbarTitle()
            }
        });
    }

    render() {
        return (
            <Page>
                <DefaultLayout>
                    <WingBlank>
                        <HomeChartContainer />
                        <HomeRevenuesContainer />
                        <HomeInvoiceContainer />
                        <HomeBookingContainer />
                        <HomeCustomerContainer />
                    </WingBlank>
                </DefaultLayout>
            </Page >
        );
    }

    private readonly getNavbarTitle = () => {
        return (
            <div style={{ textAlign: 'center', lineHeight: 1 }}>
                {routeHomeInfo.title}<br />
                <small>Hôm nay - {formatDate(new Date, 'DD/MM/YYYY')}</small>
            </div>
        );
    }
}