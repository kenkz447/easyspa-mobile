import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { AppContextServices, PageProps } from '@/app/core';
import { eventHandlers } from '@/domain';

export type AppPageProps<T = {}> =
    Required<Pick<AppContextServices, 'setAppContext'>> &
    Required<Pick<AppContextServices, 'checkAppContext'>> &
    RouteComponentProps<T> &
    PageProps;

export class AppPage<P extends AppPageProps = AppPageProps, S= {}> extends React.PureComponent<P, S> {
    constructor(props: P) {
        super(props);
        eventHandlers.onPageLoad(this.props);
    }
}