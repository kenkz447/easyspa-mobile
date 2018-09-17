import './Root.scss';

import { createBrowserHistory, History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Switch } from 'react-router-dom';
import { AnyAction, Store } from 'redux';

import { AppCoreContext, initAppContext } from '@/app/core';
import { Auth } from '@/domain';
import { eventHandlers } from '@/domain';

export interface RootProps {
    readonly store: Store<string, AnyAction>;
    readonly children: JSX.Element[];
    readonly loginPath: string;
}

export class Root extends React.Component<RootProps> {
    readonly authHelper: Auth;
    readonly history: History;

    readonly state = {
        allowLoad: false
    };

    constructor(props: RootProps) {
        super(props);
        const { loginPath, store } = props;
        this.history = createBrowserHistory();
        this.authHelper = new Auth({
            loginPath: loginPath,
            store: store,
            history: this.history,
        });
        this.authHelper
            .isLoggedIn()
            .catch((toLoginPage: Function) => {
                throw toLoginPage();
            })
            .then((user): AppCoreContext => {
                return {
                    currentUser: user,
                    history: this.history,
                    appState: 'LOADING'
                };
            })
            .then(eventHandlers.onAppLoad)
            .then((context: AppCoreContext) => {
                const finalAppContext: AppCoreContext = {
                    ...context,
                    appState: 'READY'
                };

                initAppContext(this.props.store, finalAppContext);
            });
    }

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <Router history={this.history}>
                    <Switch>
                        {this.props.children}
                    </Switch>
                </Router>
            </Provider>
        );
    }
}