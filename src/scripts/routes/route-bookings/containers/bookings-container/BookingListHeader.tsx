import { SegmentedControl } from 'antd-mobile';
import * as React from 'react';

import { withAppContext } from '@/app';
import { DomainContext } from '@/domain';
import { AppointmentStatus, AppointmentStatusTitle, Booking } from '@/restful';

export interface BookingListHeaderProps extends
    Pick<DomainContext, 'history'> {
    readonly currentSearchStatus?: AppointmentStatus;
}

@withAppContext<DomainContext>('history')
export class BookingListHeader extends React.PureComponent<BookingListHeaderProps> {
    static readonly segmentedControlValues: Array<{
        readonly value: AppointmentStatus;
        readonly title: AppointmentStatusTitle;
    }> = [
            { title: 'Đang chờ', value: 'CONFIRMED' },
            { title: 'Đang làm', value: 'CHECKIN' },
            { title: 'Xong', value: 'CHECKOUT' }
        ];

    public render() {
        const { segmentedControlValues } = BookingListHeader;
        return (
            <div>
                <SegmentedControl
                    selectedIndex={this.getSelectedIndex()}
                    values={segmentedControlValues.map(o => o.title)}
                    onValueChange={this.onValueChange}
                />
            </div>
        );
    }

    private readonly getSelectedIndex = () => {
        const { currentSearchStatus } = this.props;
        const { segmentedControlValues } = BookingListHeader;
        const selectedIndex = segmentedControlValues.findIndex(o => o.value === currentSearchStatus);
        return selectedIndex >= 0 ? selectedIndex : 0;
    }

    private readonly onValueChange = (value: AppointmentStatusTitle) => {
        const { history } = this.props;

        let appPointmentStatus = this.getStatusByLabel(value);
        const queryKey = nameof<Booking>(o => o.appointmentStatus);
        history!.replace(`?${queryKey}=${appPointmentStatus}`);
    }

    private readonly getStatusByLabel = (label: AppointmentStatusTitle): Booking['appointmentStatus'] => {
        const item = BookingListHeader.segmentedControlValues.find(o => o.title === label);
        return item!.value;
    }
}