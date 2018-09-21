import * as React from 'react';
import styled from 'styled-components';

import { formatCurrency } from '@/utilities';

const BookingPriceWrapper = styled.span`
    color: orange;
    font-weight: bold;
    font-size: 16px;
`;

export interface BookingPriceProps {
    readonly price: number;
}

export function BookingPrice(props: BookingPriceProps) {
    return (
        <BookingPriceWrapper>
            {formatCurrency(props.price)}
        </BookingPriceWrapper>
    );
}
