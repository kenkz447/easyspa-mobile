import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';
import { formatDate } from '@/utilities';

import { WorkingSchedulerContainer } from './containers';
import { routeWorkingSchedulerInfo } from './RouteWorkingSchedulerInfo';

type RouteWorkingSchedulerProps = AppPageProps;

@readyState()
@withAppContext()
export class RouteWorkingScheduler extends AppPage<RouteWorkingSchedulerProps> {
    constructor(props: RouteWorkingSchedulerProps) {
        super(props);
        const { setAppContext } = this.props;

        setAppContext<DomainContext>({
            navbar: {
                children: routeWorkingSchedulerInfo.title
            }
        });
    }

    render() {
        return (
            <Page>
                <DefaultLayout>
                    <WorkingSchedulerContainer />
                </DefaultLayout>
            </Page >
        );
    }
}
