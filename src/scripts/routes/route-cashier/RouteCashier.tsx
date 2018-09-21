import { WhiteSpace, WingBlank } from 'antd-mobile';
import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';

import { CashierBookingsContainer } from './containers';
import { routeCashierInfo } from './RouteCashierInfo';

type RouteCashierProps = AppPageProps;

@readyState()
@withAppContext()
export class RouteCashier extends AppPage<RouteCashierProps> {
    constructor(props: RouteCashierProps) {
        super(props);
        const { setAppContext } = this.props;

        setAppContext<DomainContext>({
            navbar: {
                children: routeCashierInfo.title
            }
        });
    }

    render() {
        return (
            <Page>
                <DefaultLayout>
                    <CashierBookingsContainer />
                </DefaultLayout>
            </Page >
        );
    }
}