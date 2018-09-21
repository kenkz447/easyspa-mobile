import { Flex, WhiteSpace } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import {
    BookingCustomerName,
    BookingPreviewService,
    BookingStatusTag
} from '@/components';
import { AntdDivider, BookingPrice } from '@/components';
import { Booking, bookingUtils, transactionUtils } from '@/restful';
import { formatDate } from '@/utilities';

const BookingDetailPageWrapper = styled.div`
    display: block;
`;

export interface BookingDetailPageProps {
    readonly booking: Booking;
}

export class BookingDetailPage extends React.PureComponent<BookingDetailPageProps> {
    public render() {
        const { booking } = this.props;
        const services = bookingUtils.getServices(booking);
        const compledBookingTime = bookingUtils.getCompletedTime(booking);

        const { transactionDTO } = booking;

        return (
            <BookingDetailPageWrapper>
                <WhiteSpace />
                <Flex>
                    <Flex.Item>
                        <BookingCustomerName>{booking.name}</BookingCustomerName>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={{ textAlign: 'right' }}>
                            <BookingStatusTag status={booking.appointmentStatus} />
                        </div>
                    </Flex.Item>
                </Flex>
                <AntdDivider />
                <p>THÔNG TIN DỊCH VỤ</p>
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
                <WhiteSpace size="xl" />
                <div style={{ color: 'black' }}>
                    <Flex>
                        <Flex.Item>
                            <span>Số lượng khách</span>
                        </Flex.Item>
                        <Flex.Item>
                            <div style={{ textAlign: 'right' }}>
                                <strong>{booking.appointments.length}</strong>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex>
                        <Flex.Item>
                            <span>Thời gian</span>
                        </Flex.Item>
                        <Flex.Item>
                            <div style={{ textAlign: 'right' }}>
                                <strong>
                                    {formatDate(new Date(booking.date), 'HH:mm')}
                                </strong>
                                {' - '}
                                <strong>
                                    {formatDate(compledBookingTime, 'HH:mm')}
                                </strong>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <AntdDivider />
                    {
                        transactionDTO && (
                            <div>
                                <p>THÔNG TIN THANH TOÁN</p>
                                {
                                    transactionDTO.paymentMethodDTOS.map(payment => {
                                        return (
                                            <Flex key={payment.paymentMethod}>
                                                <Flex.Item>
                                                    <span>
                                                        {transactionUtils.getPaymentMethodLable(payment.paymentMethod)}
                                                    </span>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <BookingPrice price={payment.amount} color="black" />
                                                    </div>
                                                </Flex.Item>
                                            </Flex>
                                        );
                                    })
                                }
                            </div>
                        )
                    }
                    <AntdDivider dashed={true} />
                    <Flex>
                        <Flex.Item>
                            <span>TỔNG TIỀN</span>
                        </Flex.Item>
                        <Flex.Item>
                            <div style={{ textAlign: 'right' }}>
                                <BookingPrice price={booking.totalAmount} />
                            </div>
                        </Flex.Item>
                    </Flex>
                </div>
                <WhiteSpace size="xl" />
            </BookingDetailPageWrapper>
        );
    }
}
