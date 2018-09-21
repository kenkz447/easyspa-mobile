import { SegmentedControl } from 'antd-mobile';
import * as React from 'react';

import { withAppContext } from '@/app';
import { DomainContext } from '@/domain';
import { AppointmentStatus, Booking } from '@/restful';

export interface CashierBookingListHeaderProps extends
    Pick<DomainContext, 'history'> {
    readonly paid?: boolean;
}

@withAppContext<DomainContext>('history')
export class CashierBookingListHeader extends React.PureComponent<CashierBookingListHeaderProps> {
    static readonly segmentedControlValues: Array<{
        readonly value: boolean;
        readonly title: string;
    }> = [
            { title: 'Chưa thanh toán', value: false },
            { title: 'Đã thanh toán', value: true }
        ];

    public render() {
        const { segmentedControlValues } = CashierBookingListHeader;
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
        const { paid } = this.props;
        const { segmentedControlValues } = CashierBookingListHeader;
        const selectedIndex = segmentedControlValues.findIndex(o => o.value === paid);
        return selectedIndex >= 0 ? selectedIndex : 0;
    }

    private readonly onValueChange = (value) => {
        const { history } = this.props;

        let appPointmentStatus = this.getStatusByLabel(value);
        const queryKey = 'paid';
        history!.replace(`?${queryKey}=${appPointmentStatus}`);
    }

    private readonly getStatusByLabel = (label): boolean => {
        const item = CashierBookingListHeader.segmentedControlValues.find(o => o.title === label);
        return item!.value;
    }
}