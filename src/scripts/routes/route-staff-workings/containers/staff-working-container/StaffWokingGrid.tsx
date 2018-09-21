import { Flex } from 'antd-mobile';
import * as React from 'react';
import styled from 'styled-components';

import { StaffWorkingScheduler } from '@/restful';
import {
    enumerateDaysBetweenDates,
    formatDate,
    getEndOf,
    getStartOf,
    toVNDay,
    twoDateIsEqual
} from '@/utilities';

const groupBy = require('lodash/groupBy');
const map = require('lodash/map');

const StaffWokingGridWrapper = styled.div`
    .am-flexbox {
        &-item {
            width: 100%;
            margin-left: 0;

        }
    }
`;

const Cell = styled.div`
    min-height: 60px;
    display: flex;
    justify-content:center;
    align-items: center;
    direction: column;
    text-align: center;
    width: 100%;
    &:nth-child(even) {
        background-color: #F9F9F9;
    }
    &:first-child {
        background-color: #EFEFF4;
    }
    &:not(:first-child) {
        border-right: 1px solid lightgray;
    }
`;

export interface StaffWokingGridProps {
    readonly date: Date;
    readonly staffWorkingSchedulers: StaffWorkingScheduler[];
}

export class StaffWokingGrid extends React.PureComponent<StaffWokingGridProps> {
    public render() {
        const groupWrokingSchedulers = this.groupWrokingSchedulerByText();
        const weekDates = this.getDatesFromStartAndEndOfWeek();

        return (
            <StaffWokingGridWrapper>
                <Flex>
                    <Flex.Item>
                        <Cell />
                        {weekDates.map((date, index) => {
                            return (
                                <Cell key={index}>
                                    <div>
                                        <strong className="text-black">{toVNDay(date)}</strong> <br />
                                        {formatDate(date, 'DD/MM/YYYY')}
                                    </div>
                                </Cell>
                            );
                        })}
                    </Flex.Item>
                    {
                        map(groupWrokingSchedulers, (staffWorkingSchedulers: StaffWorkingScheduler[], key) => {
                            return (
                                <Flex.Item key={key} className="w-100">
                                    <Cell>
                                        {key}
                                    </Cell>
                                    {
                                        weekDates.map((date, index) => {
                                            const dateHasWorking = staffWorkingSchedulers.find(o => {
                                                const schedulerDate = new Date(o.workingTimeStarted);
                                                return twoDateIsEqual(
                                                    date,
                                                    schedulerDate,
                                                    'DD/MM/YYY'
                                                );
                                            });

                                            return (
                                                <Cell key={index}>
                                                    {
                                                        dateHasWorking ?
                                                            <img src="/static/assets/check.png" /> :
                                                            null
                                                    }
                                                </Cell>
                                            );
                                        })
                                    }
                                </Flex.Item>
                            );
                        })
                    }
                </Flex>
            </StaffWokingGridWrapper>
        );
    }

    private readonly groupWrokingSchedulerByText = (): {
        readonly [key: string]: StaffWorkingScheduler[];
    } => {
        const { staffWorkingSchedulers } = this.props;

        return groupBy(
            staffWorkingSchedulers,
            nameof<StaffWorkingScheduler>(o => o.scheduleText)
        );
    }

    private readonly getDatesFromStartAndEndOfWeek = () => {
        const { date } = this.props;

        const start = getStartOf(date, 'week');
        const end = getEndOf(date, 'week');

        return enumerateDaysBetweenDates(start, end);
    }
}