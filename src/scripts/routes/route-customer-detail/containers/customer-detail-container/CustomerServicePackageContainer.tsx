import { Flex, List } from 'antd-mobile';
import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { restfulFetcher, restfulStore } from '@/restful';
import {
    CustomerServicePackage,
    customerServicePackageResources
} from '@/restful/resources/customer-service-package';
import { formatDate } from '@/utilities';

import { ListTitle } from './customer-booking-container';

interface CustomerBookingContainerOwnProps {
    readonly customerId: number;
}

interface Response {
    readonly customerServicePackages?: CustomerServicePackage[];
}

export class CustomerServicePackageContainer extends React.PureComponent<CustomerBookingContainerOwnProps> {
    render() {
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                resource={customerServicePackageResources.getCustomerServicePackageByCustomerId}
                parameters={[{
                    type: 'body',
                    value: {
                        customerId: this.props.customerId,
                        spaBranchId: 1
                    }
                }]}
                render={(renderProps) => {
                    const data = renderProps.data as Response;
                    if (!data) {
                        return null;
                    }

                    if (data.customerServicePackages!.length === 0) {
                        return (<div>Chưa mua gói dịch vụ nào</div>);
                    }

                    return (
                        <div>
                            <List.Item>
                                <ListTitle>
                                    <Flex>
                                        <Flex.Item>
                                            <small>Tên dịch vụ</small>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <small>Số lần sử dụng</small>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <small>Hết hạn</small>
                                        </Flex.Item>

                                    </Flex>
                                </ListTitle>
                            </List.Item>
                            {
                                data.customerServicePackages!.map(
                                    customerServicePackage => this.renderCustomerServicePackage(customerServicePackage)
                                )
                            }
                        </div>
                    );
                }}
            />
        );
    }

    renderCustomerServicePackage(customerServicePackage: CustomerServicePackage) {
        return (
            <List.Item>
                <Flex>
                    <Flex.Item>{customerServicePackage.servicePackage.name}</Flex.Item>
                    <Flex.Item>{customerServicePackage.numbersOfUse}</Flex.Item>
                    <Flex.Item>{formatDate(customerServicePackage.expiryDate, 'DD/MM/YYYY HH:MM')}</Flex.Item>
                </Flex>
            </List.Item>
        );
    }
}