import { Flex, Icon, NavBar } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

const DefaultLayoutWrapper = styled.div`
    height: 100vh;
    background: #F7F7F7;
`;

const DefaultLayoutContent = styled.div`
    height: 100vh;
    margin: 0 auto;
    background: #fff;
    max-width: 414px;
    width: 100%;
`;

interface DefaultLayoutProps {
}

export class DefaultLayout extends React.Component<DefaultLayoutProps> {
    render() {
        const { children } = this.props;

        return (
            <DefaultLayoutWrapper>
                <DefaultLayoutContent>
                    <Flex>
                        {children}
                    </Flex>
                </DefaultLayoutContent>
            </DefaultLayoutWrapper>
        );
    }
}