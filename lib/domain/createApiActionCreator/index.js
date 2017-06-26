'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Api = require('./../Api');

var _ApiCalls = require('./../../containers/ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Supports currying so that args can be recycled more conveniently.
 * A contrived example:
 * ```
 * const createCreatorForX =
 *    createApiActionCreator('X_REQUEST', 'X_SUCCESS', 'X_FAILURE', 'http://...');
 * const getXActionCreator = createCreatorForX('GET');
 * const postXActionCreator = createCreatorForX('POST');
 * ```
 */

var createApiActionCreator = function createApiActionCreator(requestActionType, successActionType, failureActionType, url, method) {
  return function (dispatch) {
    return dispatch(createFetchRequestAction()).payload.then(function (response) {
      return dispatch(createFetchSuccessAction(response));
    }).catch(function (error) {
      return dispatch(createFetchFailureAction(error));
    });

    function createFetchRequestAction() {
      return _ApiCalls2.default.createAction({
        type: requestActionType,
        payload: (0, _Api.fetch)(url),
        url: url,
        method: method
      });
    }

    function createFetchSuccessAction(response) {
      return _ApiCalls2.default.createAction({
        type: successActionType,
        payload: response,
        url: url,
        method: method
      });
    }

    function createFetchFailureAction(error) {
      return _ApiCalls2.default.createAction({
        type: failureActionType,
        error: error,
        url: url,
        method: method
      });
    }
  };
};

var curried = function curried() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length >= createApiActionCreator.length) {
    return createApiActionCreator.apply(undefined, args);
  }
  return function () {
    for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      rest[_key2] = arguments[_key2];
    }

    return curried.apply(undefined, args.concat(rest));
  };
};

exports.default = curried;
//# sourceMappingURL=index.js.map
