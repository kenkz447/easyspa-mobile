import { WingBlank } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { LoginFormControl } from '@/forms/accounts';

const LoginPageWrapper = styled.div`
    width: 100%;
`;

export class LoginPageContainer extends React.PureComponent {
    render() {
        return (
            <LoginPageWrapper>
                <WingBlank>
                    <h1>Đăng nhập</h1>
                </WingBlank>
                <LoginFormControl />
            </LoginPageWrapper>
        );
    }
}