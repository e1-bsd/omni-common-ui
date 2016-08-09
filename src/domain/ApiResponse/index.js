import { Record } from 'immutable';
import { ApiResponseHelper } from 'domain/ApiResponseHelper';

export class ApiResponse extends Record({
  data: undefined,
  error: undefined,
  loading: false,
}) {
  shouldFetch() {
    return ApiResponseHelper.shouldFetch(this);
  }

  fetchWasCalled() {
    return ApiResponseHelper.fetchWasCalled(this);
  }

  isLoading() {
    return ApiResponseHelper.isLoading(this);
  }

  hasFailed() {
    return ApiResponseHelper.hasFailed(this);
  }

  hasSucceeded() {
    return ApiResponseHelper.hasSucceeded(this);
  }
}

export default ApiResponse;
