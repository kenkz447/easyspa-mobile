import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withAppContext } from '@/app';
import { DomainContext } from '@/domain';
import { restfulFetcher, restfulStore } from '@/restful';
import { bookingResources } from '@/restful/resources/booking';

import { CustomerBookingItem } from './customer-booking-container';

interface CustomerBookingContainerOwnProps extends Pick<DomainContext, 'currentSpaBranch'> {
    readonly customerId: number;
}

@withAppContext<DomainContext>('currentSpaBranch')
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
                        spaBranchId: this.props.currentSpaBranch!.id,
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