import * as React from 'react';

import { AppPage, AppPageProps, withAppContext } from '@/app';
import { Page } from '@/components';
import { DefaultLayout } from '@/layout';

type RouteLoginProps = AppPageProps;

@withAppContext<RouteLoginProps>()
export class RouteLogin extends AppPage<RouteLoginProps> {
    render() {
        return (
            <Page>
                <DefaultLayout>
                    Login!
                </DefaultLayout>
            </Page>
        );
    }
}