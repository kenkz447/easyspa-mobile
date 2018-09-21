import { Card, WhiteSpace } from 'antd-mobile';
import * as React from 'react';

import {
    BookingInvoiceCodeTag
} from '@/components/domain-components/booking/BookingInvoiceCodeTag';
import { Booking, bookingUtils } from '@/restful';
import { formatDate } from '@/utilities';

import { BookingCustomerName } from './BookingCustomerName';
import { BookingPreviewService } from './BookingPreviewService';
import { BookingPrice } from './BookingPrice';
import { BookingStatusTag } from './BookingStatusTag';

export interface BookingPreviewCardProps {
    readonly booking: Booking;
    readonly onClick: () => void;
    readonly showInvoiceCode?: boolean;
}

export function BookingPreviewCard(props: BookingPreviewCardProps) {
    const { booking, onClick, showInvoiceCode } = props;
    const services = bookingUtils.getServices(booking);
    const invoiceCode = booking.transactionDTO && booking.transactionDTO.invoiceCode;
    return (
        <Card onClick={onClick}>
            <Card.Header
                style={{ background: '#F8F8F8' }}
                title={
                    (showInvoiceCode && invoiceCode) ?
                        (<BookingInvoiceCodeTag invoicode={invoiceCode}/>) :
                        (<BookingStatusTag status={booking.appointmentStatus} />)
                }
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
                content={<BookingCustomerName>{booking.name}</BookingCustomerName>}
                extra={<BookingPrice price={booking.totalAmount} />}
            />
        </Card>
    );
}
