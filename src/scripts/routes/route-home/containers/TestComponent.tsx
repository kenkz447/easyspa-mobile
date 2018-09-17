import * as React from 'react';

import { WithCurrentUserProps, withUsers } from '@/restful';

export interface TestComponentOwnProps extends WithCurrentUserProps {
    readonly x: number;
}

@withUsers()
export class TestComponentComponentWithHoc extends React.PureComponent<TestComponentOwnProps> {
    readonly x = 1;
    render() {
        return (
            <div>
                {null}
            </div>
        );
    }
}