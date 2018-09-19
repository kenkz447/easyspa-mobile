import { Card } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { Customer } from '@/restful';

interface CustomerDetailOwnProps {
    readonly customer: Customer;
}

const CustomerInfo = styled.div`
    color: #BDBDBD;    
`;

export class CustomerDetail extends React.PureComponent<CustomerDetailOwnProps> {
    render() {
        const { customer } = this.props;
        return (
            <Card>
                <Card.Body>
                    <h2>{customer.name}</h2>
                    <CustomerInfo>{customer.mobile || 'Chưa có SĐT'}</CustomerInfo>
                    <CustomerInfo>{customer.email}</CustomerInfo>
                    <a onClick={() => this.editCustomer()}>Chỉnh sửa thông tin</a>
                </Card.Body>
            </Card>
        );
    }

    editCustomer() {
        return true;
    }
}