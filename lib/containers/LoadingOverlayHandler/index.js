'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _connect = require('./../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _ApiCalls = require('./../ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HTTP_METHOD_TRIGGERS = 'GET';
var REQUEST_DURATION_THRESHOLD_MS = 100;

// config feature flag
var IS_ACTIVE = void 0;
try {
  IS_ACTIVE = !!_Config2.default.get('showLoadingOverlayForApiGets'); // replaced by webpack
} catch (e) {
  IS_ACTIVE = false;
}

var LoadingOverlayHandler = function (_PureComponent) {
  _inherits(LoadingOverlayHandler, _PureComponent);

  function LoadingOverlayHandler() {
    _classCallCheck(this, LoadingOverlayHandler);

    var _this = _possibleConstructorReturn(this, (LoadingOverlayHandler.__proto__ || Object.getPrototypeOf(LoadingOverlayHandler)).call(this));

    _this.state = { isThrobberVisible: false };
    return _this;
  }

  _createClass(LoadingOverlayHandler, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._updateState();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._updateState(nextProps);
    }
  }, {
    key: '_updateState',
    value: function _updateState() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var isAnyApiCallLoadingBeyondThreshold = props.isAnyApiCallLoadingBeyondThreshold,
          isAnyApiCallLoading = props.isAnyApiCallLoading;

      if (!IS_ACTIVE) return; // CONFIG flag check
      if (isAnyApiCallLoadingBeyondThreshold) {
        this.setState({ isThrobberVisible: true });
      } else if (isAnyApiCallLoading) {
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          var loadingApiCalls = _this2.props.loadingApiCalls;

          if (!getIsAnyApiCallLoadingBeyondThreshold(loadingApiCalls)) return;
          _this2.setState({ isThrobberVisible: true });
        }, REQUEST_DURATION_THRESHOLD_MS);
      } else if (!isAnyApiCallLoading) {
        clearTimeout(this.timer);
        this.setState({ isThrobberVisible: false });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      var classes = {
        pace: true,
        'pace-inactive': !this.state.isThrobberVisible
      };
      return _react2.default.createElement(
        'div',
        { className: _style2.default.LoadingOverlayHandler },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(classes) },
          _react2.default.createElement('div', { className: 'pace-activity' })
        ),
        children
      );
    }
  }]);

  return LoadingOverlayHandler;
}(_react.PureComponent);

LoadingOverlayHandler.propTypes = {
  loadingApiCalls: _propTypes2.default.shape({
    filter: _propTypes2.default.func
  }),
  isAnyApiCallLoading: _propTypes2.default.bool.isRequired,
  isAnyApiCallLoadingBeyondThreshold: _propTypes2.default.bool.isRequired,
  children: _propTypes2.default.node.isRequired
};

function mapStateToProps(state) {
  var loadingApiCalls = getLoadingApiCalls(state);
  var isAnyApiCallLoadingBeyondThreshold = Boolean(loadingApiCalls && getIsAnyApiCallLoadingBeyondThreshold(loadingApiCalls));
  return {
    loadingApiCalls: loadingApiCalls,
    isAnyApiCallLoading: !!loadingApiCalls,
    isAnyApiCallLoadingBeyondThreshold: isAnyApiCallLoadingBeyondThreshold
  };
}

function getLoadingApiCalls(state) {
  var loadingApiCalls = state.get('apiCalls').filter(function (call, key) {
    return key.startsWith(HTTP_METHOD_TRIGGERS);
  }).filter(function (call) {
    return _ApiCalls2.default.State.isLoading(call);
  }).filter(function (call) {
    return !call.disableDefault;
  });
  if (_is_js2.default.object(loadingApiCalls) && loadingApiCalls.size) {
    return loadingApiCalls;
  }
  return null;
}

function getIsAnyApiCallLoadingBeyondThreshold(apiCalls) {
  if (!apiCalls) return false;
  return !!apiCalls.filter(function (call) {
    return new Date().getTime() - call.timestamp.getTime() >= REQUEST_DURATION_THRESHOLD_MS;
  }).find(function () {
    return true;
  });
}

exports.default = (0, _connect2.default)(mapStateToProps)(LoadingOverlayHandler);
//# sourceMappingURL=index.js.map
