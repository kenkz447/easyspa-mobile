import { Flex } from 'antd-mobile';
import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { restfulFetcher, restfulStore, staffResources } from '@/restful';
import {
    StaffBasicDetail
} from '@/routes/route-staff-workings/containers/staff-detail-container';

export interface StaffDetailContainerProps {
    readonly staffId: number;
}

export class StaffDetailContainer extends React.PureComponent<StaffDetailContainerProps> {
    public render() {
        const { staffId } = this.props;
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                resource={staffResources.getById}
                parameters={[{
                    type: 'path',
                    parameter: 'id',
                    value: staffId
                }]}
                render={(renderProps) => {
                    const { data } = renderProps;
                    if (!data) {
                        return null;
                    }

                    return <StaffBasicDetail staff={data} />;
                }}
            />
        );
    }
}
