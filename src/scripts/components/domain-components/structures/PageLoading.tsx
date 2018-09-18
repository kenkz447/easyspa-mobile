import { ActivityIndicator } from 'antd-mobile';
import * as React from 'react';

import { withAppContext } from '@/app';

export interface PageLoadingProps {
    readonly showPageLoading?: boolean;
}

function PageLoadingComponent(props: PageLoadingProps) {
    if (!props.showPageLoading) {
        return null;
    }
    
    return (
        <ActivityIndicator
            toast={true}
            text="Loading..."
            animating={props.showPageLoading}
        />
    );
}

export const PageLoading = withAppContext(
    nameof<PageLoadingProps>(o => o.showPageLoading)
)(PageLoadingComponent);