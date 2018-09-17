import * as React from 'react';
import styled from 'styled-components';

import { PageLoading } from './PageLoading';

type PageProps = React.DOMAttributes<{}>;

const PageContent = styled.div`
    min-height: inherit;
`;

export class Page extends React.Component<PageProps> {
    componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    render() {
        return (
            <React.Fragment>
                <PageLoading />
                <PageContent id="page" {...this.props} />
            </React.Fragment>
        );
    }
}