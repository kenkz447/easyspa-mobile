import { History } from 'history';
import * as Cookies from 'js-cookie';
import { Store } from 'redux';

import {
    restfulFetcher,
    User,
    UserAuthResponse,
    userResources
} from '@/restful';
import { getUrlSearchParam } from '@/utilities';

export type RoleType = 'Admin' | 'Sale';

interface AuthProps {
    readonly loginPath: string;
    readonly history: History;
    readonly store: Store;
}

export class Auth {
    // tslint:disable-next-line:readonly-keyword
    static _instance: Auth;
    static get instance() {
        return Auth._instance;
    }
    static set instance(instance: Auth) {
        if (Auth._instance) {
            return;
        }
        Auth._instance = instance;
    }

    // tslint:disable-next-line:readonly-keyword
    currentUser: User;

    readonly props: AuthProps;

    constructor(props: AuthProps) {
        this.props = props;

        Auth.instance = this;
    }

    async isLoggedIn() {
        try {
            const user: User = await restfulFetcher.fetchResource(userResources.me, []);
            return user;
        } catch (error) {
            const { loginPath, history } = this.props;
            throw () => history.replace(loginPath);
        }
    }

    async login(identifier: string, password: string, rememberMe: boolean) {
        try {
            const login: UserAuthResponse = await restfulFetcher.fetchResource(
                userResources.auth,
                [{
                    type: 'body',
                    value: {
                        identifier: identifier,
                        password: password,
                        rememberMe: rememberMe
                    }
                }]
            );

            this.saveToken(login.jwt, rememberMe);

            const returnUrlParam = getUrlSearchParam('returnUrl');
            const returnPath = returnUrlParam ? returnUrlParam : '/';
            window.location.href = returnPath;

            return true;
        } catch (error) {
            throw error;
        }
    }

    readonly logout = () => {
        const { loginPath } = this.props;
        this.clearToken();
        this.props.history.replace(loginPath);
    }

    readonly getToken = (): string => {
        const tokenFormCookies = Cookies.get('token');
        if (tokenFormCookies) {
            return Cookies.get('token');
        }
        return window.sessionStorage.getItem('token');
    }

    readonly saveToken = (token: string, isRememberMe: boolean) => {
        if (isRememberMe) {
            Cookies.set('token', token, { expires: 7 });
        } else {
            window.sessionStorage.setItem('token', token);
        }
    }

    readonly clearToken = () => {
        Cookies.remove('token');
    }
}