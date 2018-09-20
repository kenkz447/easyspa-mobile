import { RecordType } from 'react-restful';

import { Service } from './service';

export interface Staff extends RecordType {
    readonly dob: string;
    readonly id: number;
    readonly mobile: string;
    readonly name: string;
    readonly position: string;
    readonly spaBranchId: number;
    readonly spaId: number;
    readonly status: string;
    readonly services: Array<Service>;
    readonly workAllServices: boolean;
    readonly staffStatus: 'WORKED' | 'STOPPED' | 'BLOCKED';
    readonly staffType: 'OFFICIAL' | 'CASUAL';
}