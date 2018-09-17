import { Store } from 'redux';

import { AppCoreContext, getAppContext } from '@/app/core';

interface AccessControlProps {
    readonly policy: <T extends AppCoreContext>(appContext: T) => boolean;
    readonly children: (result: boolean) => JSX.Element;
}

export function AccessControl(props: AccessControlProps, context: { readonly store: Store }) {
    const { policy, children } = this.props;
    const appContext = getAppContext(context.store);
    const isAllowed = policy(appContext);
    return children(isAllowed);
}