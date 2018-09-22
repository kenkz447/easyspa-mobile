import { Card, Tabs } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { Customer } from '@/restful';

import {
    CustomerBookingContainer,
    CustomerOverviewContainer,
    CustomerServicePackageContainer,
    CustomerTransactionContainer
} from './customer-detail';

const CustomerInfo = styled.div`
    color: #BDBDBD;
`;
interface CustomerDetailOwnProps {
    readonly customer: Customer;
}
export class CustomerDetail extends React.PureComponent<CustomerDetailOwnProps> {
    render() {
        const { customer } = this.props;
        const tabs = [
            { title: 'Thống kê' },
            { title: 'Lịch hẹn' },
            { title: 'Liệu trình' },
            { title: 'Giao dịch' }
        ];
        return (
            <React.Fragment>
                <div style={{textAlign: 'center'}}>
                    <h2>{customer.name}</h2>
                    <CustomerInfo>{customer.mobile || 'Chưa có SĐT'}</CustomerInfo>
                    <CustomerInfo>{customer.email || 'Chưa có email'}</CustomerInfo>
                </div>

                <Tabs tabs={tabs}>
                    <CustomerOverviewContainer customerId={customer.id} />
                    <CustomerBookingContainer customerId={customer.id} />
                    <CustomerServicePackageContainer customerId={customer.id} />
                    <CustomerTransactionContainer customerId={customer.id} />
                </Tabs>
            </React.Fragment>
        );
    }
}