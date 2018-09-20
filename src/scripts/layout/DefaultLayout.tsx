import { Flex, WingBlank } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { DefaultLayoutDrawer, DefaultLayoutNavbar } from './default-layout';

const DefaultLayoutWrapper = styled.div`
    height: 100vh;
    background: #F7F7F7;
    .am-navbar {
        height: 55px;
    }
    .my-drawer {
        position: relative;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .am-drawer {
            &-overlay {
                z-index: 11;
            }
            &-sidebar {
                background-color: #1B3758;
                overflow: auto;
                z-index: 12;
                -webkit-overflow-scrolling: touch;
                .am-list {
                    background-color: #1B3758;
                    width: 300px;
                    padding: 0;
                    &-body {
                        background-color: inherit;
                        border-top: 0!important;
                        border-bottom: 0!important;
                    }
                    &-thumb {
                        font-size: 1.5em;
                        line-height: 0.5em;
                    }
                    &-content {
                        color: inherit;
                    }
                    &-line {
                        border-bottom: 0!important;
                    }
                    &-item {
                        background-color: inherit;
                        margin: 10px 15px;
                        color: #63809B;
                    }
                    &-item.active {
                        border-radius: 30px;
                        background-color: #4990E2;
                        color: #fff;
                    }
                }
            }
        }
    }
`;

const DefaultLayoutContent = styled.div`
    height: 100vh;
    margin: 0 auto;
    background: #fff;
    max-width: 414px;
    width: 100%;
`;

const LayoutDrawerContent = styled.div`
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
                    <DefaultLayoutDrawer>
                        <div>
                            <DefaultLayoutNavbar />
                            <LayoutDrawerContent>
                                <WingBlank>
                                    {children}
                                </WingBlank>
                            </LayoutDrawerContent>
                        </div>
                    </DefaultLayoutDrawer>
                </DefaultLayoutContent>
            </DefaultLayoutWrapper>
        );
    }
}