import { WingBlank } from 'antd-mobile';
import * as React from 'react';

import { AppPage, AppPageProps, readyState, withAppContext } from '@/app';
import { Page } from '@/components';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';

import { routeBookingsInfo } from './RouteBookingsInfo';

type RouteBookingsProps = AppPageProps;

@readyState()
@withAppContext()
export class RouteBookings extends AppPage<RouteBookingsProps> {
    constructor(props: RouteBookingsProps) {
        super(props);
        const { setAppContext } = this.props;

        setAppContext<DomainContext>({
            navbar: {
                mode: 'light',
                children: this.getNavbarTitle(),
                leftContent: (
                    <div
                        onClick={() => {
                            setAppContext<DomainContext>({ drawerVisibled: true });
                        }}
                    >
                        <img src="/static/assets/hamburger.png" />
                    </div>

                )
            }
        });
    }

    render() {
        return (
            <Page>
                <DefaultLayout>
                    <WingBlank>
                        {null}
                    </WingBlank>
                </DefaultLayout>
            </Page >
        );
    }

    private readonly getNavbarTitle = () => {
        return (
            <div style={{ textAlign: 'center', lineHeight: 1 }}>
                {routeBookingsInfo.title}<br />
            </div>
        );
    }
}