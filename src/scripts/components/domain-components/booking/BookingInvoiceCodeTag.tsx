import * as React from 'react';
import styled from 'styled-components';

const BookingInvoiceCodeTagWrapper = styled.span`
    border-radius: 20px;
    color: white;
    font-size: 14px;
    padding: 3px 10px;
    display: inline-block;
    background-color:#63809B ;
`;

export interface BookingInvoiceCodeTagProps {
    readonly invoicode: string;
}

export function BookingInvoiceCodeTag(props: BookingInvoiceCodeTagProps) {
    const { invoicode } = props;
    return (
        <BookingInvoiceCodeTagWrapper>
            #{invoicode}
        </BookingInvoiceCodeTagWrapper>
    );
}
