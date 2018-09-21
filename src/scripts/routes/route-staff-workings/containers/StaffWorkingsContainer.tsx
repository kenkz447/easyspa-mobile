import { UnregisterCallback } from 'history';
import * as moment from 'moment';
import * as React from 'react';
import { ResourceParameter, RestfulRender } from 'react-restful';

import { withAppContext } from '@/app';
import { DomainContext } from '@/domain';
import {
    GetStaffWorkingSchedulerPayload,
    restfulFetcher,
    restfulStore,
    staffWorkingSchedulerResources
} from '@/restful';
import { getEndOf, getStartOf, getUrlSearchParam } from '@/utilities';

import { StaffWokingGrid } from './staff-working-container';

export interface StaffWorkingsContainerProps extends
    Pick<DomainContext, 'history'> {
    readonly staffId: number;
}

export interface WorkingSchedulerContainerState {
    readonly currentDate: Date;
    readonly fetcherParams: ResourceParameter[];
}

@withAppContext<DomainContext>('history')
export class StaffWorkingsContainer extends React.PureComponent<
StaffWorkingsContainerProps,
WorkingSchedulerContainerState> {
    _historyUnregisterCallback: UnregisterCallback;

    constructor(props: StaffWorkingsContainerProps) {
        super(props);
        const { history } = props;
        const currentDate = new Date();
        this.state = {
            fetcherParams: this.getResourceParams(currentDate),
            currentDate: currentDate
        };

        this._historyUnregisterCallback = history!.listen(() => {
            const currentDateSearch = getUrlSearchParam('date');
            const nextDateMoment = currentDateSearch && moment(currentDateSearch, 'DD/MM/YYYY');
            const nextDate = nextDateMoment && nextDateMoment.toDate();
            this.setState({
                fetcherParams: this.getResourceParams(nextDate || currentDate),
                currentDate: nextDate || this.state.currentDate
            });
        });
    }
    public render() {
        const { fetcherParams, currentDate } = this.state;
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                resource={staffWorkingSchedulerResources.getByStaff}
                parameters={fetcherParams}
                render={(renderProps) => {
                    const { data } = renderProps;
                    if (!data) {
                        return null;
                    }

                    return (
                        <StaffWokingGrid
                            date={currentDate}
                            staffWorkingSchedulers={data.content}
                        />);
                }}
            />
        );
    }

    private readonly getResourceParams = (date: Date): ResourceParameter[] => {
        const { staffId } = this.props;

        return [{
            type: 'path',
            parameter: 'id',
            value: staffId
        }, {
            type: 'body',
            value: this.getResouceBodyPayload(date)
        }];
    }

    private readonly getResouceBodyPayload = (date: Date): GetStaffWorkingSchedulerPayload => {
        const fromMoment = getStartOf(date, 'week');
        const toMoment = getEndOf(date, 'week');

        return {
            fromTime: fromMoment.toISOString(),
            toTime: toMoment.toISOString(),
            workingScheduleStatus: 'NORMAL'
        };
    }
}
