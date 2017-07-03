'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

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

var REQUIRED_ARGS_COUNT = 3;

var createApiActionCreator = function createApiActionCreator(actionObjectName, url) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  var requestExtras = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var successExtras = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var failureExtras = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  return (// these are optional!

    function (dispatch) {
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
        return _ApiCalls2.default.createAction(_extends({
          type: type, url: url, method: method, payload: (0, _Api.fetch)(url) }, requestExtras));
      }

      function createFetchSuccessAction(response) {
        var type = '' + prefix + upperActionObjectName + '_SUCCESS';
        return _ApiCalls2.default.createAction(_extends({
          type: type, url: url, method: method, payload: response }, successExtras));
      }

      function createFetchFailureAction(error) {
        var type = '' + prefix + upperActionObjectName + '_FAILURE';
        return _ApiCalls2.default.createAction(_extends({
          type: type, url: url, method: method, error: error }, failureExtras));
      }
    }
  );
};

var curried = function curried() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length >= REQUIRED_ARGS_COUNT) {
    return createApiActionCreator.apply(undefined, args);
  }
  if (args.length === 1 && _is_js2.default.object(args[0])) {
    // allow first arg to be an options hash
    var options = args[0];
    return createApiActionCreator.call(undefined, options.actionObjectName, options.url, options.method, options.requestExtras, options.successExtras, options.failureExtras);
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
