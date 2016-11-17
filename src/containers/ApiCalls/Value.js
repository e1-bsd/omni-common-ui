import { Record } from 'immutable';

const STATE_LOADING = 'loading';
const STATE_SUCCEEDED = 'succeeded';
const STATE_FAILED = 'failed';

class NotAnInstanceOfApiCallValue extends Error { }

class ApiCallValue extends Record({
  status: undefined,
  error: undefined,
}) {
  static createSucceeded() {
    return new ApiCallValue({ status: STATE_SUCCEEDED });
  }

  static createFailed(error) {
    return new ApiCallValue({
      status: STATE_FAILED,
      error,
    });
  }

  static createLoading() {
    return new ApiCallValue({ status: STATE_LOADING });
  }

  static isLoading(value) {
    if (! (value instanceof ApiCallValue)) {
      throw new NotAnInstanceOfApiCallValue();
    }

    return value.status === STATE_LOADING;
  }

  static hasSucceeded(value) {
    if (! (value instanceof ApiCallValue)) {
      throw new NotAnInstanceOfApiCallValue();
    }

    return value.status === STATE_SUCCEEDED;
  }

  static hasFailed(value) {
    if (! (value instanceof ApiCallValue)) {
      throw new NotAnInstanceOfApiCallValue();
    }

    return value.status === STATE_FAILED;
  }
}

export default ApiCallValue;
