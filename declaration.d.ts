// tslint:disable:readonly-keyword
// tslint:disable:no-any

/// <reference path="node_modules/ts-nameof/ts-nameof.d.ts" />

declare module '*.scss' {
    const content: unknown;
    export default content;
}

declare const API_ENTRY: string;

declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}