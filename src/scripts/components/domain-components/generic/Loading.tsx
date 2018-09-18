import { ActivityIndicator } from 'antd-mobile';
import * as React from 'react';

export function Loading(props: {}) {
    return (
        <ActivityIndicator
            toast={true}
            text="Loading..."
            animating={true}
        />
    );
} 