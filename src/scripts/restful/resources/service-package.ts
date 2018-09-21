import { RecordType } from 'react-restful';

import { Customer } from './customer';
import { Service } from './service';

export interface ServicePackage extends RecordType {
    readonly created: string;
    readonly updated: string;
    readonly createdBy: string;
    readonly updatedBy: string;
    readonly status: string;
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly slug: string;
    readonly numberOfUse: number;
    readonly price: number;
    readonly originalPrice: number;
    readonly daysOfUse: number;
    readonly service: Service[];
    readonly customerSpabranch: Customer;
}