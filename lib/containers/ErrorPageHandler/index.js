'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorPageHandler = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _ErrorPage = require('./../../components/ErrorPage');

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _connect = require('./../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _ApiCalls = require('./../ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

var _ErrorPageConfig = require('./../../domain/ErrorPageConfig');

var _ErrorPageConfig2 = _interopRequireDefault(_ErrorPageConfig);

var _AlertDialog = require('./../../components/AlertDialog');

var _AlertDialog2 = _interopRequireDefault(_AlertDialog);

var _ErrorMessage = require('./../../domain/ErrorMessage');

var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorPageHandler = exports.ErrorPageHandler = function (_PureComponent) {
  _inherits(ErrorPageHandler, _PureComponent);

  function ErrorPageHandler(props) {
    _classCallCheck(this, ErrorPageHandler);

    var _this = _possibleConstructorReturn(this, (ErrorPageHandler.__proto__ || Object.getPrototypeOf(ErrorPageHandler)).call(this, props));

    _this._shouldShowPopUp = _this._shouldShowPopUp.bind(_this);
    _this._buildMessage = _this._buildMessage.bind(_this);
    _this._cleanErrors = _this._cleanErrors.bind(_this);
    _this._renderChildren = _this._renderChildren.bind(_this);
    _this._renderError = _this._renderError.bind(_this);
    return _this;
  }

  _createClass(ErrorPageHandler, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(_ref) {
      var nextPath = _ref.location.pathname;
      var pathname = this.props.location.pathname;

      if (pathname !== nextPath) {
        // page changed, clear errors
        this._cleanErrors();
      }
    }
  }, {
    key: '_shouldShowPopUp',
    value: function _shouldShowPopUp() {
      var erroredApi = this.props.erroredApi;


      if (_Config2.default.get('errorHandlerRendersPopUps') !== true || !erroredApi) {
        return false;
      }

      var _erroredApi$error = erroredApi.error,
          response = _erroredApi$error.response,
          status = _erroredApi$error.status;

      return _is_js2.default.object(response) && status !== 500;
    }
  }, {
    key: '_buildMessage',
    value: function _buildMessage() {
      var response = this.props.erroredApi.error.response;


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
  }, {
    key: '_cleanErrors',
    value: function _cleanErrors() {
      var _props = this.props,
          erroredApis = _props.erroredApis,
          clean = _props.clean;

      erroredApis.forEach(function (api) {
        return clean(api.id);
      });
    }
  }, {
    key: '_renderChildren',
    value: function _renderChildren() {
      var _props2 = this.props,
          erroredApi = _props2.erroredApi,
          children = _props2.children;


      if (erroredApi && !this._shouldShowPopUp()) {
        return null; // Because the error page will be rendered.
      }

      return children;
    }
  }, {
    key: '_renderError',
    value: function _renderError() {
      var _props3 = this.props,
          erroredApi = _props3.erroredApi,
          config = _props3.config;


      if (!erroredApi) {
        return null;
      }

      if (this._shouldShowPopUp()) {
        return _react2.default.createElement(_AlertDialog2.default, { isWarning: true,
          content1: this._buildMessage(),
          okButtonContent: 'OK',
          onButtonClick: this._cleanErrors });
      }

      return _react2.default.createElement(_ErrorPage2.default, _extends({ erroredApi: erroredApi,
        config: config
      }, this.props));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _style2.default.ErrorPageHandler },
        this._renderError(),
        this._renderChildren()
      );
    }
  }]);

  return ErrorPageHandler;
}(_react.PureComponent);

ErrorPageHandler.propTypes = {
  config: _propTypes2.default.object,
  erroredApis: _propTypes2.default.shape({
    size: _propTypes2.default.string.func,
    first: _propTypes2.default.string.func,
    forEach: _propTypes2.default.string.func
  }),
  erroredApi: _propTypes2.default.shape({
    error: _propTypes2.default.shape({
      status: _propTypes2.default.number,
      response: _propTypes2.default.any
    })
  }),
  location: _propTypes2.default.shape({
    pathname: _propTypes2.default.string.isRequired
  }).isRequired,
  clean: _propTypes2.default.func.isRequired,
  replace: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node
};

function mapStateToProps(state, _ref2) {
  var routes = _ref2.routes;

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
