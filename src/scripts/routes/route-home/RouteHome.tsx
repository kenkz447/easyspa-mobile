import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';

import { UserContainer } from './containers';

type RouteHomeProps = AppPageProps;

@readyState()
@withAppContext()
export class RouteHome extends AppPage<RouteHomeProps> {
    render() {
        return (
            <Page>
                <DefaultLayout>
                    <UserContainer />
                </DefaultLayout>
            </Page>
        );
    }
}