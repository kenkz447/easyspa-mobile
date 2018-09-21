import { Flex, List } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { CustomerTransaction, PaymentType } from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

import { ListTitle } from '../customer-booking-container';

interface CustomerTransactionOwnProps {
    readonly customerTransactions: CustomerTransaction[];
}

const ItemContent = styled.div`
    text-align: center;
`;

const PaymentType = styled.small`
    color: ${props => props.color};
`;

export class CustomerTransactionComponent extends React.PureComponent<CustomerTransactionOwnProps> {
    render() {
        return (
            <React.Fragment>
                <List.Item>
                    <ListTitle>
                        <Flex>
                            <Flex.Item>
                                <ItemContent>
                                    <small>Ngày</small>
                                </ItemContent>
                            </Flex.Item>
                            <Flex.Item>
                                <ItemContent>
                                    <small>Loại</small>
                                </ItemContent>
                            </Flex.Item>
                            <Flex.Item>
                                <ItemContent>
                                    <small>Số tiền</small>
                                </ItemContent>
                            </Flex.Item>
                        </Flex>
                    </ListTitle>
                </List.Item>
                {
                    this.props.customerTransactions.reverse().map(
                        customerTransaction => this.renderCustomerTransactionItem(customerTransaction)
                    )
                }
            </React.Fragment>
        );
    }
    private renderCustomerTransactionItem(customerTransaction: CustomerTransaction) {
        return (
            <List.Item>
                <Flex>
                    <Flex.Item>
                        <small>{formatDate(customerTransaction.created, 'DD/MM/YYYY HH:MM')}</small>
                    </Flex.Item>
                    <Flex.Item>
                        <ItemContent>
                            <small>{this.renderPaymentType(customerTransaction.paymentType)}</small>
                        </ItemContent>
                    </Flex.Item>
                    <Flex.Item>
                        <ItemContent>
                            <small>{formatCurrency(customerTransaction.total)}</small>
                        </ItemContent>
                    </Flex.Item>
                </Flex>
            </List.Item>
        );
    }

    private renderPaymentType(paymentType: PaymentType) {
        switch (paymentType) {
            default:
                return null;
            case 'BOOKING':
                return (<PaymentType color="red">Booking</PaymentType>);
            case 'SALE':
            case 'BUYING_SERVICE_PACKAGE':
                return (<PaymentType color="blue">Mua hàng</PaymentType>);
        }
    }
}