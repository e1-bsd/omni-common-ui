import moment from 'domain/moment';
import Notification from './model';

const reviver = ([key, val]) => {
  if (! val) return [key, val];
  switch (key) {
    case 'timestamp':
    case 'notedDateTimeUtc':
      return ['moment', moment(val)];
    default:
      return [key, val];
  }
};

const create = (data) => new Notification(data).mapEntries(reviver);

export default create;
