import * as React from 'react';
import styled from 'styled-components';

import { colorPrimary } from '@/configs';

const PrimaryTextSpan = styled.span`
    color: ${colorPrimary};
`;

export function PrimaryText(props: React.HTMLAttributes<HTMLSpanElement>) {
    return <PrimaryTextSpan {...props} />;
}