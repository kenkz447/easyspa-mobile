import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    AppContextInStore,
    appContextRecuder,
    appContextServiceMiddleware,
    render,
    RootProps,
    routeFrom
} from '@/app';
import { loginPath } from '@/configs';
import { Authenticator } from '@/domain';
import {
    RouteBookingDetailLoadable,
    RouteBookingsLoadable,
    RouteCustomerDetailLoadable,
    RouteCustomerLoadable,
    RouteHomeLoadable,
    RouteLoginLoadable
} from '@/routes';

export function startup() {
    const appRoutes = [
        RouteCustomerLoadable,
        RouteLoginLoadable,
        RouteCustomerDetailLoadable,
        RouteHomeLoadable,
        RouteLoginLoadable,
        RouteBookingsLoadable,
        RouteBookingDetailLoadable
    ];

    const middlewares = applyMiddleware(appContextServiceMiddleware);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const configuration: RootProps = {
        store: createStore(
            combineReducers({
                form: formReducer,
                [nameof<AppContextInStore>(o => o.appContext)]: appContextRecuder
            }),
            composeEnhancers(middlewares)
        ),
        children: routeFrom(appRoutes),
        loginPath: loginPath,
        Authenticator: Authenticator
    };
    return render(configuration);
}