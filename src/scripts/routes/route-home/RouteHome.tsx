import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import {
    AppContextServices,
    PageProps,
    readyState,
    withAppContext
} from '@/app';
import { Page } from '@/components';
import { DefaultLayout } from '@/layout';

type RouteHomeProps =
    AppContextServices &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withAppContext<RouteHomeProps>()
export class RouteHome extends React.Component<RouteHomeProps> {
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