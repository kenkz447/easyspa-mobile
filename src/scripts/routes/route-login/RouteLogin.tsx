import * as React from 'react';

import { AppPage, AppPageProps, withAppContext } from '@/app';
import { Page } from '@/components';
import { DefaultLayout } from '@/layout';

import { LoginPageContainer } from './containers';

type RouteLoginProps = AppPageProps;

@withAppContext()
export class RouteLogin extends AppPage<RouteLoginProps> {
    render() {
        return (
            <Page>
                <DefaultLayout>
                    <LoginPageContainer />
                </DefaultLayout>
            </Page>
        );
    }
}