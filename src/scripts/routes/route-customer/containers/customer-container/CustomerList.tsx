import { List } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { withAppContext } from '@/app';
import { DomainContext } from '@/domain';
import { Customer, WithCustomerOwnProps } from '@/restful';

export interface CustomerListProps extends
    Pick<DomainContext, 'history'>,
    WithCustomerOwnProps {

}

export const WrappedList = styled.div`
    width: 100%;
`;

interface CustomerListState {
    readonly selectedCustomer?: Customer;
}

@withAppContext<DomainContext>('history')
export class CustomerList extends React.PureComponent<CustomerListProps, CustomerListState> {
    readonly state: CustomerListState = {};

    public render() {
        const { customers, history } = this.props;
        const { selectedCustomer } = this.state;

        return (
            <WrappedList>
                <List>
                    {
                        customers.map(customer => {
                            const toCustomerDetailPath = String(`/customer/${customer.id}`);
                            return (
                                <List.Item
                                    key={customer.id}
                                    onClick={() => history!.push(toCustomerDetailPath)}
                                >
                                    <strong>{customer.name}</strong>
                                    <List.Item.Brief>
                                        {customer.mobile || 'Chưa có SĐT'}
                                    </List.Item.Brief>
                                </List.Item>
                            );
                        })
                    }
                </List>
            </WrappedList>

        );
    }
}