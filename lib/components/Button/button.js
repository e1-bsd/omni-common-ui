'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouter = require('react-router');

var _type = require('./type');

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_PureComponent) {
  _inherits(Button, _PureComponent);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: '_handleButtonClick',
    value: function _handleButtonClick(e) {
      if (this.props.disabled) {
        return;
      }

      if (_is_js2.default.function(this.props.onClick)) {
        var ret = this.props.onClick(e);
        this._setActiveClassOnClick(ret);
      }
    }
  }, {
    key: '_setActiveClassOnClick',
    value: function _setActiveClassOnClick(ret) {
      var _this2 = this;

      var _props = this.props,
          onClickActiveClassAddDelay = _props.onClickActiveClassAddDelay,
          onClickActiveClassRemoveDelay = _props.onClickActiveClassRemoveDelay;

      // defer this - we don't want to show an active state if something happens immediately

      setTimeout(function () {
        if (!_this2._node) return;
        _this2._node.classList.add(_style2.default.__active);
        if (ret instanceof Promise) {
          ret.then(function () {
            _this2._unsetActiveClassIfNonActive();
          }).catch(function () {
            _this2._unsetActiveClassIfNonActive();
          });
        } else {
          setTimeout(function () {
            _this2._unsetActiveClassIfNonActive();
          }, _is_js2.default.number(onClickActiveClassRemoveDelay) ? onClickActiveClassRemoveDelay : 1000);
        }
      }, _is_js2.default.number(onClickActiveClassAddDelay) ? onClickActiveClassAddDelay : 100);
    }
  }, {
    key: '_unsetActiveClassIfNonActive',
    value: function _unsetActiveClassIfNonActive() {
      if (this.props.active) return;
      if (!this._node) return;
      this._node.classList.remove(_style2.default.__active);
    }
  }, {
    key: '_renderButton',
    value: function _renderButton(type, modeClasses) {
      var _this3 = this;

      var classes = (0, _classnames2.default)(type, modeClasses, this.props.className);

      return _react2.default.createElement(
        'button',
        _extends({ className: classes,
          disabled: this.props.disabled,
          onClick: this.props.onClick && function (e) {
            _this3._handleButtonClick(e);
          },
          ref: function ref(c) {
            _this3._node = c;
          }
        }, this.props.attrs || {}),
        this.props.children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _modeClasses,
          _this4 = this;

      var props = this.props;
      var type = props.type || _type.Type.default;

      (0, _type.validateType)(type);

      var modeClasses = (_modeClasses = {}, _defineProperty(_modeClasses, _style2.default.__block, !!props.block), _defineProperty(_modeClasses, _style2.default.__autoWidth, !!props.autoWidth), _defineProperty(_modeClasses, _style2.default.__active, !!props.active), _modeClasses);

      // case: link to URL via `linkHref` OR disabled with `linkTo`
      if (_is_js2.default.existy(props.linkHref) || _is_js2.default.existy(props.linkTo) && props.disabled) {
        // eslint-disable-next-line no-script-url
        return _react2.default.createElement(
          'a',
          { href: !props.disabled ? props.linkHref : 'javascript:void(0)',
            className: (0, _classnames2.default)(_style2.default.ButtonLink, modeClasses, props.className),
            target: props.newTab ? '_blank' : undefined,
            onClick: function onClick() {
              _this4._setActiveClassOnClick();
            } },
          this._renderButton(type, modeClasses)
        );
      }

      // case: link to route via `linkTo`
      if (_is_js2.default.existy(props.linkTo)) {
        return _react2.default.createElement(
          _reactRouter.Link,
          { to: props.linkTo,
            draggable: false,
            className: (0, _classnames2.default)(_style2.default.ButtonLink, modeClasses, props.className),
            onClick: function onClick() {
              _this4._setActiveClassOnClick();
            } },
          this._renderButton(type, modeClasses)
        );
      }

      return this._renderButton(type, modeClasses);
    }
  }]);

  return Button;
}(_react.PureComponent);

Button.propTypes = {
  onClick: _propTypes2.default.func,
  type: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  newTab: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  linkTo: _propTypes2.default.string,
  linkHref: _propTypes2.default.string,
  block: _propTypes2.default.bool,
  autoWidth: _propTypes2.default.bool,
  active: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  attrs: _propTypes2.default.shape({
    type: _propTypes2.default.string
  }),
  onClickActiveClassAddDelay: _propTypes2.default.number, // default: 100ms
  onClickActiveClassRemoveDelay: _propTypes2.default.number };

exports.default = Button;
//# sourceMappingURL=button.js.map
