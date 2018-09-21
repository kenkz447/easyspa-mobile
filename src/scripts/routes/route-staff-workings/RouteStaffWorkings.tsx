import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';

import { StaffDetailContainer, StaffWorkingsContainer } from './containers';
import {
    routeWorkingSchedulerInfo,
    StaffWorkingsParams
} from './RouteStaffWorkingsInfo';

type RouteStaffWorkingsProps = AppPageProps<StaffWorkingsParams>;

@readyState()
@withAppContext()
export class RouteStaffWorkings extends AppPage<RouteStaffWorkingsProps> {
    constructor(props: RouteStaffWorkingsProps) {
        super(props);
        const { setAppContext } = this.props;

        setAppContext<DomainContext>({
            navbar: {
                children: routeWorkingSchedulerInfo.title,
                action: 'back'
            }
        });
    }

    render() {
        const { match } = this.props;
        const staffId = +match.params.staffId;
        return (
            <Page>
                <DefaultLayout>
                    <StaffDetailContainer staffId={staffId} />
                    < StaffWorkingsContainer staffId={staffId} />
                </DefaultLayout>
            </Page >
        );
    }
}
