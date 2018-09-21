import { Flex } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { Service } from '@/restful/resources/service';

const BookingPreviewServiceWrapper = styled.div`
    background: #F8F8F8;
    border-radius: 10px;
    padding: 10px;
`;

const BookingPreviewServiceIcon = styled.img`
    vertical-align: 'middled';
    width: 15px;
    margin-right: 10px;
`;

const BookingPreviewServiceMeta = styled.span`
    font-size: 15px;
    color: darkgray;
`;

export interface BookingPreviewServiceProps {
    readonly quantity: number;
    readonly service: Service;
}

export function BookingPreviewService(props: BookingPreviewServiceProps) {
    const { service, quantity } = props;
    return (
        <BookingPreviewServiceWrapper>
            <span
                style={{
                    color: 'black',
                    fontSize: 16
                }}
            >
                {service.name}
            </span>
            <br />
            <Flex>
                <Flex.Item>
                    <Flex>
                        <BookingPreviewServiceIcon src="/static/assets/customers.png" />
                        <BookingPreviewServiceMeta>
                            {quantity}
                        </BookingPreviewServiceMeta>
                    </Flex>
                </Flex.Item>
                <Flex.Item>
                    <Flex>
                        <BookingPreviewServiceIcon src="/static/assets/clock.png" />
                        <BookingPreviewServiceMeta>
                            {service.timeValue} phút
                        </BookingPreviewServiceMeta>
                    </Flex>
                </Flex.Item>
            </Flex>
        </BookingPreviewServiceWrapper>
    );
}
