import * as Cookies from 'js-cookie';

import { AppAuthenticator, AppAuthenticatorProps } from '@/app';
import {
    AccountAuthenticate,
    accountAuthenticateResources,
    restfulFetcher,
    User,
    userResources
} from '@/restful';
import { getUrlSearchParam } from '@/utilities';

export class Authenticator implements AppAuthenticator {
    static readonly tokenKey = 'easyspa-mobile';
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

            const user: User = await restfulFetcher.fetchResource(userResources.account);
            return user;

        } catch (error) {
            throw 'Redirect to login page...';
        }
    }

    async login(username: string, password: string, rememberMe: boolean) {
        try {
            const login: AccountAuthenticate = await restfulFetcher.fetchResource(
                accountAuthenticateResources.authenticate,
                [{
                    type: 'body',
                    value: {
                        username: username,
                        password: password,
                        rememberMe: rememberMe
                    }
                }]
            );

            this.saveToken(login.id_token, rememberMe);

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
        const tokenFormCookies = Cookies.get(Authenticator.tokenKey);
        if (tokenFormCookies) {
            return Cookies.get(Authenticator.tokenKey) || null;
        }

        return window.sessionStorage.getItem(Authenticator.tokenKey);
    }

    readonly saveToken = (token: string, isRememberMe: boolean) => {
        if (isRememberMe) {
            Cookies.set(Authenticator.tokenKey, token, { expires: 7 });
        } else {
            window.sessionStorage.setItem(Authenticator.tokenKey, token);
        }
    }

    readonly clearToken = () => {
        Cookies.remove(Authenticator.tokenKey);
    }
}