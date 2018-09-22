import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { NoContent } from '@/components/domain-components/generic/NoContent';
import {
    CustomerTransaction,
    customerTransactionResources,
    restfulFetcher,
    restfulStore
} from '@/restful';

import { CustomerTransactionComponent } from './customer-transaction-container';

interface CustomerTransactionContainerOwnprops {
    readonly customerId: number;
}

interface Response {
    readonly content?: CustomerTransaction[];
}

export class CustomerTransactionContainer extends React.PureComponent<CustomerTransactionContainerOwnprops> {
    render() {
        return (
            <RestfulRender
                store={restfulStore}
                fetcher={restfulFetcher}
                resource={customerTransactionResources.getCustomerTransactionByCustomerId}
                parameters={[{
                    type: 'path',
                    parameter: 'customerId',
                    value: this.props.customerId
                }]}
                render={(renderProps) => {
                    const data = renderProps.data as Response;
                    if (!data) {
                        return null;
                    }

                    if (data.content!.length === 0) {
                        return (<NoContent>Chưa có giao dịch nào</NoContent>);
                    }

                    return (<CustomerTransactionComponent customerTransactions={data.content!} />);
                }}
            />
        );
    }
}