import { Flex, List } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { appointmentUtils, Booking } from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

const Status = styled.small`
    color: ${props => props.color};
`;

export const ListTitle = styled.div`
    color: #BDBDBD;
`;

interface CustomerBookingItemOwnProps {
    readonly bookings: Booking[];
}

export class CustomerBookingItem extends React.PureComponent<CustomerBookingItemOwnProps> {
    render() {
        const { bookings } = this.props;
        const reversedBookings = bookings.reverse();

        return (
            <React.Fragment>
                <List.Item>
                    <ListTitle>
                        <Flex className="text-center">
                            <Flex.Item>
                                <small>Thời gian</small>
                            </Flex.Item>
                            <Flex.Item>
                                <small>Trạng thái</small>
                            </Flex.Item>
                            <Flex.Item>
                                <small>Số tiền</small>
                            </Flex.Item>
                        </Flex>
                    </ListTitle>
                </List.Item>
                {
                    reversedBookings.map(this.renderBookingItem)
                }
            </React.Fragment>
        );
    }

    private readonly renderBookingItem = (booking: Booking) => {
        return (
            <List.Item>
                <Flex key={booking.id}>
                    <Flex.Item>
                        {formatDate(booking.date, 'DD/MM/YY HH:MM')}
                    </Flex.Item>
                    <Flex.Item>
                        {this.renderBookingStatus(booking.appointmentStatus)}
                    </Flex.Item>
                    <Flex.Item>
                        {formatCurrency(booking.totalAmount)}
                    </Flex.Item>
                </Flex>
            </List.Item>

        );
    }

    private readonly renderBookingStatus = (appointmentStatus: Booking['appointmentStatus']) => {
        const statusInfo = appointmentUtils.getStatusInfo(appointmentStatus);
        return (
            <Status color={statusInfo.color}>
                {statusInfo.title}
            </Status>
        );
    }
}