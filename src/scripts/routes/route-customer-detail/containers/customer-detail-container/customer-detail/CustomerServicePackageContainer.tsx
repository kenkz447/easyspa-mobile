import { Flex, List } from 'antd-mobile';
import * as React from 'react';
import { RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { withAppContext } from '@/app';
import { NoContent } from '@/components/domain-components/generic/NoContent';
import { DomainContext } from '@/domain';
import {
    CustomerServicePackage,
    customerServicePackageResources,
    restfulFetcher,
    restfulStore
} from '@/restful';
import { formatDate } from '@/utilities';

import { ListTitle } from './customer-booking-container';

const Center = styled.div`
    text-align: center;
`;

interface CustomerBookingContainerOwnProps extends Pick<DomainContext, 'currentSpaBranch'> {
    readonly customerId: number;
}

@withAppContext<DomainContext>('currentSpaBranch')
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
                        spaBranchId: this.props.currentSpaBranch!.id
                    }
                }]}
                render={(renderProps) => {
                    const { data } = renderProps;

                    if (!data) {
                        return null;
                    }

                    if (
                        !data.customerServicePackages ||
                        !data.customerServicePackages.length
                    ) {
                        return (<NoContent>Chưa mua gói dịch vụ nào</NoContent>);
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
                                            <Center>
                                                <small>Số lần sử dụng</small>
                                            </Center>
                                        </Flex.Item>
                                        <Flex.Item style={{textAlign: 'right'}}>
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

    private renderCustomerServicePackage(customerServicePackage: CustomerServicePackage) {
        return (
            <List.Item>
                <Flex>
                    <Flex.Item>
                        <small>{customerServicePackage.servicePackage.name}</small>
                    </Flex.Item>
                    <Flex.Item>
                        <Center>
                            <small>{customerServicePackage.numbersOfUse}</small>
                        </Center>
                    </Flex.Item>
                    <Flex.Item>
                        <Center>
                            <small>{formatDate(customerServicePackage.expiryDate, 'DD/MM/YYYY HH:MM')}</small>
                        </Center>
                    </Flex.Item>
                </Flex>
            </List.Item>
        );
    }
}