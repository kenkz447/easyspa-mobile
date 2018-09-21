import * as moment from 'moment';

export const toVNDay = (date: Date | moment.Moment | string) => {
    const dateMoment = moment(date);
    const day = dateMoment.get('day');
    switch (day) {
        case 0:
            return 'Chủ nhật';
        case 1:
            return 'Thứ hai';
        case 2:
            return 'Thứ ba';
        case 3:
            return 'Thứ tư';
        case 4:
            return 'Thứ năm';
        case 5:
            return 'Thứ sáu';
        case 6:
        default:
            return 'Thứ bảy';
    }
};

export const formatDate = (date: Date | moment.Moment | string, format: string) => {
    const dateMoment = moment(date);
    return dateMoment.format(format);
};

export const dateSortAsc = function (date1: Date, date2: Date) {
    if (date1 > date2) {
        return 1;
    }
    if (date1 < date2) {
        return -1;
    }
    return 0;
};

export const dateSortDesc = function (date1: Date, date2: Date) {
    if (date1 > date2) {
        return -1;
    }
    if (date1 < date2) {
        return 1;
    }
    return 0;
};

export const enumerateDaysBetweenDates = (startDate: moment.Moment, endDate: moment.Moment) => {
    const now = startDate.clone();
    const dates: moment.Moment[] = [];

    while (now.isSameOrBefore(endDate)) {
        const nextDate = now.clone();
        dates.push(nextDate);
        now.add(1, 'days');
    }
    return dates;
};

export const twoDateIsEqual = (date1: Date | moment.Moment, date2: Date | moment.Moment, format: string) => {
    const date1Moment = moment(date1);
    const date2Moment = moment(date2);

    return date1Moment.format(format) === date2Moment.format(format);
};

export const isToday = (date: Date | moment.Moment) => {
    return twoDateIsEqual(date, new Date(), 'DD/MM/YYYY');
};