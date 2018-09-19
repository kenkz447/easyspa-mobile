import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DefaultLayout } from '@/layout';
import {
    CustomerContainer
} from '@/routes/route-customer/containers/CustomerContainer';

type RouteCustomerProps = AppPageProps;

@readyState()
@withAppContext()
export class RouteCustomer extends AppPage<RouteCustomerProps> {
    render() {
        return (
            <Page>
                <DefaultLayout>
                    <CustomerContainer />
                </DefaultLayout>
            </Page>
        );
    }
}