import * as React from 'react';

import { AppPage, AppPageProps, withAppContext } from '@/app';
import { Page } from '@/components';
import { DefaultLayout } from '@/layout';
import { BlankLayout } from '@/layout/BlankLayout';

import { LoginPageContainer } from './containers';

type RouteLoginProps = AppPageProps;

@withAppContext()
export class RouteLogin extends AppPage<RouteLoginProps> {
    render() {
        return (
            <Page>
                <BlankLayout>
                    <LoginPageContainer />
                </BlankLayout>
            </Page>
        );
    }
}