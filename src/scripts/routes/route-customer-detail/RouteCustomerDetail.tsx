import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DefaultLayout } from '@/layout';

import { CustomerDetailContainer } from './containers/CustomerDetailContainer';
import { CustomerPathParams } from './RouteCustomerDetailInfo';

type RouteCustomerProps = AppPageProps<CustomerPathParams>;

@readyState()
@withAppContext()
export class RouteCustomerDetail extends AppPage<RouteCustomerProps> {
    render() {
        const { match } = this.props;
        const customerId = match.params.customerId;

        return (
            <Page>
                <DefaultLayout>
                    <CustomerDetailContainer customerId={customerId as string}/>
                </DefaultLayout>
            </Page>
        );
    }
}