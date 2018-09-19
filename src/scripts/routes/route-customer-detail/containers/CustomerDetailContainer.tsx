import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { restfulFetcher, restfulStore } from '@/restful';
import { customerResources } from '@/restful/resources/customer';
import { getUrlSearchParam } from '@/utilities';

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
                    value: +this.props.customerId!
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