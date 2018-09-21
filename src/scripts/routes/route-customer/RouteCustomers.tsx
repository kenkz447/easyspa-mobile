import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';

import { CustomersContainer } from './containers';
import { routeCustomersInfo } from './RouteCustomersInfo';

type RouteCustomersProps = AppPageProps;

@readyState()
@withAppContext()
export class RouteCustomers extends AppPage<RouteCustomersProps> {
    constructor(props: RouteCustomersProps) {
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
                    <CustomersContainer />
                </DefaultLayout>
            </Page>
        );
    }

    private readonly getNavbarTitle = () => {
        return (
            <div style={{ textAlign: 'center', lineHeight: 1 }}>
                {routeCustomersInfo.title}<br />
            </div>
        );
    }
}