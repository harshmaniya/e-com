import moment from 'moment';

export const DateFormatter = (timestamp) => {
    const time = moment(Number(timestamp)).format('MMMM Do YYYY, h:mm a')
    return time;
}