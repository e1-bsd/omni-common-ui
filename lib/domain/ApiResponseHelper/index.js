'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiResponseHelper = undefined;

var _ApiResponse = require('./../ApiResponse');

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isApiResponse = function isApiResponse(apiResponse) {
  return _is_js2.default.object(apiResponse) && apiResponse instanceof _ApiResponse.ApiResponse;
};

var isLoading = function isLoading(apiResponse) {
  return isApiResponse(apiResponse) && apiResponse.loading === true;
};

var hasFailed = function hasFailed(apiResponse) {
  return isApiResponse(apiResponse) && apiResponse.error instanceof Error;
};

var hasSucceeded = function hasSucceeded(apiResponse) {
  return isApiResponse(apiResponse) && _is_js2.default.not.undefined(apiResponse.data);
};

var fetchWasCalled = function fetchWasCalled(apiResponse) {
  return isLoading(apiResponse) || hasFailed(apiResponse) || hasSucceeded(apiResponse);
};

var shouldFetch = function shouldFetch(apiResponse) {
  return !fetchWasCalled(apiResponse);
};

var create = function create(apiResponse) {
  if (apiResponse instanceof _ApiResponse.ApiResponse) {
    return apiResponse;
  }

  if (apiResponse instanceof Error) {
    return new _ApiResponse.ApiResponse({ error: apiResponse });
  }

  if (_is_js2.default.undefined(apiResponse)) {
    return new _ApiResponse.ApiResponse();
  }

  if (_is_js2.default.object(apiResponse) && Object.keys(apiResponse).length === 1) {
    var key = Object.keys(apiResponse)[0];
    if (key === 'loading') {
      return new _ApiResponse.ApiResponse({ loading: apiResponse.loading === true });
    }

    if (key === 'error') {
      if (_is_js2.default.undefined(apiResponse.error) || apiResponse.error instanceof Error) {
        return new _ApiResponse.ApiResponse({ error: apiResponse.error });
      }

      return new _ApiResponse.ApiResponse({ error: new Error(apiResponse.error) });
    }

    if (key === 'data') {
      return new _ApiResponse.ApiResponse({ data: apiResponse.data });
    }
  }

  return new _ApiResponse.ApiResponse({ data: apiResponse });
};

var responsify = create;

var ApiResponseHelper = exports.ApiResponseHelper = {
  shouldFetch: shouldFetch,
  fetchWasCalled: fetchWasCalled,
  isLoading: isLoading,
  hasFailed: hasFailed,
  hasSucceeded: hasSucceeded,
  create: create,
  responsify: responsify
};

exports.default = ApiResponseHelper;
//# sourceMappingURL=index.js.map
