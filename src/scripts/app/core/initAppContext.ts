import { Store } from 'redux';

import { setAppContextAction } from './appContext';
import { AppCoreContext } from './Types';

export const initAppContext = (store: Store, initAppStoreProps: AppCoreContext) => {
    const changeAppStateToReadyAction = setAppContextAction(initAppStoreProps, this);
    store.dispatch(changeAppStateToReadyAction);
};