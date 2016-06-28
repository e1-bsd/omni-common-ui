import momentLib from 'moment';

export const API_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
export const moment = (date) => momentLib(date, API_DATE_FORMAT);

export default moment;
