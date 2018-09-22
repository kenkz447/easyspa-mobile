import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withAppContext } from '@/app';
import { NoContent } from '@/components/domain-components/generic/NoContent';
import { DomainContext } from '@/domain';
import { bookingResources, restfulFetcher, restfulStore } from '@/restful';

import { CustomerBookingComponent } from './customer-booking-container';

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
                        return <NoContent>Chưa có lịch hẹn</NoContent>;
                    }

                    return (
                        <CustomerBookingComponent bookings={data} />
                    );
                }}
            />
        );
    }
}