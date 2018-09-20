import { Card, WhiteSpace } from 'antd-mobile';
import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withAppContext } from '@/app';
import { Loading } from '@/components';
import {
    BookingPreviewCard
} from '@/components/domain-components/booking/BookingPreviewCard';
import {
    BookingPrice
} from '@/components/domain-components/booking/BookingPrice';
import { DomainContext } from '@/domain';
import {
    Booking,
    bookingResources,
    restfulFetcher,
    restfulStore
} from '@/restful';

export interface BookingListProps
    extends Pick<DomainContext, 'history'> {
    readonly Bookings: Booking[];
}

@withAppContext<DomainContext>('history')
export class BookingList extends React.PureComponent<BookingListProps> {
    public render() {
        const { Bookings, history } = this.props;
        return (
            <div>
                {Bookings.map(booking => {
                    return (
                        <RestfulRender
                            key={booking.id}
                            store={restfulStore}
                            fetcher={restfulFetcher}
                            resource={bookingResources.getById}
                            parameters={[{
                                type: 'path',
                                parameter: 'id',
                                value: booking.id
                            }]}
                            render={(renderProps) => {
                                const { data, fetching } = renderProps;

                                if (!data || fetching) {
                                    return <Loading />;
                                }
                                const toBookingDetailPath = `/booking/${booking.id}`;
                                return (
                                    <React.Fragment>
                                        <BookingPreviewCard
                                            booking={data}
                                            onClick={() => history!.push(toBookingDetailPath)}
                                        />
                                        <WhiteSpace />
                                    </React.Fragment>
                                );
                            }}
                        />
                    );
                })}
            </div>
        );
    }
}
