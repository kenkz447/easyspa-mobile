import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { customerResources, restfulFetcher, restfulStore } from '@/restful';

import { CustomerDetail } from './customer-detail-container';

interface CustomerDetailOwnProps {
    readonly customerId: string;
}

export class CustomerDetailContainer extends React.PureComponent<CustomerDetailOwnProps> {
    public render() {
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                resource={customerResources.getCustomerById}
                parameters={[{
                    type: 'path',
                    parameter: 'customerId',
                    value: this.props.customerId
                }]}
                render={(renderProps) => {
                    const { data } = renderProps;

                    if (!data) {
                        return null;
                    }

                    return (
                        <CustomerDetail customer={data}/>
                    );
                }}
            />
        );
    }
}