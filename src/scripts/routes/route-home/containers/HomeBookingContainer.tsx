import * as React from 'react';
import styled from 'styled-components';

import { PrimaryText } from '@/components';

const HomeBookingContainerWrapper = styled.div`
    display:block;
`;

const TotalRevenues = styled.h1`
    small {
        font-size: 50%;
        font-weight: normal;
        color: #000;
    }
`;

export interface HomeBookingContainerProps {
}

export class HomeBookingContainer extends React.PureComponent<HomeBookingContainerProps> {
    public render() {
        return (
            <HomeBookingContainerWrapper>
                <TotalRevenues>
                    <small>LỊCH HẸN</small><br />
                    <PrimaryText>15</PrimaryText>
                </TotalRevenues>
            </HomeBookingContainerWrapper>
        );
    }
}
