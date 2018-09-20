import * as React from 'react';
import styled from 'styled-components';

import { Service } from '@/restful/resources/service';

const BookingPreviewServiceWrapper = styled.div`
    background: #F8F8F8;
    border-radius: 10px;
    padding: 10px;
`;

export interface BookingPreviewServiceProps {
    readonly quantity: number;
    readonly service: Service;
}

export function BookingPreviewService(props: BookingPreviewServiceProps) {
    const { service, quantity } = props;
    return (
        <BookingPreviewServiceWrapper>
            <strong>{service.name}</strong><br/>
            <span>Số lượng: {quantity}</span>
        </BookingPreviewServiceWrapper>
    ); 
}
