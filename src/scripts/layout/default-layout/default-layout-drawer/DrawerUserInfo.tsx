import * as React from 'react';
import styled from 'styled-components';

import { withAppContext } from '@/app';
import { DomainContext } from '@/domain';

const DrawerUserInfoWrapper = styled.div`
    margin: 30px;
    color: #fff;
    font-size: 16px;
`;

export interface DrawerUserInfoProps extends
    Pick<DomainContext, 'currentUser'> {
}

@withAppContext<DomainContext>('currentUser')
export class DrawerUserInfo extends React.PureComponent<DrawerUserInfoProps> {
    public render() {
        const { currentUser } = this.props;
        return (
            <DrawerUserInfoWrapper>
                <span>{currentUser!.name}</span>
            </DrawerUserInfoWrapper>
        );
    }
}
