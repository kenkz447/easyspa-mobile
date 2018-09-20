import * as React from 'react';
import styled from 'styled-components';

import { appointmentUtils, Booking } from '@/restful';

interface BookingTitleTagWrapperProps {
    readonly backgroundColor: string;
}

const BookingTitleTagWrapper: React.ComponentType<BookingTitleTagWrapperProps> = styled.span`
    border-radius: 20px;
    color: white;
    font-size: 14px;
    padding: 3px 10px;
    display: inline-block;
    background-color: ${(props: BookingTitleTagWrapperProps) => {
        return props.backgroundColor;
    }};
`;

export interface BookingTitleTagProps {
    readonly status: Booking['appointmentStatus'];
}

export function BookingStatusTag(props: BookingTitleTagProps) {
    const { status } = props;
    const statusItem = appointmentUtils.getStatusInfo(status);

    return (
        <BookingTitleTagWrapper backgroundColor={statusItem.color}>
            {statusItem!.title}
        </BookingTitleTagWrapper>
    );
}
