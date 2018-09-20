import { Card, Tabs } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { Customer } from '@/restful';

import {
    CustomerBookingContainer
} from './customer-detail/CustomerBookingContainer';
import {
    CustomerOverviewContainer
} from './customer-detail/CustomerOverviewContainer';
import {
    CustomerServicePackageContainer
} from './customer-detail/CustomerServicePackageContainer';

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
            { title: 'Lịch sử giao dịch' }
        ];
        return (
            <>
                <Card>
                    <Card.Body>
                        <h2>{customer.name}</h2>
                        <CustomerInfo>{customer.mobile || 'Chưa có SĐT'}</CustomerInfo>
                        <CustomerInfo>{customer.email || 'Chưa có email'}</CustomerInfo>
                    </Card.Body>
                </Card>
                <Tabs tabs={tabs}>
                    <CustomerOverviewContainer customerId={customer.id} />
                    <CustomerBookingContainer customerId={customer.id} />
                    <CustomerServicePackageContainer customerId={customer.id} />
                    <div>Lịch sử giao dịch</div>
                </Tabs>
            </>
        );
    }
}