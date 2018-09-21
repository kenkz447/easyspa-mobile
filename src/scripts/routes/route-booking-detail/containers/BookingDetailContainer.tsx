import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { withAppContext } from '@/app';
import { Loading } from '@/components';
import { DomainContext } from '@/domain';
import {
    Booking,
    bookingResources,
    restfulFetcher,
    restfulStore
} from '@/restful';

import { BookingDetailPage } from './booking-detail-container';

export interface BookingDetailContainerProps
    extends Pick<DomainContext, 'history'> {
    readonly bookingId: string;
}

@withAppContext<DomainContext>('history')
export class BookingDetailContainer extends React.PureComponent<BookingDetailContainerProps> {
    public render() {
        const { bookingId } = this.props;
        return (
            <div>
                <RestfulRender
                    store={restfulStore}
                    fetcher={restfulFetcher}
                    resource={bookingResources.getById}
                    parameters={[{
                        type: 'path',
                        parameter: 'id',
                        value: bookingId
                    }]}
                    render={(renderProps) => {
                        const { data, fetching } = renderProps;

                        if (!data || fetching) {
                            return <Loading />;
                        }
                        return (
                            <BookingDetailPage booking={data} />
                        );
                    }}
                />
            </div>
        );
    }
}
