import { Moment, unitOfTime } from 'moment';
import * as moment from 'moment';

export const getStartOf = (date: Date, unit: unitOfTime.StartOf) => {
    let dateMoment: Moment;
    dateMoment = moment(date);

    return dateMoment.clone().startOf(unit);
};

export const getEndOf = (date: Date, unit: unitOfTime.StartOf) => {
    let dateMoment: Moment;
    dateMoment = moment(date);

    return dateMoment.clone().endOf(unit);
};