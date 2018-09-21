import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { restfulFetcher, restfulStore } from '@/restful';
import {
    CustomerServicePackage,
    customerServicePackageResources
} from '@/restful/resources/customer-service-package';
import {
    CustomerTransaction,
    customerTransactionResources
} from '@/restful/resources/customer-transaction';

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
                        return (<div>Chưa có giao dịch nào</div>);
                    }

                    return (<CustomerTransactionComponent customerTransactions={data.content!} />);
                }}
            />
        );
    }
}