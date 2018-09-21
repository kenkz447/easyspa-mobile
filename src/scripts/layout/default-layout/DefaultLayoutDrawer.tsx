import { Drawer, List } from 'antd-mobile';
import * as React from 'react';

import { AppContextServices, AppCoreContext, withAppContext } from '@/app';
import { DomainContext } from '@/domain';
import { routeBookingsInfo } from '@/routes/route-bookings/RouteBookingsInfo';
import { routeCashierInfo } from '@/routes/route-cashier/RouteCashierInfo';
import { routeCustomersInfo } from '@/routes/route-customer/RouteCustomersInfo';
import { routeHomeInfo } from '@/routes/route-home/RouteHomeInfo';

import { DrawerUserInfo } from './default-layout-drawer';

type DefaultLayoutDrawerProps =
    Pick<AppContextServices, 'setAppContext'> &
    Pick<AppCoreContext, 'history'> &
    Pick<DomainContext, 'drawerVisibled'>;

@withAppContext<DefaultLayoutDrawerProps>(
    'history',
    'drawerVisibled'
)
export class DefaultLayoutDrawer extends React.PureComponent<DefaultLayoutDrawerProps> {
    public render() {
        const { drawerVisibled, setAppContext, children } = this.props;

        return (
            <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight }}
                contentStyle={{ color: '#A6A6A6' }}
                sidebar={this.getSidebar()}
                open={drawerVisibled}
                onOpenChange={() => {
                    setAppContext!<DomainContext>({
                        drawerVisibled: false
                    });
                }}
            >
                {children}
            </Drawer>
        );
    }

    private readonly getSidebar = () => {
        const { history } = this.props;

        const menuItems = [
            routeHomeInfo,
            routeBookingsInfo,
            routeCashierInfo,
            routeCustomersInfo
        ];

        return (
            <React.Fragment>
                <DrawerUserInfo />
                <List>
                    {
                        menuItems.map(o => (
                            <List.Item
                                key={o.path}
                                className={o.isActive() ? 'active' : ''}
                                thumb={o.icon}
                                onClick={() => history!.push(o.path)}
                            >
                                {o.title}
                            </List.Item>
                        ))
                    }

                </List>
            </React.Fragment>
        );
    }
}
