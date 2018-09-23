import { WhiteSpace } from 'antd-mobile';
import { UnregisterCallback } from 'history';
import * as React from 'react';
import { ResourceParameter, RestfulRender } from 'react-restful';

import { withAppContext } from '@/app';
import { Loading } from '@/components';
import { NoContent } from '@/components/domain-components/generic/NoContent';
import { DomainContext } from '@/domain';
import { restfulFetcher, restfulStore } from '@/restful';
import {
    bookingResources,
    GetBookingBySpaBranchPayload
} from '@/restful/resources/booking';
import { getEndOf, getStartOf, getUrlSearchParam } from '@/utilities';

import {
    CashierBookingList,
    CashierBookingListHeader
} from './bookings-container';

type CashierBookingsContainerProps =
    Pick<DomainContext, 'currentSpaBranch'> &
    Pick<DomainContext, 'history'>;

interface CashierBookingsContainerState {
    readonly paid: boolean;
}

@withAppContext<DomainContext>('history', 'currentSpaBranch')
export class CashierBookingsContainer extends React.PureComponent<
CashierBookingsContainerProps,
CashierBookingsContainerState> {
    _unregisterCallback: UnregisterCallback;

    constructor(props: CashierBookingsContainerProps) {
        super(props);
        const { history } = this.props;

        this.state = {
            paid: this.getCurrentStatusSearch()
        };

        this._unregisterCallback = history!.listen(() => {
            this.setState({
                paid: this.getCurrentStatusSearch()
            });
        });
    }

    componentWillUnmount() {
        this._unregisterCallback();
    }

    public render() {
        const { paid } = this.state;
        return (
            <React.Fragment>
                <CashierBookingListHeader paid={paid} />
                <WhiteSpace size="lg" />
                <RestfulRender
                    store={restfulStore}
                    fetcher={restfulFetcher}
                    resource={
                        paid ?
                            bookingResources.getPaid :
                            bookingResources.getNotPay
                    }
                    parameters={this.getResourceParams()}
                    render={(renderProps) => {
                        const { data, fetching } = renderProps;

                        if (fetching) {
                            return <Loading />;
                        }

                        if (!data || !data.length) {
                            return <NoContent>không có lịch hẹn nào!</NoContent>;
                        }

                        return (<CashierBookingList Bookings={data} />);
                    }}
                />
            </React.Fragment>
        );
    }

    private readonly getResourceParams = (): ResourceParameter[] => {
        const { currentSpaBranch } = this.props;
        return [{
            type: 'path',
            parameter: 'spaBranchId',
            value: currentSpaBranch!.id
        }, {
            type: 'body',
            value: this.getResouceBodyPayload()
        }];
    }

    private readonly getResouceBodyPayload = (): GetBookingBySpaBranchPayload => {
        const date = new Date();
        const fromMoment = getStartOf(date, 'date');
        const toMoment = getEndOf(date, 'date');

        return {
            from: fromMoment.toISOString(),
            to: toMoment.toISOString()
        };
    }

    private readonly getCurrentStatusSearch = () => {
        const result = getUrlSearchParam('paid');
        return (result === 'true') || false;
    }
}