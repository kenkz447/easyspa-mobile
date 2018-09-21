import { Accordion, Flex, List, WhiteSpace } from 'antd-mobile';
import * as React from 'react';
import { RestfulRender } from 'react-restful';
import styled from 'styled-components';

import { customerResources, restfulFetcher, restfulStore } from '@/restful';
import {
    CustomerServicePackage,
    customerServicePackageResources,
    Service
} from '@/restful';
import { formatDate } from '@/utilities';

const Item = styled.div`
    color: #BDBDBD;
`;

const OverviewList = styled.div`
    .am-list {
        &-body {
            border: 0;
        }
    }
`;

interface CustomerOverviewContainerOwnProps {
    readonly customerId: number;
}

interface Favourite {
    readonly name: string;
}

interface FavouriteItem {
    readonly item: Favourite;
    readonly numberOfItem: number;
}

interface Response {
    readonly totalBooking?: number;
    readonly totalCheckinBooking?: number;
    readonly totalCancelBooking?: number;
    readonly lastTimeVisit?: Date;
    readonly topFavorites?: Array<FavouriteItem>;
}

export class CustomerOverviewContainer extends React.PureComponent<CustomerOverviewContainerOwnProps> {
    render() {
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                resource={customerResources.getCustomerOverviewByCustomerId}
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

                    return (
                        this.renderUI(data)
                    );
                }}
            />
        );
    }

    private renderUI(data: Response) {
        return (
            <OverviewList>
                <WhiteSpace />
                <List>
                    <List.Item>
                        <Flex>
                            <Flex.Item>
                                Tổng số lần đặt trước
                            </Flex.Item>
                            <Flex.Item>
                                <Item>{data.totalBooking}</Item>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex>
                            <Flex.Item>
                                Tổng số lần đến
                            </Flex.Item>
                            <Flex.Item>
                                <Item>{data.totalCheckinBooking}</Item>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex>
                            <Flex.Item>
                                Tổng số lần huỷ
                            </Flex.Item>
                            <Flex.Item>
                                <Item>{data.totalCancelBooking}</Item>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex>
                            <Flex.Item>
                                Ghé thăm lần cuối
                            </Flex.Item>
                            <Flex.Item>
                                <Item>{formatDate(data.lastTimeVisit!, 'DD/MM/YYYY HH:MM')}</Item>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                </List>
                <WhiteSpace />
                <Accordion accordion={false}>
                    <Accordion.Panel header="Yêu thích">
                        {
                            data.topFavorites!.map(
                                (favouriteItem, index) => {
                                    return (
                                        <List.Item key={index}>

                                            <Flex>
                                                <Flex.Item>
                                                    <Item>{favouriteItem.item.name}</Item>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <Item>{favouriteItem.numberOfItem}</Item>
                                                </Flex.Item>
                                            </Flex>

                                        </List.Item>
                                    );
                                }
                            )
                        }
                    </Accordion.Panel>
                </Accordion>
            </OverviewList>
        );
    }
}