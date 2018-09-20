import { Card, WhiteSpace } from 'antd-mobile';
import * as React from 'react';

import {
    BookingPreviewService
} from '@/components/domain-components/booking/BookingPreviewService';
import { Booking, bookingUtils } from '@/restful';
import { formatDate } from '@/utilities';

import { BookingPrice } from './BookingPrice';
import { BookingStatusTag } from './BookingStatusTag';

export interface BookingPreviewCardProps {
    readonly booking: Booking;
    readonly onClick: () => void;
}

export function BookingPreviewCard(props: BookingPreviewCardProps) {
    const { booking, onClick } = props;
    const services = bookingUtils.getServices(booking);
    return (
        <Card onClick={onClick}>
            <Card.Header
                style={{ background: '#F8F8F8' }}
                title={<BookingStatusTag status={booking.appointmentStatus} />}
                extra={<span>{formatDate(booking.date, 'DD/MM/YYYY HH:mm')}</span>}
            />
            <Card.Body>
                {
                    services.map(o => {
                        return (
                            <React.Fragment key={o.service.id}>
                                <BookingPreviewService
                                    quantity={o.quantity}
                                    service={o.service}
                                />
                                <WhiteSpace />
                            </React.Fragment>
                        );
                    })
                }

            </Card.Body>
            <Card.Footer
                content={booking.name}
                extra={<BookingPrice price={booking.totalAmount} />}
            />
        </Card>
    );
}
