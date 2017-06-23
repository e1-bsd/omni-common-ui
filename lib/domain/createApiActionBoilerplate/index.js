'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApiActionBoilerplate = createApiActionBoilerplate;

var _Api = require('./../Api');

var _ApiCalls = require('./../../containers/ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createApiActionBoilerplate(requestActionType, successActionType, failureActionType) {
  return function actionCreator(url) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';

    return function (dispatch) {
      return dispatch(fetchNotificationsRequest()).payload.then(function (response) {
        return dispatch(fetchNotificationsSuccess(response));
      }).catch(function (error) {
        return dispatch(fetchNotificationsFailure(error));
      });

      function fetchNotificationsRequest() {
        return _ApiCalls2.default.createAction({
          type: requestActionType,
          payload: (0, _Api.fetch)(url),
          url: url,
          method: method
        });
      }

      function fetchNotificationsSuccess(response) {
        return _ApiCalls2.default.createAction({
          type: successActionType,
          payload: response,
          url: url,
          method: method
        });
      }

      function fetchNotificationsFailure(error) {
        return _ApiCalls2.default.createAction({
          type: failureActionType,
          error: error,
          url: url,
          method: method
        });
      }
    };
  };
}

exports.default = createApiActionBoilerplate;
//# sourceMappingURL=index.js.map
