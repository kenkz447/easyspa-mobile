import * as React from 'react';
import styled from 'styled-components';

import { AntdLayout } from '@/components';

const Breadcrumb = styled.div`
    margin: 20px 0;
`;

interface DefaultLayoutProps {
    readonly breadcrumb: JSX.Element;
}

export class DefaultLayout extends React.Component<DefaultLayoutProps> {
    static readonly defaultProps: Partial<DefaultLayoutProps> = {
        breadcrumb: null
    };

    render() {
        const { breadcrumb, children } = this.props;

        return (
            <AntdLayout style={{ minHeight: 'inherit', background: '#F7F7F7 ' }}>
                <Breadcrumb>
                    {breadcrumb}
                </Breadcrumb>
                {children}
            </AntdLayout>
        );
    }
}