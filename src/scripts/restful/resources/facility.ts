import { FacilityArea } from './facility-area';
import { ServiceCategory } from './service-category';

export interface Facility {
    readonly id?: number;
    readonly name: string;
    readonly facilityArea: FacilityArea;
    readonly spaBranchId: number;
    readonly spaId: number;
    readonly serviceCategories?: Array<ServiceCategory>;
    readonly status?: 'ENABLE' | 'DISABLE' | 'DELETED';
    readonly priority?: number;
}