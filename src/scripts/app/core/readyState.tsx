import * as React from 'react';

import { AppCoreContext } from '@/app/core/Types';

import { withAppContext } from './appContext';
import { AppRouteComponent, PageProps } from './route';

/**
 * Allow Route's Component render when appState is READY
 * @return {React.StatelessComponent}
 */
export function readyState() {
    return (Component: AppRouteComponent) => {
        const withAppState = withAppContext<AppCoreContext>('appState')
            ((props: PageProps & AppCoreContext) => {
                if (props.appState !== 'READY') {
                    return null;
                }
                // tslint:disable-next-line:no-any
                return <Component {...props} />;
            });

        return withAppState;
    };
}