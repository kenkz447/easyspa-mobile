import { Facility } from './facility';

export interface FacilityArea {
    readonly id?: string;
    readonly name: string;
    readonly slug: string;
    readonly spaBranchId: number;
    readonly spaId: number;
    readonly status: string;
    readonly facilities?: Facility[];
}