import * as React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

export type AppRouteComponentProps<T> = RouteComponentProps<T>;

export interface PageProps {
    readonly routeProps: RouteProps;
}

export type AppRouteComponent = React.ComponentType<PageProps>;

export const route = (Component: AppRouteComponent) => {
    if (
        !Component.defaultProps ||
        !Component.defaultProps.routeProps
    ) {
        throw Error('Default Props with routeProps needed in Route Component!');
    }

    const routeProps = Component.defaultProps.routeProps;

    return (
        <Route key={routeProps.path} {...routeProps} component={Component} />
    );
};

export const routeFrom = (Components: AppRouteComponent[]) => Components.reduce(
    (currenValue: JSX.Element[], Component) => {
        return [...currenValue, route(Component)];
    },
    []
);