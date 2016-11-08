import Immutable from 'immutable';
import is from 'is_js';

const ApiCallKeyRecord = Immutable.Record({
  id: undefined,
  type: undefined,
});

class ApiCallKey extends ApiCallKeyRecord {
  static create(...args) {
    return new ApiCallKey(getParams(args));
  }
}

function getParams(args) {
  if (is.object(args[0])) {
    return { type: args[0].type, id: args[0].id };
  }

  return { type: args[0], id: args[1] };
}

export default ApiCallKey;
