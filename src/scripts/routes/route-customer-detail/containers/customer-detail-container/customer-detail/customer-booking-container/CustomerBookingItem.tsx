import { Flex, List } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { Booking } from '@/restful/resources/booking';
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
        return (
            <>
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
                    bookings.map(
                        booking => this.renderBookingItem(booking)
                    )
                }
            </>

        );
    }

    private renderBookingItem(booking: Booking) {
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

    private renderBookingStatus(appointmentStatus: Booking['appointmentStatus']) {
        switch (appointmentStatus) {
            default:
                return null;
            case 'CANCEL':
                return (<Status color="red">Huỷ</Status>);
            case 'CHECKIN':
                return (<Status color="blue">Đang làm</Status>);
            case 'CHECKOUT':
                return (<Status color="green">Xong</Status>);
            case 'CONFIRMED':
                return (<Status color="orange">Đã xác nhận</Status>);
            case 'TEMP':
                return (<Status color="yellow">Chưa xác nhận</Status>);
        }
    }
}