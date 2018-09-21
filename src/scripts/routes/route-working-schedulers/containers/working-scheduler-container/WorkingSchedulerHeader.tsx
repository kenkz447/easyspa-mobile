import { Flex } from 'antd-mobile';
import { Moment } from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import { withAppContext } from '@/app';
import { DomainContext } from '@/domain';
import {
    enumerateDaysBetweenDates,
    getEndOf,
    getStartOf,
    isToday,
    twoDateIsEqual
} from '@/utilities';

interface SchedulerDateProps {
    readonly isToday?: boolean;
    readonly selected?: boolean;
}

const SchedulerDate: React.ComponentType<SchedulerDateProps> = styled.div`
    background: ${(props: SchedulerDateProps) => props.selected ? '#4990E2' : ''};
    color: ${(props: SchedulerDateProps) =>
        props.selected ?
            '#fff' :
            (props.isToday ? '#4990E2' : '#000')
    };
    font-weight: bold;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    margin: 0 auto;
`;

export interface WorkingSchedulerHeaderProps extends Pick<DomainContext, 'history'> {
    readonly date: Date;
}

@withAppContext<DomainContext>('history')
export class WorkingSchedulerHeader extends React.PureComponent<WorkingSchedulerHeaderProps> {
    public render() {
        const { date } = this.props;
        const datesFromStartAndEndOfWeek = this.getDatesFromStartAndEndOfWeek();
        return (
            <Flex>
                {
                    datesFromStartAndEndOfWeek.map((weekDate, i) => {
                        const isSelected = twoDateIsEqual(date, weekDate, 'DD/MM/YYYY');
                        const isDateToday = isToday(weekDate);
                        return (
                            <Flex.Item key={i}>
                                <div
                                    style={{ textAlign: 'center' }}
                                    onClick={() => this.onDateClick(weekDate)}
                                >
                                    <div>{weekDate.get('day')}</div>
                                    <SchedulerDate
                                        selected={isSelected}
                                        isToday={isDateToday}
                                    >
                                        <strong>
                                            {weekDate.get('date')}
                                        </strong>
                                    </SchedulerDate> 
                                </div>
                            </Flex.Item>
                        );
                    })
                }
            </Flex>
        );
    }

    private readonly getDatesFromStartAndEndOfWeek = () => {
        const { date } = this.props;

        const start = getStartOf(date, 'week');
        const end = getEndOf(date, 'week');

        return enumerateDaysBetweenDates(start, end);
    }

    private readonly onDateClick = (date: Moment) => {
        const { history } = this.props;
        history!.replace(`?date=${date.format('DD/MM/YYYY')}`);
    }
}