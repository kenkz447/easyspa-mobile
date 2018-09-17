import { History } from 'history';

import { AppPageProps } from '@/app/containers';

export type AppUser = {};

export interface AppCoreContext {
    readonly currentUser: AppUser;
    readonly history: History;
    readonly appState: 'LOADING' | 'READY';
}

export interface AppEventHandlers {
    readonly onAppLoad: (context: AppCoreContext) => Promise<AppCoreContext>;
    readonly onPageLoad: (props: AppPageProps) => void;
}