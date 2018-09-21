import { Resource, ResourceType } from 'react-restful';

import { apiEntry, restfulStore } from '@/restful/environments';

import { Staff } from './staff';

export interface StaffWorkingScheduler {
    readonly created: string;
    readonly updated: string;
    readonly id: number;
    readonly workingTimeStartedHour: number;
    readonly workingTimeStartedMinute: number;
    readonly workingTimeEndedHour: number;
    readonly workingTimeEndedMinute: number;
    readonly workingTimeEnded: string;
    readonly workingTimeStarted: string;
    readonly day: number;
    readonly year: number;
    readonly month: number;
    readonly validFrom: string;
    readonly validTo: string;
    readonly spaId: number;
    readonly spaBranchId: number;
    readonly staff: Staff;
    readonly staffWorkingScheduleStatus: 'OT' | 'NORMAL' | 'OFF';
    readonly scheduleText: string;
}

export const StaffWorkingSchedulerResourceType = new ResourceType<StaffWorkingScheduler>({
    store: restfulStore,
    name: nameof<StaffWorkingScheduler>(),
    schema: [{
        type: 'PK',
        field: 'id'
    }]
});

export interface GetStaffWorkingSchedulerPayload {
    readonly fromTime: string;
    readonly toTime: string;
    readonly workingScheduleStatus?: StaffWorkingScheduler['staffWorkingScheduleStatus'];
}

export const staffWorkingSchedulerResources = {
    getBySpaBranch: new Resource<{ readonly content: StaffWorkingScheduler[] }>({
        resourceType: StaffWorkingSchedulerResourceType,
        url: apiEntry('/employeeservice/api/staff-working-schedules/spa-branch/:spaBranchId'),
        method: 'POST',
        mapDataToStore: (response, resourceType, store) => {
            for (const staffWorkingScheduler of response.content) {
                store.mapRecord(resourceType, staffWorkingScheduler);
            }
        }
    }),
    getByStaff: new Resource<{ readonly content: StaffWorkingScheduler[] }>({
        resourceType: StaffWorkingSchedulerResourceType,
        url: apiEntry('/employeeservice/api/staff-working-schedules/staff/:id'),
        method: 'POST',
        mapDataToStore: (response, resourceType, store) => {
            for (const staffWorkingScheduler of response.content) {
                store.mapRecord(resourceType, staffWorkingScheduler);
            }
        }
    })
};