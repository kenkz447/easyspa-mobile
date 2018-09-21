import { Card, WhiteSpace } from 'antd-mobile';
import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withAppContext } from '@/app';
import { BookingPreviewCard, Loading } from '@/components';
import { DomainContext } from '@/domain';
import {
    Booking,
    bookingResources,
    restfulFetcher,
    restfulStore
} from '@/restful';
import { getBookingDetailUrl } from '@/routes/route-booking-detail';

export interface CashierBookingListProps
    extends Pick<DomainContext, 'history'> {
    readonly Bookings: Booking[];
}

@withAppContext<DomainContext>('history')
export class CashierBookingList extends React.PureComponent<CashierBookingListProps> {
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

                                const toBookingDetailPath = getBookingDetailUrl({
                                    bookingId: booking.id
                                });

                                return (
                                    <React.Fragment>
                                        <BookingPreviewCard
                                            booking={data}
                                            onClick={() => history!.push(toBookingDetailPath)}
                                            showInvoiceCode={true}
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