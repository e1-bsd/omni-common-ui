import { ApiResponse } from 'domain/ApiResponse';
import is from 'is_js';

const isApiResponse = (apiResponse) => is.object(apiResponse) &&
    apiResponse instanceof ApiResponse;

const isLoading = (apiResponse) => isApiResponse(apiResponse) && apiResponse.loading === true;

const hasFailed = (apiResponse) => isApiResponse(apiResponse) &&
    apiResponse.error instanceof Error;

const hasSucceeded = (apiResponse) => isApiResponse(apiResponse) &&
    is.not.undefined(apiResponse.data);

const fetchWasCalled = (apiResponse) => isLoading(apiResponse) ||
    hasFailed(apiResponse) ||
    hasSucceeded(apiResponse);

const shouldFetch = (apiResponse) => ! fetchWasCalled(apiResponse);

const create = (apiResponse) => {
  if (apiResponse instanceof ApiResponse) {
    return apiResponse;
  }

  if (apiResponse instanceof Error) {
    return new ApiResponse({ error: apiResponse });
  }

  if (is.undefined(apiResponse)) {
    return new ApiResponse();
  }

  if (is.object(apiResponse) && Object.keys(apiResponse).length === 1) {
    const key = Object.keys(apiResponse)[0];
    if (key === 'loading') {
      return new ApiResponse({ loading: apiResponse.loading === true });
    }

    if (key === 'error') {
      if (is.undefined(apiResponse.error) || apiResponse.error instanceof Error) {
        return new ApiResponse({ error: apiResponse.error });
      }

      return new ApiResponse({ error: new Error(apiResponse.error) });
    }

    if (key === 'data') {
      return new ApiResponse({ data: apiResponse.data });
    }
  }

  return new ApiResponse({ data: apiResponse });
};

const responsify = create;

export const ApiResponseHelper = {
  shouldFetch,
  fetchWasCalled,
  isLoading,
  hasFailed,
  hasSucceeded,
  create,
  responsify,
};

export default ApiResponseHelper;
