import Immutable from 'immutable';

const ApiCallKeyRecord = Immutable.Record({
  id: undefined,
  type: undefined,
});

class ApiCallKey extends ApiCallKeyRecord { }

export default ApiCallKey;
