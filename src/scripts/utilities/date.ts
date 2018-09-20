import * as moment from 'moment';

export const toVNDay = (date: Date | string) => {
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

export const formatDate = (date: Date | string, format: string) => {
    const dateMoment = moment(date);
    return dateMoment.format(format);
};

export const dateSortAsc = function (date1: Date, date2: Date) {
    // This is a comparison function that will result in dates being sorted in
    // ASCENDING order. As you can see, JavaScript's native comparison operators
    // can be used to compare dates. This was news to me.
    if (date1 > date2) {
        return 1;
    }
    if (date1 < date2) {
        return -1;
    }
    return 0;
};

export const dateSortDesc = function (date1: Date, date2: Date) {
    // This is a comparison function that will result in dates being sorted in
    // DESCENDING order.
    if (date1 > date2) {
        return -1;
    }
    if (date1 < date2) {
        return 1;
    }
    return 0;
};