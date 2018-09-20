import { RecordType } from 'react-restful';

import { ServiceCategory } from './service-category';

export interface Service extends RecordType {
    readonly id: number;
    readonly description: string;
    readonly name: string;
    readonly time: number;
    readonly timeValue: number;
    readonly price: number;
    readonly priceText: string;
    readonly serviceCategory: ServiceCategory;
    readonly spaBranchId: number;
    readonly spaId: number;
    readonly status: 'ENABLE' | 'DISABLE';
}