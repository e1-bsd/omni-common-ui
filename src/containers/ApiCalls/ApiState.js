import { Record } from 'immutable';

const STATE_LOADING = 'loading';
const STATE_SUCCEEDED = 'succeeded';
const STATE_FAILED = 'failed';

export class NotAnInstanceOfApiCallValue extends Error { }

class ApiStateRecord extends Record({
  status: undefined,
  error: undefined,
}) { }

export default class ApiState {
  static createSucceeded() {
    return new ApiStateRecord({ status: STATE_SUCCEEDED });
  }

  static createFailed(error) {
    return new ApiStateRecord({
      status: STATE_FAILED,
      error,
    });
  }

  static createLoading() {
    return new ApiStateRecord({ status: STATE_LOADING });
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
}