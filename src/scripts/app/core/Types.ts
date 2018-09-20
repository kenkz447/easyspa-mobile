import { History } from 'history';
import { Store } from 'redux';

import { AppPageProps } from '@/app/containers';

export interface AppCoreContext<U = {}> {
    readonly currentUser?: U;
    readonly history?: History;
    readonly appState: 'LOADING' | 'READY';
}

export interface AppEventHandlers {
    readonly onAppLoad: (context: AppCoreContext) => Promise<AppCoreContext>;
    readonly onPageLoad: (props: AppPageProps) => void;
}
export interface AppAuthenticatorProps {
    readonly loginPath: string;
    readonly history: History;
    readonly store: Store;
}

export type AppAuthenticator = {
    readonly props: AppAuthenticatorProps;
    readonly isLoggedIn: () => Promise<AppCoreContext['currentUser']>;
    readonly login: (identifier: string, password: string, rememberMe: boolean) => Promise<boolean>;
    readonly logout: () => void;
}; 

export interface RouteInfo {
    readonly path: string;
    readonly title: string;
    readonly icon?: JSX.Element;
    readonly isActive: () => boolean;
}