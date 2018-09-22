import { WingBlank } from 'antd-mobile';
import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { NewBookingFormControl } from '@/forms/booking';
import { DefaultLayout } from '@/layout';
import { formatDate } from '@/utilities';

import { routeBookingNewInfo } from './RouteBookingNewInfo';

type RouteBookingNewProps = AppPageProps;

@readyState()
@withAppContext()
export class RouteBookingNew extends AppPage<RouteBookingNewProps> {
    constructor(props: RouteBookingNewProps) {
        super(props);
        const { setAppContext } = this.props;

        setAppContext<DomainContext>({
            navbar: {
                children: routeBookingNewInfo.title,
                action: 'back'
            }
        });
    }

    render() {
        return (
            <Page>
                <DefaultLayout>
                    <NewBookingFormControl/>
                </DefaultLayout>
            </Page >
        );
    }
}
