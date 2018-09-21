import { Card, Flex, List, SearchBar } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { withAppContext } from '@/app';
import { DomainContext } from '@/domain';
import { StaffWorkingScheduler } from '@/restful';
import {
    getStaffWokingsUrl
} from '@/routes/route-staff-workings/RouteStaffWorkingsInfo';

const ScheduleTextTag = styled.span`
    border-radius: 20px;
    color: white;
    font-size: 14px;
    padding: 3px 10px;
    display: inline-block;
    background: #F52D56;
`;

export interface WokingSchedulerListProps extends
    Pick<DomainContext, 'history'> {
    readonly workingSchedulers: StaffWorkingScheduler[];
}

export interface WokingSchedulerListState {
    readonly searchTerm?: string;
}

@withAppContext<DomainContext>('history')
export class WokingSchedulerList extends React.PureComponent<WokingSchedulerListProps, WokingSchedulerListState> {
    readonly state: WokingSchedulerListState = {};

    public render() {
        const { history } = this.props;
        const workingSchedulers = this.getWorkingSchedulers();

        return (
            <React.Fragment>
                <SearchBar
                    placeholder="Search"
                    maxLength={8}
                    cancelText="Xóa"
                    onChange={(value: string) =>
                        this.setState({
                            searchTerm: value ? value.toLowerCase() : value
                        })
                    }
                />
                <List>
                    {workingSchedulers.map(o => {
                        const staffSorkingsUrl = getStaffWokingsUrl({
                            staffId: String(o.staff.id)
                        });

                        return (
                            <List.Item
                                key={o.id}
                                extra={<ScheduleTextTag>{o.scheduleText}</ScheduleTextTag>}
                                onClick={() => history!.push(staffSorkingsUrl)}
                            >
                                {o.staff.name}
                                <List.Item.Brief>
                                    {o.staff.staffType}
                                </List.Item.Brief>
                            </List.Item>
                        );
                    })}
                </List>
            </React.Fragment>
        );
    }

    readonly getWorkingSchedulers = () => {
        const { workingSchedulers } = this.props;
        const { searchTerm } = this.state;
        if (searchTerm) {
            return workingSchedulers.filter(o => {
                if (
                    o.staff.name.toLowerCase().includes(searchTerm) ||
                    o.scheduleText.toLowerCase().includes(searchTerm)
                ) {
                    return true;
                }

                return false;
            });
        }

        return workingSchedulers;
    }
}
