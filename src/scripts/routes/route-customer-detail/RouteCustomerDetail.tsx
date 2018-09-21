import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';

import { CustomerDetailContainer } from './containers';
import {
    CustomerPathParams,
    routeCustomerDetailInfo
} from './RouteCustomerDetailInfo';

type RouteCustomerProps = AppPageProps<CustomerPathParams>;

@readyState()
@withAppContext()
export class RouteCustomerDetail extends AppPage<RouteCustomerProps> {
    constructor(props: RouteCustomerProps) {
        super(props);
        const { setAppContext } = this.props;

        setAppContext<DomainContext>({
            navbar: {
                children: routeCustomerDetailInfo.title,
                action: 'back'
            }
        });
    }

    render() {
        const { match } = this.props;
        const customerId = match.params.customerId;

        return (
            <Page>
                <DefaultLayout>
                    <CustomerDetailContainer customerId={customerId as string} />
                </DefaultLayout>
            </Page>
        );
    }
}