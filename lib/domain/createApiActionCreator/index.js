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
 * const createCreatorForX = createApiActionCreator('NOTIFICATION', 'http://...');
 * const getXActionCreator = createCreatorForX('GET');
 * const postXActionCreator = createCreatorForX('POST');
 * ```
 */

var createApiActionCreator = function createApiActionCreator(actionObjectName, url) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  return function (dispatch) {
    var prefix = function () {
      switch (method.toUpperCase()) {
        case 'DELETE':
          return 'DELETE_';
        case 'POST':case 'PUT':
          return 'SUBMIT_';
        case 'GET':default:
          return 'FETCH_';
      }
    }();

    var upperActionObjectName = actionObjectName.toUpperCase();

    return dispatch(createFetchRequestAction()).payload.then(function (response) {
      return dispatch(createFetchSuccessAction(response));
    }).catch(function (error) {
      return dispatch(createFetchFailureAction(error));
    });

    function createFetchRequestAction() {
      var type = '' + prefix + upperActionObjectName + '_REQUEST';
      return _ApiCalls2.default.createAction({
        type: type, url: url, method: method, payload: (0, _Api.fetch)(url)
      });
    }

    function createFetchSuccessAction(response) {
      var type = '' + prefix + upperActionObjectName + '_SUCCESS';
      return _ApiCalls2.default.createAction({
        type: type, url: url, method: method, payload: response
      });
    }

    function createFetchFailureAction(error) {
      var type = '' + prefix + upperActionObjectName + '_FAILURE';
      return _ApiCalls2.default.createAction({
        type: type, url: url, method: method, error: error
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
