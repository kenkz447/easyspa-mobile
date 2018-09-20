import { Service } from './service';

export interface ServiceCategory {
    readonly description: string;
    readonly id: number;
    readonly name: string;
    readonly spaBranchId: number;
    readonly spaId: number;
    readonly services: Array<Service>;
    readonly query: string;
    readonly status: 'ENABLE' | 'DISABLE';
}