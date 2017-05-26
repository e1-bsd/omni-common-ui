'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _reactRedux = require('react-redux');

var _reduxOidc = require('redux-oidc');

var _reactRouterRedux = require('react-router-redux');

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleSignOnCallback = function SingleSignOnCallback(props) {
  _log2.default.debug('SingleSignOnCallback - called!');
  return _react2.default.createElement(_reduxOidc.CallbackComponent, { successCallback: successCallback, errorCallback: errorCallback });

  function successCallback() {
    _log2.default.debug('SingleSignOnCallback - lastUrlPath', sessionStorage.lastUrlPath);
    redirect();
  }

  function errorCallback(error) {
    _log2.default.error('SingleSignOnCallback - errorCallback', error);
    redirect();
  }

  function redirect() {
    props.dispatch((0, _reactRouterRedux.replace)(sessionStorage.lastUrlPath || ''));
  }
};

SingleSignOnCallback.propTypes = {
  dispatch: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactRedux.connect)()((0, _pure2.default)(SingleSignOnCallback));
//# sourceMappingURL=SingleSignOnCallback.js.map
