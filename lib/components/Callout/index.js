'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _domAlign = require('dom-align');

var _domAlign2 = _interopRequireDefault(_domAlign);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactTransitionGroup = require('react-transition-group');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RESIZE_DEBOUNCE_MS = 30;

var Callout = function (_PureComponent) {
  _inherits(Callout, _PureComponent);

  function Callout() {
    _classCallCheck(this, Callout);

    var _this = _possibleConstructorReturn(this, (Callout.__proto__ || Object.getPrototypeOf(Callout)).call(this));

    _this.state = { open: false };
    _this._onClick = _this._onClick.bind(_this);
    _this._onClickedOutside = _this._onClickedOutside.bind(_this);
    return _this;
  }

  _createClass(Callout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this._updatePosition();
      document.body.addEventListener('click', this._onClickedOutside);
      document.body.addEventListener('touchstart', this._onClickedOutside);
      window.addEventListener('resize', this._onResizeHandler = (0, _lodash2.default)(function () {
        _this2._updatePosition();
      }, RESIZE_DEBOUNCE_MS, {
        leading: true, // nicer iOS screen rotate
        trailing: true
      }), false);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._updatePosition();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this._onClickedOutside);
      document.body.removeEventListener('touchstart', this._onClickedOutside);
      window.removeEventListener('resize', this._onResizeHandler);
    }
  }, {
    key: '_updatePosition',
    value: function _updatePosition() {
      if (!this._calloutNode) return;
      var _props = this.props,
          points = _props.points,
          offset = _props.offset;

      var notchPoints = ['tl', 'bl'];
      (0, _domAlign2.default)(this._notchNode, this._node.children[0], {
        points: notchPoints,
        offset: [0, 15],
        useCssTransform: true
      });
      (0, _domAlign2.default)(this._calloutNode, this._node.children[0], {
        points: points,
        offset: offset,
        useCssTransform: true
      });
    }
  }, {
    key: '_onClickedOutside',
    value: function _onClickedOutside(evt) {
      if (this._node && this._node.contains(evt.target) || this._calloutNode && this._calloutNode.contains(evt.target)) {
        return;
      }
      var onOpenStateChanged = this.props.onOpenStateChanged;

      this.setState({ open: false }, function () {
        onOpenStateChanged && onOpenStateChanged(false);
      });
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      var newOpen = !this.state.open;
      var onOpenStateChanged = this.props.onOpenStateChanged;

      this.setState({ open: newOpen }, function () {
        onOpenStateChanged && onOpenStateChanged(newOpen);
      });
    }
  }, {
    key: 'close',
    value: function close() {
      if (!this.state.open) return;
      this.setState({ open: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          popupClassName = _props2.popupClassName,
          content = _props2.content,
          children = _props2.children;

      var newContent = _react2.default.cloneElement(content, {
        className: (0, _classnames2.default)(_style2.default.Callout_popup, popupClassName),
        ref: function ref(node) {
          _this3._calloutNode = node;
        },
        key: 'Callout#popup'
      });
      return _react2.default.createElement(
        'div',
        { className: _style2.default.Callout,
          ref: function ref(node) {
            _this3._node = node;
          } },
        _react2.default.createElement(
          'div',
          { className: _style2.default.Callout_trigger,
            onClick: this._onClick,
            role: 'button',
            tabIndex: '0' },
          children
        ),
        _react2.default.createElement(
          _reactTransitionGroup.CSSTransitionGroup,
          { transitionName: 'popup',
            transitionEnterTimeout: 200,
            transitionLeaveTimeout: 200 },
          this.state.open && _react2.default.createElement('div', { className: _style2.default.Callout_notch,
            ref: function ref(node) {
              _this3._notchNode = node;
            } }),
          this.state.open && newContent
        )
      );
    }
  }]);

  return Callout;
}(_react.PureComponent);

Callout.defaultProps = {
  points: ['tr', 'bc'],
  offset: [65, 25]
};

Callout.propTypes = {
  popupClassName: _propTypes2.default.string,
  children: _propTypes2.default.node,
  content: _propTypes2.default.node,
  points: _propTypes2.default.arrayOf(function (arr, key) {
    return arr.every(function (val) {
      if (_is_js2.default.string(val) && val.length === 2 && key < 2) return true;
      return new Error('\'points\' should use the format required by dom-align. got ' + val);
    });
  }),
  offset: _propTypes2.default.arrayOf(function (arr, key) {
    return arr.every(function (val) {
      if (_is_js2.default.number(val) && key < 2) return true;
      return new Error('\'offset\' should use the format required by dom-align. got ' + val);
    });
  }),
  onOpenStateChanged: _propTypes2.default.func
};

exports.default = Callout;
//# sourceMappingURL=index.js.map
