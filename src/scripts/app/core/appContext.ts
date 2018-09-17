import { connect } from 'react-redux';
import { Action, Dispatch, Store } from 'redux';

import { AppCoreContext } from '@/app/core/Types';

const map = require('lodash/map');

export interface AppContextServices {
    readonly setAppContext?: <T = {}>(values: Partial<T>) => void;
    readonly checkAppContext?: <T>(key: string) => Promise<T>;
}

export interface AppContextInStore {
    readonly appContext: Map<string, unknown>;
}

interface AppContextAction extends Action {
    readonly values: object;
}

const initAppContext = new Map();

export function appContextRecuder(state: Map<string, unknown> = initAppContext, action: AppContextAction) {
    switch (action.type) {
        case 'SET_APP_CONTEXT':
            const newState = new Map(state);
            for (const key in action.values) {
                if (action.values.hasOwnProperty(key)) {
                    const value = action.values[key];
                    if (value === undefined || value === null) {
                        newState.delete(key);
                        continue;
                    }
                    newState.set(key, value);
                }
            }
            return newState;
        default:
            return state;
    }
}

interface CheckAppContextAction extends Action<string> {
    readonly key: string;
    // tslint:disable-next-line:no-any
    readonly resolve: (value: any) => void;
}

export const checkAppContextAction =
    (key: string, resolve: CheckAppContextAction['resolve']): CheckAppContextAction => {
        return {
            type: 'CHECK_APP_CONTEXT',
            key,
            resolve
        };
    };

export const appContextServiceMiddleware = (store: Store) => next => (action: CheckAppContextAction) => {
    if (action.type === 'CHECK_APP_CONTEXT') {
        // tslint:disable-next-line:no-any
        const state: { readonly values: Map<string, any> } = store.getState();
        action.resolve(state.values.get(action.key));
    }
    return next(action);
};

export const setAppContextAction = <T = {}>(values: T, source) => {
    const keys = map(values, (value, key) => key);
    return {
        type: 'SET_APP_CONTEXT',
        values: values,
        keys: keys,
        source: source
    };
};

// tslint:disable-next-line:no-any
export function withAppContext<T = {}>(...keys: Array<keyof T>): any {
    return (Component) => {
        const mapStateToProps = ({ appContext }: AppContextInStore) => {
            if (!keys) {
                return {};
            }

            const keysReducer = (reducerValue, currentKey) => {
                reducerValue[currentKey] = appContext.get(currentKey);
                return reducerValue;
            };
            const state = keys.reduce(keysReducer, {});
            return state;
        };

        function mapDispatchToProps(dispatch: Dispatch): AppContextServices {
            return {
                setAppContext: (values: {}) => {
                    const action = setAppContextAction(values, Component);
                    return dispatch(action);
                },
                checkAppContext: (key: string) => {
                    return new Promise((resolve) => {
                        const action = checkAppContextAction(key, resolve);
                        dispatch(action);
                    });
                }
            };
        }
        return connect(mapStateToProps, mapDispatchToProps)(Component);
    };
}

export function getAppContext<T extends AppCoreContext>(store: Store): AppCoreContext {
    const appState: AppContextInStore = store.getState();
    const contextEntries = appState.appContext.entries();
    const contextList = Array.from(contextEntries);

    const appContext = contextList.reduce(
        (currentValue, next) => ({
            ...currentValue,
            [next[0]]: next[1]
        }),
        {}
    );

    return appContext as T;
}