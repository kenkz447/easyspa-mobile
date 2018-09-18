import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DefaultLayout } from '@/layout';

type RouteHomeProps = AppPageProps;

@readyState()
@withAppContext()
export class RouteHome extends AppPage<RouteHomeProps> {
    render() {
        return (
            <Page>
                <DefaultLayout>
                    Wellcome!
                </DefaultLayout>
            </Page>
        );
    }
}