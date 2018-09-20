import * as React from 'react';
import { ResourceParameter, RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { withAppContext } from '@/app';
import { PrimaryText } from '@/components';
import { DomainContext } from '@/domain';
import { restfulFetcher, restfulStore } from '@/restful';
import {
    ReportBookingCountPayload,
    reportCountResources,
    ReportTransactionCountPayload
} from '@/restful/resources/count-resource';
import { getEndOf, getStartOf } from '@/utilities';

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

export interface HomeBookingContainerProps extends
    Pick<DomainContext, 'currentSpaBranch'> {
}

interface HomeBookingContainerState {
    readonly fetchParams: ResourceParameter[];
}

@withAppContext<DomainContext>('currentSpaBranch')
export class HomeBookingContainer extends React.PureComponent<HomeBookingContainerProps, HomeBookingContainerState> {
    constructor(props: HomeBookingContainerProps) {
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
                resource={reportCountResources.booking}
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
            <HomeBookingContainerWrapper>
                <TotalRevenues>
                    <small>LỊCH HẸN</small><br />
                    <PrimaryText>{revenueTotal || 0}</PrimaryText>
                </TotalRevenues>
            </HomeBookingContainerWrapper>
        );
    }

    private readonly getResouceBodyPayload = (): ReportBookingCountPayload => {
        const { currentSpaBranch } = this.props;
        const date = new Date();
        const fromMoment = getStartOf(date, 'date');
        const toMoment = getEndOf(date, 'date');

        return {
            from: fromMoment.toISOString(),
            to: toMoment.toISOString(),
            statuses: ['CHECKIN', 'CHECKOUT', 'CONFIRMED', 'TEMP'],
            spaBranchId: currentSpaBranch!.id
        };
    }
}
