import { Flex } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

const BlankLayoutWrapper = styled.div`
    height: 100vh;
    background: #F7F7F7;
`;

const BlankLayoutContent = styled.div`
    height: 100vh;
    margin: 0 auto;
    background: #fff;
    max-width: 414px;
    width: 100%;
`;

interface BlankLayoutProps {
}

export class BlankLayout extends React.Component<BlankLayoutProps> {
    render() {
        const { children } = this.props;

        return (
            <BlankLayoutWrapper>
                <BlankLayoutContent>
                    <Flex>
                        {children}
                    </Flex>
                </BlankLayoutContent>
            </BlankLayoutWrapper>
        );
    }
}