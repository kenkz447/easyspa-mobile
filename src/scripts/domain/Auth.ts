import * as Cookies from 'js-cookie';

import { AppAuthenticator, AppAuthenticatorProps } from '@/app';
import {
    restfulFetcher,
    User,
    UserAuthResponse,
    userResources
} from '@/restful';
import { getUrlSearchParam } from '@/utilities';

export type RoleType = 'Admin' | 'Sale';

export class Authenticator implements AppAuthenticator {
    static readonly authInstance = Symbol();

    static get instance() {
        return Authenticator[Authenticator.authInstance];
    }

    static set instance(instance: Authenticator) {
        if (Authenticator[Authenticator.authInstance]) {
            return;
        }
        Authenticator[Authenticator.authInstance] = instance;
    }

    readonly props: AppAuthenticatorProps;

    constructor(props: AppAuthenticatorProps) {
        this.props = props;
        Authenticator.instance = this;
    }

    async isLoggedIn() {
        try {
            const storedToken = this.getToken();
            if (!storedToken) {
                throw 'Token found!';
            }

            const user: User = await restfulFetcher.fetchResource(userResources.me, []);
            return user;

        } catch (error) {
            throw 'Redirect to login page...';
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

    readonly getToken = (): string | null => {
        const tokenFormCookies = Cookies.get('token');
        if (tokenFormCookies) {
            return Cookies.get('token') || null;
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