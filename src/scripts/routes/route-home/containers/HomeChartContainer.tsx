import { Axis, Chart, Geom, Tooltip } from 'bizcharts';
import * as React from 'react';
import { ResourceParameter, RestfulRender } from 'react-restful';

import {
    ReportRevenuePayPayload,
    reportRevenuseResources,
    restfulFetcher,
    restfulStore,
    RevenueDTO
} from '@/restful';
import { formatCurrency } from '@/utilities';
import { getEndOf, getStartOf } from '@/utilities/moment';

interface HomeRevenuesContainerState {
    readonly fetchParams: ResourceParameter[];
}

export class HomeChartContainer extends React.PureComponent<{}, HomeRevenuesContainerState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            fetchParams: [{
                type: 'body',
                value: this.getResouceBodyPayload()
            }]
        };
    }

    render() {
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

                    return this.renderUI(total.revenueDTOS);
                }}
            />
        );
    }

    private readonly renderUI = (revenues: ReadonlyArray<RevenueDTO> | null) => {
        if (!revenues) {
            return null;
        }

        return (
            <Chart
                height={250}
                padding={[30, 0, 30, 70]}
                data={revenues}
                forceFit={true}
            >
                <Axis
                    name="time"
                    label={{
                        formatter: val => val.slice(0, -5)
                    }}
                />
                <Axis
                    name="revenueTotal"
                    label={{
                        formatter: val => formatCurrency(+val)
                    }}
                />
                <Tooltip
                    crosshairs={{
                        type: 'y'
                    }}
                />
                <Geom
                    type="interval"
                    position="time*revenueTotal"
                    tooltip={['revenueTotal', (revenueTotal) => {
                        return ({
                            name: 'Doanh thu',
                            value: formatCurrency(revenueTotal)
                        });
                    }]
                    }
                />
            </Chart>
        );
    }

    private readonly getResouceBodyPayload = (): ReportRevenuePayPayload => {
        const date = new Date();
        const fromMoment = getStartOf(date, 'week');
        const toMoment = getEndOf(date, 'week');

        return {
            from: fromMoment.toISOString(),
            to: toMoment.toISOString(),
            paymentMethods: null,
            spaBranchId: null
        };
    }
}