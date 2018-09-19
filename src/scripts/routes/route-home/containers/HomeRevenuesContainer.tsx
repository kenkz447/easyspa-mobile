import * as React from 'react';
import { ResourceParameter, RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { PrimaryText } from '@/components';
import {
    ReportRevenuePayPayload,
    reportRevenuseResources,
    restfulFetcher,
    restfulStore
} from '@/restful';
import { formatCurrency } from '@/utilities';
import { getEndOf, getStartOf } from '@/utilities/moment';

const HomeRevenuesContainerWrapper = styled.div`
    display:block;
`;

const TotalRevenues = styled.h1`
    small {
        font-size: 50%;
        font-weight: normal;
        color: #000;
    }
`;

interface HomeRevenuesContainerProps {

}

interface HomeRevenuesContainerState {
    readonly fetchParams: ResourceParameter[];
}

export class HomeRevenuesContainer extends React.PureComponent<HomeRevenuesContainerProps, HomeRevenuesContainerState> {
    constructor(props: HomeRevenuesContainerProps) {
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
                resource={reportRevenuseResources.getRevenueByPaymentMethod}
                parameters={this.state.fetchParams}
                render={(renderProps) => {
                    const { data } = renderProps;
                    const total = data && data.find(o => o.paymentMethod === 'ALL');

                    if (!data || !total) {
                        return this.renderUI(null);
                    }
                    const { revenueTotal } = total.revenueDTOS[0];
                    return this.renderUI(revenueTotal);
                }}
            />
        );
    }

    private readonly renderUI = (total) => {
        return (
            <HomeRevenuesContainerWrapper>
                <TotalRevenues>
                    <small>TỔNG DOANH THU TRONG NGÀY</small><br />
                    <PrimaryText>{formatCurrency(total)} đ</PrimaryText>
                </TotalRevenues>
            </HomeRevenuesContainerWrapper>
        );
    }

    private readonly getResouceBodyPayload = (): ReportRevenuePayPayload => {
        const date = new Date();
        const fromMoment = getStartOf(date, 'date');
        const toMoment = getEndOf(date, 'date');

        return {
            from: fromMoment.toISOString(),
            to: toMoment.toISOString(),
            paymentMethods: null,
            spaBranchId: null
        };
    }
}
