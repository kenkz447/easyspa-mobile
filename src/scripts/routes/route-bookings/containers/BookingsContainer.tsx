import { WhiteSpace } from 'antd-mobile';
import { UnregisterCallback } from 'history';
import * as React from 'react';
import { ResourceParameter, RestfulRender } from 'react-restful';

import { withAppContext } from '@/app';
import { Loading } from '@/components';
import { NoContent } from '@/components/domain-components/generic/NoContent';
import { DomainContext } from '@/domain';
import { AppointmentStatus, restfulFetcher, restfulStore } from '@/restful';
import {
    Booking,
    bookingResources,
    GetBookingBySpaBranchPayload
} from '@/restful/resources/booking';
import { getEndOf, getStartOf, getUrlSearchParam } from '@/utilities';

import { BookingList, BookingListHeader } from './bookings-container';

type BookingsContainerProps =
    Pick<DomainContext, 'currentSpaBranch'> &
    Pick<DomainContext, 'history'>;

interface BookingsContainerState {
    readonly currentSearchAppointmentStatus: Booking['appointmentStatus'];
}

@withAppContext<DomainContext>('history', 'currentSpaBranch')
export class BookingsContainer extends React.PureComponent<BookingsContainerProps, BookingsContainerState> {
    _unregisterCallback: UnregisterCallback;

    constructor(props: BookingsContainerProps) {
        super(props);
        const { history } = this.props;

        this.state = {
            currentSearchAppointmentStatus: this.getCurrentStatusSearch()
        };

        this._unregisterCallback = history!.listen(o => {
            this.setState({
                currentSearchAppointmentStatus: this.getCurrentStatusSearch()
            });
        });
    }

    componentWillUnmount() {
        this._unregisterCallback();
    }

    public render() {
        return (
            <React.Fragment>
                <BookingListHeader currentSearchStatus={this.state.currentSearchAppointmentStatus} />
                <WhiteSpace size="lg" />
                <RestfulRender
                    store={restfulStore} 
                    fetcher={restfulFetcher}
                    resource={bookingResources.getBySpaBranch}
                    parameters={this.getResourceParams()}
                    render={(renderProps) => {
                        const { data, fetching } = renderProps;

                        if (fetching) {
                            return <Loading />;
                        }

                        if (!data || !data.length) {
                            return <NoContent>không có lịch hẹn nào!</NoContent>;
                        }

                        return (<BookingList Bookings={data} />);
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
            to: toMoment.toISOString(),
            statuses: [this.state.currentSearchAppointmentStatus]
        };
    } 

    private readonly getCurrentStatusSearch = () => {
        const result = getUrlSearchParam(nameof<Booking>(o => o.appointmentStatus)) as AppointmentStatus;
        return result || 'CONFIRMED';
    }
}