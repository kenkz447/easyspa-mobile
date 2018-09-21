import { Flex, List } from 'antd-mobile';
import * as React from 'react';
import { RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { restfulFetcher, restfulStore } from '@/restful';
import {
    CustomerServicePackage,
    customerServicePackageResources
} from '@/restful/resources/customer-service-package';
import {
    CustomerTransaction,
    customerTransactionResources
} from '@/restful/resources/customer-transaction';
import { formatCurrency, formatDate } from '@/utilities';

import { ListTitle } from './customer-booking-container';

const ItemContent = styled.div`
    text-align: center;
`;

interface CustomerTransactionContainerOwnprops {
    readonly customerId: number;
}

interface Response {
    readonly content?: CustomerTransaction[];
}

export class CustomerTransactionContainer extends React.PureComponent<CustomerTransactionContainerOwnprops> {
    render() {
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                resource={customerTransactionResources.getCustomerTransactionByCustomerId}
                parameters={[{
                    type: 'path',
                    parameter: 'customerId',
                    value: this.props.customerId
                }]}
                render={(renderProps) => {
                    const data = renderProps.data as Response;
                    if (!data) {
                        return null;
                    }

                    if (data.content!.length === 0) {
                        return (<div>Chưa có giao dịch nào</div>);
                    }

                    return (
                        <div>
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
                                data.content!.map(
                                    customerTransaction => this.renderCustomerTransaction(customerTransaction)
                                )
                            }
                        </div>
                    );
                }}
            />
        );
    }

    private renderCustomerTransaction(customerTransaction: CustomerTransaction) {
        return (
            <List.Item>
                <Flex>
                    <Flex.Item>
                            <small>{formatDate(customerTransaction.created, 'DD/MM/YYYY HH:MM')}</small>
                    </Flex.Item>
                    <Flex.Item>
                        <ItemContent>
                            <small>{customerTransaction.paymentType}</small>
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
}