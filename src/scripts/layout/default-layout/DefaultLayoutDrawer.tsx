import { Drawer, List } from 'antd-mobile';
import * as React from 'react';

import { AppContextServices, withAppContext } from '@/app';
import { DomainContext } from '@/domain';
import { getRouteHomeInfo } from '@/routes/route-home/RouteHomeInfo';

import { DrawerUserInfo } from './default-layout-drawer';

type DefaultLayoutDrawerProps =
    Pick<AppContextServices, 'setAppContext'> &
    Pick<DomainContext, 'drawerVisibled'>;

@withAppContext<DefaultLayoutDrawerProps>('drawerVisibled')
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
                onOpenChange={() =>
                    setAppContext!<DomainContext>({
                        drawerVisibled: false
                    })
                }
            >
                {children}
            </Drawer>
        );
    }

    private readonly getSidebar = () => {
        const items = [getRouteHomeInfo()];

        return (
            <React.Fragment>
                <DrawerUserInfo />
                <List>
                    {
                        items.map(o => (
                            <List.Item
                                key={o.path}
                                className={o.active ? 'active' : ''}
                                thumb={o.icon}
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
