import { Record } from 'immutable';

const STATE_LOADING = 'loading';
const STATE_SUCCEEDED = 'succeeded';
const STATE_FAILED = 'failed';

export class NotAnInstanceOfApiCallValue extends Error { }

class ApiStateRecord extends Record({
  status: undefined,
  error: undefined,
  timestamp: undefined,
  id: undefined,
  disableDefault: undefined,
}) {
  constructor(values = {}) {
    super(Object.assign({},
        values,
        { disableDefault: !! values.disableDefault },
        { timestamp: new Date() }));
  }
}

export default class ApiState {
  static createSucceeded(id) {
    return new ApiStateRecord({ id, status: STATE_SUCCEEDED });
  }

  static createFailed(id, error, { disableDefault } = {}) {
    return new ApiStateRecord({
      id,
      status: STATE_FAILED,
      error,
      disableDefault,
    });
  }

  static createLoading(id, { disableDefault } = {}) {
    return new ApiStateRecord({ id, status: STATE_LOADING, disableDefault });
  }

  static isValue(value) {
    return value instanceof ApiStateRecord;
  }

  static isLoading(value) {
    if (! ApiState.isValue(value)) {
      throw new NotAnInstanceOfApiCallValue();
    }

    return value.status === STATE_LOADING;
  }

  static hasSucceeded(value) {
    if (! ApiState.isValue(value)) {
      throw new NotAnInstanceOfApiCallValue();
    }

    return value.status === STATE_SUCCEEDED;
  }

  static hasFailed(value) {
    if (! ApiState.isValue(value)) {
      throw new NotAnInstanceOfApiCallValue();
    }

    return value.status === STATE_FAILED;
  }

  static shouldPerform(state) {
    if (! ApiState.isValue(state)) {
      return true;
    }

    return ! ApiState.isLoading(state) &&
        ! ApiState.hasSucceeded(state) &&
        ! ApiState.hasFailed(state);
  }

  static getTimestamp(state) {
    state.get('timestamp');
  }
}
