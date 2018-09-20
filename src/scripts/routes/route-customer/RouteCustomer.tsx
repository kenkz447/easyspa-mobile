import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';
import {
    CustomerContainer
} from '@/routes/route-customer/containers/CustomerContainer';
import { routeCustomerInfo } from '@/routes/route-customer/RouteCustomerInfo';
import { formatDate } from '@/utilities';

type RouteCustomerProps = AppPageProps;

@readyState()
@withAppContext()
export class RouteCustomer extends AppPage<RouteCustomerProps> {
    constructor(props: RouteCustomerProps) {
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
                    <CustomerContainer />
                </DefaultLayout>
            </Page>
        );
    }

    private readonly getNavbarTitle = () => {
        return (
            <div style={{ textAlign: 'center', lineHeight: 1 }}>
                {routeCustomerInfo.title}<br />
            </div>
        );
    }
}