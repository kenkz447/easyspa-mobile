import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { restfulFetcher, restfulStore } from '@/restful';
import { customerResources } from '@/restful/resources/customer';

import { CustomerList } from './customer-container';

export class CustomerContainer extends React.PureComponent {
    public render() {
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                resource={customerResources.getCustomersBySpaBranch}
                render={(renderProps) => {
                    const { data } = renderProps;

                    if (!data) {
                        return null;
                    }

                    return (
                        <CustomerList
                            customers={data}
                        />
                    );
                }}
            />
        );
    }
}