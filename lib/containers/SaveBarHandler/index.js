'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterRedux = require('react-router-redux');

var _immutable = require('immutable');

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _connect = require('./../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _ApiCalls = require('./../ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _testClass = require('./../../domain/testClass');

var _testClass2 = _interopRequireDefault(_testClass);

var _SaveBarButton = require('./SaveBarButton');

var _SaveBarButton2 = _interopRequireDefault(_SaveBarButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HTTP_METHOD_TRIGGERS = ['POST', 'PUT', 'DELETE'];
var EDIT_MODE_MATCH_REGEXP = new RegExp('^edit$', 'i');

// config feature flag
var IS_ACTIVE = !!_Config2.default.get('showSavingBarForApiPostsPuts');

// per-route action button settings may be supplied as functions
var fnToValue = function fnToValue(any, props) {
  if (_is_js2.default.function(any)) {
    return any(props);
  }
  return any;
};

var SaveBarHandler = function (_PureComponent) {
  _inherits(SaveBarHandler, _PureComponent);

  function SaveBarHandler() {
    _classCallCheck(this, SaveBarHandler);

    var _this = _possibleConstructorReturn(this, (SaveBarHandler.__proto__ || Object.getPrototypeOf(SaveBarHandler)).call(this));

    _this.state = { isVisible: false };
    return _this;
  }

  _createClass(SaveBarHandler, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextMode = nextProps.params.mode,
          nextIsAnyApiCallSaving = nextProps.isAnyApiCallSaving;
      // CONFIG flag check

      if (!IS_ACTIVE) return;
      var buttonsToDisplay = this._getButtonsToDisplay(nextProps);
      var newIsVisible = false;
      nextIsAnyApiCallSaving && (newIsVisible = true);
      // we don't want to show the saving bar when editing but there are no buttons
      EDIT_MODE_MATCH_REGEXP.test(nextMode) && buttonsToDisplay.size && (newIsVisible = true);
      if (newIsVisible !== this.state.isVisible) {
        this.setState({ isVisible: newIsVisible });
      }
    }
  }, {
    key: '_getButtonsToDisplay',
    value: function _getButtonsToDisplay() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var currentRoute = SaveBarHandler.getCurrentRouteSegment(props);
      var currentModeName = props.params && props.params.mode && props.params.mode.length ? props.params.mode : 'default';

      // exit out if not in edit mode; we're not visible.
      if (!EDIT_MODE_MATCH_REGEXP.test(props.params.mode)) return new _immutable.Map();

      var actionButtonsMap = {};
      var actionButtonsForMode = void 0;
      if (currentRoute.actionButtons && currentRoute.actionButtons[currentModeName]) {
        actionButtonsForMode = currentRoute.actionButtons[currentModeName];
        Object.assign(actionButtonsMap, actionButtonsForMode);
      }

      var buttonsToDisplay = Object.keys(actionButtonsMap).filter(function (buttonLabel) {
        var buttonDescriptor = actionButtonsMap[buttonLabel];
        try {
          if (_is_js2.default.function(buttonDescriptor.visibleWhen)) {
            if (buttonDescriptor.visibleWhen.length < 2) {
              return buttonDescriptor.visibleWhen(props);
            }
            _log2.default.error('Too many arguments in signature of `visibleWhen`. Got', buttonDescriptor.visibleWhen.length);
          }
        } catch (err) {
          _log2.default.warn('Error in `visibleWhen` in route `' + currentRoute.path + '`', err);
        }

        return true;
      });

      return new _immutable.Map(actionButtonsMap).filter(function (v, key) {
        return buttonsToDisplay.indexOf(key) >= 0;
      });
    }
  }, {
    key: '_getIsDisabled',
    value: function _getIsDisabled(buttonDescriptor) {
      var props = this.props;
      try {
        if (_is_js2.default.function(buttonDescriptor.disableWhen)) {
          if (buttonDescriptor.disableWhen.length < 2) {
            return buttonDescriptor.disableWhen(props);
            // handle the older form of this method where there are two args - state and props
          }
          _log2.default.error('Too many arguments in signature of `disableWhen`. Got', buttonDescriptor.disableWhen.length);
        }
      } catch (err) {
        var currentRoute = SaveBarHandler.getCurrentRouteSegment(this.props);
        _log2.default.warn('Error in `disableWhen` in route `' + currentRoute.path + '`', err);
      }
      return false;
    }
  }, {
    key: '_getOnClickHandler',
    value: function _getOnClickHandler(buttonDescriptor, buttonLabel) {
      var _this2 = this;

      if (buttonDescriptor.onClick) {
        if (buttonDescriptor.onClick.length > 1) {
          _log2.default.warn('Deprecated form of `onClick` handler found. It should now have just one argument for props.', buttonDescriptor);
        }
        return function () {
          registerClick();
          return buttonDescriptor.onClick.call(_this2, _this2.props);
        };
      }
      return buttonDescriptor.route && function () {
        registerClick();
        return _this2._redirect(fnToValue(buttonDescriptor.route, _this2.props));
      };
      function registerClick() {
        _reactGa2.default.event({
          category: 'Navigation',
          action: 'Clicked action button',
          label: 'Clicked ' + buttonLabel + ' in the bottom save bar'
        });
      }
    }
  }, {
    key: '_redirect',
    value: function _redirect(param) {
      var _props = this.props,
          pushRoute = _props.pushRoute,
          buildRoute = _props.buildRoute;

      pushRoute(buildRoute(param));
    }
  }, {
    key: 'render',
    value: function render() {
      var _barClasses,
          _overlayClasses,
          _this3 = this;

      var _props2 = this.props,
          children = _props2.children,
          isAnyApiCallSaving = _props2.isAnyApiCallSaving; // eslint-disable-line

      var isVisible = this.state.isVisible;

      var barClasses = (_barClasses = {}, _defineProperty(_barClasses, _style2.default.SaveBar, true), _defineProperty(_barClasses, _style2.default.__visible, !!isVisible), _barClasses);
      var overlayClasses = (_overlayClasses = {}, _defineProperty(_overlayClasses, _style2.default.SaveBar_overlay, true), _defineProperty(_overlayClasses, _style2.default.__visible, !!isAnyApiCallSaving), _overlayClasses);
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames3.default)(_style2.default.SaveBarHandler, (0, _testClass2.default)('save-bar-handler')) },
        _react2.default.createElement(
          'aside',
          { className: (0, _classnames3.default)(barClasses) },
          _react2.default.createElement(
            'div',
            { className: _style2.default.SaveBar_inner },
            _react2.default.createElement(
              'span',
              { className: (0, _classnames3.default)(_style2.default.SaveBar_text, _defineProperty({}, _style2.default.__visible, !!isAnyApiCallSaving)) },
              'Saving\u2026'
            ),
            _react2.default.createElement(
              'div',
              { className: _style2.default.SaveBar_inner_buttons },
              this._getButtonsToDisplay()
              // eslint-disable-next-line react/no-array-index-key
              .map(function (buttonDescriptor, buttonLabel) {
                return _react2.default.createElement(_SaveBarButton2.default, { key: buttonLabel,
                  label: buttonLabel,
                  isPrimary: buttonDescriptor.isPrimary,
                  disabled: _this3._getIsDisabled(buttonDescriptor),
                  onClick: _this3._getOnClickHandler(buttonDescriptor, buttonLabel),
                  linkHref: fnToValue(buttonDescriptor.linkHref, _this3.props) });
              }).toArray()
            )
          )
        ),
        _react2.default.createElement('div', { className: (0, _classnames3.default)(overlayClasses) }),
        children
      );
    }
  }]);

  return SaveBarHandler;
}(_react.PureComponent);

SaveBarHandler.getCurrentRouteSegment = function (_ref) {
  var routes = _ref.routes;
  return routes ? routes[routes.length - 1] : {};
};

SaveBarHandler.propTypes = {
  isAnyApiCallSaving: _propTypes2.default.bool.isRequired,
  params: _propTypes2.default.shape({
    mode: _propTypes2.default.string
  }).isRequired,
  routes: _propTypes2.default.array.isRequired,
  pushRoute: _propTypes2.default.func.isRequired,
  buildRoute: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node.isRequired
};

function mapStateToProps(state) {
  return {
    isAnyApiCallSaving: !!isAnyApiCallSaving(state)
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({ pushRoute: function pushRoute(path) {
      return dispatch((0, _reactRouterRedux.push)(path));
    } });
}

function isAnyApiCallSaving(state) {
  return !!state.get('apiCalls').filter(function (call, key) {
    return HTTP_METHOD_TRIGGERS.some(function (method) {
      return key.startsWith(method);
    });
  }).find(function (call) {
    return _ApiCalls2.default.State.isLoading(call);
  });
}

exports.default = (0, _connect2.default)(mapStateToProps, mapDispatchToProps)(SaveBarHandler);
//# sourceMappingURL=index.js.map
