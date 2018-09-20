import * as React from 'react';

interface CustomerServicePackageItemOwnProps {
    readonly customerId: number;
}

export class CustomerServicePackageItem extends React.PureComponent<CustomerServicePackageItemOwnProps> {
    render() {
        return (
            <div>CustomerServicePackageItem</div>
        );
    }
}