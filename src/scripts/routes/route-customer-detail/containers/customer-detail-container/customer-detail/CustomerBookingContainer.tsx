import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { restfulFetcher, restfulStore } from '@/restful';
import { bookingResources } from '@/restful/resources/booking';

import { CustomerBookingItem } from './customer-booking-container';

interface CustomerBookingContainerOwnProps {
    readonly customerId: number;
}

export class CustomerBookingContainer extends React.PureComponent<CustomerBookingContainerOwnProps> {
    render() {
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                resource={bookingResources.getBookingByCustomerAndRangeTime}
                parameters={[{
                    type: 'body',
                    value: {
                        customerId: this.props.customerId,
                        spaBranchId: 1,
                        from: '2017-12-31T17:00:00.000Z',
                        to: '2018-12-31T16:59:59.999Z'
                    }
                }]}
                render={(renderProps) => {
                    const { data } = renderProps;

                    if (!data) {
                        return null;
                    }

                    if (data.length === 0) {
                        return <div>Chưa có lịch hẹn</div>;
                    }

                    return (
                        <CustomerBookingItem bookings={data} />
                    );
                }}
            />
        );
    }
}