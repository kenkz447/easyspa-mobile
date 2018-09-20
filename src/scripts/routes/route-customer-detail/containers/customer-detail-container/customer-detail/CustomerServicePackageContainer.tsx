import { Flex, List } from 'antd-mobile';
import * as React from 'react';
import { RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { restfulFetcher, restfulStore } from '@/restful';
import {
    CustomerServicePackage,
    customerServicePackageResources
} from '@/restful/resources/customer-service-package';
import { formatDate } from '@/utilities';

import { ListTitle } from './customer-booking-container';

const ItemContent = styled.div`
    text-align: center;
`;

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
                                            <ItemContent>
                                                <small>Tên dịch vụ</small>
                                            </ItemContent>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <ItemContent>
                                                <small>Số lần sử dụng</small>
                                            </ItemContent>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <ItemContent>
                                                <small>Hết hạn</small>
                                            </ItemContent>
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

    private renderCustomerServicePackage(customerServicePackage: CustomerServicePackage) {
        return (
            <List.Item>
                <Flex>
                    <Flex.Item>
                            <small>{customerServicePackage.servicePackage.name}</small>
                    </Flex.Item>
                    <Flex.Item>
                        <ItemContent>
                            <small>{customerServicePackage.numbersOfUse}</small>
                        </ItemContent>
                    </Flex.Item>
                    <Flex.Item>
                        <ItemContent>
                            <small>{formatDate(customerServicePackage.expiryDate, 'DD/MM/YYYY HH:MM')}</small>
                        </ItemContent>
                    </Flex.Item>
                </Flex>
            </List.Item>
        );
    }
}