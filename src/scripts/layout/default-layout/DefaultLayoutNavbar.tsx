import { NavBar } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { withAppContext } from '@/app';
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

type DefaultLayoutNavbarProps = Pick<DomainContext, 'navbar'>;

interface DefaultLayoutNavbarState {
    readonly navbarFloated: boolean;
}

@withAppContext<DefaultLayoutNavbarProps>('navbar')
export class DefaultLayoutNavbar extends React.PureComponent<DefaultLayoutNavbarProps, DefaultLayoutNavbarState> {
    readonly state = {
        navbarFloated: false
    };

    public render() {
        const { navbar } = this.props;

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
                    {/* tslint:disable-next-line:no-any */}
                    <NavBar {...navbar as any} />
                </NavbarWrapper>
            </AntdAffix>
        );
    }
}