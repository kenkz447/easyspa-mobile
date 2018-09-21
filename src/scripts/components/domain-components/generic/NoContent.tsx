import * as React from 'react';
import styled from 'styled-components';

const NoContentWrapper = styled.div`
    margin: 30px 0;
    text-align: center;
`;

interface NoContentProps {
    // tslint:disable-next-line:no-any
    readonly children: any;
}

export function NoContent(props: NoContentProps) {
    return (
        <NoContentWrapper {...props} />
    );
}