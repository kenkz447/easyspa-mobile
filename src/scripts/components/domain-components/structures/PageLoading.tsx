import * as React from 'react';
import styled from 'styled-components';

import { withAppContext } from '@/app';
import { AntdIcon, AntdSpin } from '@/components/antd-component';

const LoadingWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content:center;
    align-items: center;
    z-index: 9;
`;

export interface PageLoadingProps {
    readonly showPageLoading?: boolean;
}

function PageLoadingComponent(props: PageLoadingProps) {
    if (!props.showPageLoading) {
        return null;
    }

    return (
        <LoadingWrapper>
            <AntdSpin
                tip="Đang tải dữ liệu..."
                indicator={<AntdIcon type="loading" style={{ fontSize: 24 }} spin={true} />}
            />
        </LoadingWrapper>
    );
}

export const PageLoading = withAppContext(
    nameof<PageLoadingProps>(o => o.showPageLoading)
)(PageLoadingComponent);