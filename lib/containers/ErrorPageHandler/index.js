'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorPageHandler = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.mapStateToProps = mapStateToProps;

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ErrorPage = require('./../../components/ErrorPage');

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _connect = require('./../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _ApiCalls = require('./../ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

var _ErrorPageConfig = require('./../../domain/ErrorPageConfig');

var _ErrorPageConfig2 = _interopRequireDefault(_ErrorPageConfig);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _AlertDialog = require('./../../components/AlertDialog');

var _AlertDialog2 = _interopRequireDefault(_AlertDialog);

var _ErrorMessage = require('./../../domain/ErrorMessage');

var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _userManager = require('./../SingleSignOn/userManager');

var _userManager2 = _interopRequireDefault(_userManager);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorPageHandler = exports.ErrorPageHandler = function ErrorPageHandler(props) {
  var children = props.children,
      config = props.config,
      erroredApis = props.erroredApis,
      erroredApi = props.erroredApi,
      clean = props.clean;

  var cleanErrors = function cleanErrors() {
    return erroredApis.forEach(function (api) {
      return clean(api.id);
    });
  };

  return _react2.default.createElement(
    'div',
    { className: _style2.default.ErrorPageHandler },
    renderError(),
    renderChildren()
  );

  function renderError() {
    if (!erroredApi) {
      return null;
    }

    if (erroredApi.error && erroredApi.error.status === 401) {
      setLastUrlPath();
      _userManager2.default.forceSignoutRedirect();
      throw new Error('Api called with 401 unauthorized');
    }

    if (shouldShowPopUp()) {
      var response = erroredApi.error.response;

      return _react2.default.createElement(_AlertDialog2.default, { isWarning: true,
        content1: buildMessage(response),
        okButtonContent: 'OK',
        onButtonClick: cleanErrors });
    }

    return _react2.default.createElement(_ErrorPage2.default, _extends({ erroredApi: erroredApi,
      config: config,
      afterButtonClicked: cleanErrors
    }, props));
  }

  function setLastUrlPath() {
    sessionStorage.lastUrlPath = location.pathname + location.search;
  }

  function renderChildren() {
    if (erroredApi && !shouldShowPopUp()) {
      return null; // Because the error page will be rendered.
    }

    return children;
  }

  function shouldShowPopUp() {
    if (_Config2.default.get('errorHandlerRendersPopUps') !== true || !erroredApi) {
      return false;
    }

    var _erroredApi$error = erroredApi.error,
        response = _erroredApi$error.response,
        status = _erroredApi$error.status;

    return _is_js2.default.object(response) && status !== 500;
  }

  function buildMessage(response) {
    var message = _ErrorMessage2.default.for(response.errorCode) || response.message;

    // To handle the pattern of exception response from the end point of identity server
    // which return { error: string }
    if (!message && response.error) {
      message = response.error;
      return message;
    }

    if (_is_js2.default.not.array(response.args)) {
      return message;
    }

    response.args.forEach(function (arg) {
      message = message.replace(/{".*"}/i, arg);
    });

    return message;
  }
};

ErrorPageHandler.propTypes = {
  children: _propTypes2.default.node,
  replace: _propTypes2.default.func.isRequired,
  clean: _propTypes2.default.func.isRequired,
  erroredApis: _propTypes2.default.object,
  erroredApi: _propTypes2.default.object,
  config: _propTypes2.default.object
};

function mapStateToProps(state, _ref) {
  var routes = _ref.routes;

  var erroredApis = getApiErrors(state);
  var erroredApi = getApiError(erroredApis);
  return { erroredApis: erroredApis, erroredApi: erroredApi, config: _ErrorPageConfig2.default.get(routes) };
}

function mapDispatchToProps(dispatch) {
  return { clean: function clean(key) {
      return dispatch(_ApiCalls2.default.clean(key));
    } };
}

function getApiErrors(state) {
  return _ApiCalls2.default.getErrors(state).toList();
}

function getApiError(erroredApis) {
  if (erroredApis.size <= 0) {
    return undefined;
  }

  return erroredApis.first();
}

exports.default = (0, _connect2.default)(mapStateToProps, mapDispatchToProps)(ErrorPageHandler);
//# sourceMappingURL=index.js.map
