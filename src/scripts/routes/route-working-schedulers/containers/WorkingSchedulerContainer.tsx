import { WhiteSpace } from 'antd-mobile';
import { UnregisterCallback } from 'history';
import * as moment from 'moment';
import * as React from 'react';
import { ResourceParameter, RestfulRender } from 'react-restful';

import { withAppContext } from '@/app';
import { NoContent } from '@/components/domain-components/generic/NoContent';
import { DomainContext } from '@/domain';
import {
    GetStaffWorkingSchedulerPayload,
    restfulFetcher,
    restfulStore,
    staffWorkingSchedulerResources
} from '@/restful';
import { getEndOf, getStartOf, getUrlSearchParam } from '@/utilities';

import {
    WokingSchedulerList,
    WorkingSchedulerHeader
} from './working-scheduler-container';

export interface WorkingSchedulerContainerProps extends
    Pick<DomainContext, 'currentSpaBranch'>,
    Pick<DomainContext, 'history'> {
}

export interface WorkingSchedulerContainerState {
    readonly currentDate: Date;
    readonly fetcherParams: ResourceParameter[];
}

@withAppContext<DomainContext>('history', 'currentSpaBranch')
export class WorkingSchedulerContainer extends React.PureComponent<
WorkingSchedulerContainerProps,
WorkingSchedulerContainerState> {

    _historyUnregisterCallback: UnregisterCallback;

    constructor(props: WorkingSchedulerContainerProps) {
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

    componentWillUnmount() {
        this._historyUnregisterCallback();
    }

    public render() {
        const { currentDate, fetcherParams } = this.state;
        return (
            <React.Fragment>
                <WhiteSpace />
                <WorkingSchedulerHeader date={currentDate} />
                <WhiteSpace size="xl" />
                <RestfulRender
                    store={restfulStore}
                    fetcher={restfulFetcher}
                    resource={staffWorkingSchedulerResources.getBySpaBranch}
                    parameters={fetcherParams}
                    render={(renderProps) => {
                        const { data } = renderProps;
                        if (!data) {
                            return null;
                        }
                        if (!data.content.length) {
                            return <NoContent>Không có lịch làm việc hôm nay!</NoContent>;
                        }

                        return <WokingSchedulerList workingSchedulers={data.content} />;
                    }}
                />
            </React.Fragment>
        );
    }

    private readonly getResourceParams = (date: Date): ResourceParameter[] => {
        const { currentSpaBranch } = this.props;
        return [{
            type: 'path',
            parameter: 'spaBranchId',
            value: currentSpaBranch!.id
        }, {
            type: 'body',
            value: this.getResouceBodyPayload(date)
        }];
    }

    private readonly getResouceBodyPayload = (date: Date): GetStaffWorkingSchedulerPayload => {
        const fromMoment = getStartOf(date, 'date');
        const toMoment = getEndOf(date, 'date');

        return {
            fromTime: fromMoment.toISOString(),
            toTime: toMoment.toISOString()
        };
    }
}
