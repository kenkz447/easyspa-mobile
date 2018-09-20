import * as React from 'react';
import { ResourceParameter, RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { withAppContext } from '@/app';
import { PrimaryText } from '@/components';
import { DomainContext } from '@/domain';
import { restfulFetcher, restfulStore } from '@/restful';
import {
    reportCountResources,
    ReportTransactionCountPayload
} from '@/restful/resources/count-resource';
import { getEndOf, getStartOf } from '@/utilities';

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

export interface HomeInvoiceContainerProps extends
    Pick<DomainContext, 'currentSpaBranch'> {
}

interface HomeInvoiceContainerState {
    readonly fetchParams: ResourceParameter[];
}

@withAppContext<DomainContext>('currentSpaBranch')
export class HomeInvoiceContainer extends React.PureComponent<HomeInvoiceContainerProps, HomeInvoiceContainerState> {
    constructor(props: HomeInvoiceContainerProps) {
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
                resource={reportCountResources.transaction}
                parameters={this.state.fetchParams}
                render={(renderProps) => {
                    const { data } = renderProps;

                    if (!data) {
                        return this.renderUI(null);
                    }
                    return this.renderUI(data.countResult);
                }}
            />
        );
    }

    private readonly renderUI = (revenueTotal: number | null) => {
        return (
            <HomeInvoiceContainerWrapper>
                <TotalRevenues>
                    <small>HÓA ĐƠN</small><br />
                    <PrimaryText>{revenueTotal || 0}</PrimaryText>
                </TotalRevenues>
            </HomeInvoiceContainerWrapper>
        );
    }

    private readonly getResouceBodyPayload = (): ReportTransactionCountPayload => {
        const { currentSpaBranch } = this.props;
        const date = new Date();
        const fromMoment = getStartOf(date, 'date');
        const toMoment = getEndOf(date, 'date');

        return {
            from: fromMoment.toISOString(),
            to: toMoment.toISOString(),
            spaBranchId: currentSpaBranch!.id
        };
    }
}
