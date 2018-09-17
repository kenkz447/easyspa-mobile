import * as React from 'react';

import { AppContextServices } from '@/app/core';
import { eventHandlers } from '@/domain';

export type AppPageProps = Required<Pick<AppContextServices, 'setAppContext'>>;

export class AppPage<P extends AppPageProps = AppPageProps, S= {}> extends React.PureComponent<P, S> {
    constructor(props: P) {
        super(props);
        eventHandlers.onPageLoad(this.props);
    }
}