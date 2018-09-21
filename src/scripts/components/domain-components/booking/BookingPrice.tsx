import * as React from 'react';
import styled from 'styled-components';

import { formatCurrency } from '@/utilities';

const BookingPriceWrapper = styled.span`
    color: ${(props) => props.color};
    font-weight: bold;
    font-size: 16px;
`;

export interface BookingPriceProps {
    readonly price: number;
    readonly color?: 'orange' | 'black';
}

export function BookingPrice(props: BookingPriceProps) {
    return (
        <BookingPriceWrapper color={props.color}>
            {formatCurrency(props.price)}
        </BookingPriceWrapper>
    );
}

// tslint:disable-next-line:no-string-literal
BookingPrice['defaultProps'] = {
    color: 'orange'
} as Partial<BookingPriceProps>;