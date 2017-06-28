import Immutable from 'immutable';

const NotificationRecord = Immutable.Record({
  blurb: undefined,
  moment: undefined,
  getNotificationViewNode: undefined,
});

export default class Notification extends NotificationRecord { }
