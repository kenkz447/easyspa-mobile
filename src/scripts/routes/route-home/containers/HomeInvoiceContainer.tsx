import * as React from 'react';
import styled from 'styled-components';

import { PrimaryText } from '@/components';

const HomeInvoiceContainerWrapper = styled.div`
    display:block;
`;

const TotalRevenues = styled.h1`
    small {
        font-size: 50%;
        font-weight: normal;
        color: #000;
    }
`;

export interface HomeInvoiceContainerProps {
}

export class HomeInvoiceContainer extends React.PureComponent<HomeInvoiceContainerProps> {
    public render() {
        return (
            <HomeInvoiceContainerWrapper>
                <TotalRevenues>
                    <small>HÓA ĐƠN</small><br />
                    <PrimaryText>32</PrimaryText>
                </TotalRevenues>
            </HomeInvoiceContainerWrapper>
        );
    }
}
