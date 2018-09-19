import * as React from 'react';
import { ResourceParameter, RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { PrimaryText } from '@/components';
import { restfulFetcher, restfulStore } from '@/restful';
import {
    ReportCustomerCountPayload,
    reportCustomerResources
} from '@/restful/resources/report-customer-count';
import { getEndOf, getStartOf } from '@/utilities/moment';

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

interface HomeCustomerContainerProps {

}

interface HomeRevenuesContainerState {
    readonly fetchParams: ResourceParameter[];
}

export class HomeCustomerContainer extends React.PureComponent<HomeCustomerContainerProps, HomeRevenuesContainerState> {
    constructor(props: HomeCustomerContainerProps) {
        super(props);
        this.state = {
            fetchParams: [{
                type: 'body',
                value: this.getResouceBodyPayload()
            }]
        };
    }

    public render() {
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                resource={reportCustomerResources.countCustomer}
                parameters={this.state.fetchParams}
                render={(renderProps) => {
                    const { data } = renderProps;
                    const total = data && data.find(o => o.revenueCustomerType === 'ALL');

                    if (!data || !total) {
                        return this.renderUI(0);
                    }
                    const { quantity } = total.countByCustomerDTOS[0];
                    return this.renderUI(quantity); 
                }}
            />
        );
    }

    private readonly renderUI = (total: number) => {
        return (
            <HomeBookingContainerWrapper>
                <TotalRevenues>
                    <small>KHÁCH HÀNG</small><br />
                    <PrimaryText>{total}</PrimaryText>
                </TotalRevenues>
            </HomeBookingContainerWrapper>
        );
    }

    private readonly getResouceBodyPayload = (): ReportCustomerCountPayload => {
        const date = new Date();
        const fromMoment = getStartOf(date, 'date');
        const toMoment = getEndOf(date, 'date');

        return {
            from: fromMoment.toISOString(),
            to: toMoment.toISOString(),
            objectTypeDTOS: null,
            spaBranchId: null
        };
    }
}
