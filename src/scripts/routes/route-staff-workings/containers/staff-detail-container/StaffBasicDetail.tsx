import * as React from 'react';
import styled from 'styled-components';

import { Staff } from '@/restful';

const StaffBasicDetailWrapper = styled.div`
    color: #000;
    text-align: center;
    margin: 20px 0 15px 0;
    font-size: 18px;
`;

export interface StaffBasicDetailProps {
    readonly staff: Staff;
}

export class StaffBasicDetail extends React.PureComponent<StaffBasicDetailProps> {
    public render() {
        const { staff } = this.props;
        return (
            <StaffBasicDetailWrapper>
                {staff.name}
            </StaffBasicDetailWrapper>
        );
    }
}
