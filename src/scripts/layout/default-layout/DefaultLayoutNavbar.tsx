import { NavBar } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { AppContextServices, withAppContext } from '@/app';
import { AntdAffix } from '@/components';
import { DomainContext } from '@/domain';

interface NavbarWrapperProps {
    readonly floated: boolean;
}

const NavbarWrapper: React.ComponentType<NavbarWrapperProps> = styled.div`
    box-shadow: ${(props: NavbarWrapperProps) => {
        if (props.floated) {
            return '0px 1px 5px rgba(0,0,0,0.25)';
        }
        return '';
    }};
`;

export const NavbarTitle = styled.div`
    text-align: center;
    line-height: 1;
`;

type DefaultLayoutNavbarProps =
    Pick<AppContextServices, 'setAppContext'> &
    Pick<DomainContext, 'navbar'>;

interface DefaultLayoutNavbarState {
    readonly navbarFloated: boolean;
}

@withAppContext<DefaultLayoutNavbarProps>('setAppContext', 'navbar')
export class DefaultLayoutNavbar extends React.PureComponent<DefaultLayoutNavbarProps, DefaultLayoutNavbarState> {
    readonly state = {
        navbarFloated: false
    };

    public render() {
        const { navbar, setAppContext } = this.props;

        if (!navbar) {
            return null;
        }

        return (
            <AntdAffix
                onChange={() => this.setState({
                    navbarFloated: !this.state.navbarFloated
                })}
            >
                <NavbarWrapper floated={this.state.navbarFloated}>
                    <NavBar
                        mode="light"
                        leftContent={this.getHamburgerButton()}
                        /* tslint:disable-next-line:no-any */
                        {...navbar as any}
                    >
                        {typeof navbar.children === 'string' ?
                            <NavbarTitle>{navbar.children}</NavbarTitle> :
                            navbar.children
                        }
                    </NavBar>
                </NavbarWrapper>
            </AntdAffix>
        );
    }

    readonly getHamburgerButton = () => {
        const { setAppContext } = this.props;
        return (
            <div
                onClick={() => {
                    setAppContext!<DomainContext>({ drawerVisibled: true });
                }}
            >
                <img src="/static/assets/hamburger.png" />
            </div>
        );
    }
}