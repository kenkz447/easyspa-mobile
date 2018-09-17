import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    appContextRecuder,
    appContextServiceMiddleware,
    render,
    RootProps,
    route
} from '@/app';
import { loginPath } from '@/configs';
import { RouteHomeLoadable } from '@/routes';

export function startup() {
    const appRoutes = [
        RouteHomeLoadable
    ];

    const middlewares = applyMiddleware(appContextServiceMiddleware);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const configuration: RootProps = {
        store: createStore(
            combineReducers({
                form: formReducer,
                values: appContextRecuder
            }),
            composeEnhancers(middlewares)
        ),
        children: appRoutes.reduce(
            (currenValue, Component) => {
                return [...currenValue, route(Component)];
            },
            []
        ),
        loginPath: loginPath
    };
    return render(configuration);
}