import { List, SearchBar } from 'antd-mobile';
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
    // tslint:disable-next-line:readonly-keyword
    searchTerm?: string;
}

@withAppContext<DomainContext>('history')
export class CustomerList extends React.PureComponent<CustomerListProps, CustomerListState> {
    constructor(props: CustomerListProps) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }

    public render() {
        const { customers, history } = this.props;
        const { searchTerm } = this.state;
        let filteredCustomer = customers;
        if (searchTerm) {
            filteredCustomer = customers.filter(
                customer => customer.name.includes(searchTerm)
                    || customer.email && customer.email.includes(searchTerm)
                    || customer.mobile && customer.mobile.includes(searchTerm)
            );
        }
        return (
            <WrappedList>
                <SearchBar
                    cancelText="Huỷ"
                    onChange={(value) => this.setState({ searchTerm: value })}
                />
                <List>
                    {
                        filteredCustomer.map(customer => {
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