import Immutable, { List } from 'immutable';

const PrivilegesRecord = Immutable.Record({
  didInvalidate: false,
  items: undefined,
});

class Privileges extends PrivilegesRecord { }

Privileges.create = (data) => new Privileges(data)
    .update('items', (items) => new List(items));

export default Privileges;
