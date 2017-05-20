'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIscroll = require('react-iscroll');

var _reactIscroll2 = _interopRequireDefault(_reactIscroll);

var _iscroll = require('iscroll');

var _iscroll2 = _interopRequireDefault(_iscroll);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseOptions = {
  deceleration: 0.01,
  bounce: false,
  scrollX: true,
  scrollY: false,
  scrollbars: true,
  interactiveScrollbars: true,
  eventPassthrough: true,
  keyBindings: true,
  mouseWheel: true
};

var HorizontalScroll = function (_PureComponent) {
  _inherits(HorizontalScroll, _PureComponent);

  function HorizontalScroll(props) {
    _classCallCheck(this, HorizontalScroll);

    var _this = _possibleConstructorReturn(this, (HorizontalScroll.__proto__ || Object.getPrototypeOf(HorizontalScroll)).call(this, props));

    _this.state = { isScrolling: false };
    _this._onBeforeScrollStart = _this._onBeforeScrollStart.bind(_this);
    _this._onScrollCancelOrEnd = _this._onScrollCancelOrEnd.bind(_this);
    _this._onScrollRefresh = _this._onScrollRefresh.bind(_this);
    return _this;
  }

  _createClass(HorizontalScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onScrollReady = this.props.onScrollReady;

      var isOnScrollReadySet = _is_js2.default.function(onScrollReady);
      if (isOnScrollReadySet) {
        this.hostNode.withIScroll(true, function (scroll) {
          isOnScrollReadySet && onScrollReady(scroll);
        });
      }
      this._scrollToElement();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // if update was a user scroll don't do the auto scroll to element
      if (this.state.isScrolling !== prevState.isScrolling) return;
      this._scrollToElement();
    }
  }, {
    key: '_scrollToElement',
    value: function _scrollToElement() {
      var scrollToElement = this.props.scrollToElement;

      var isScrollToElementSet = _is_js2.default.object(scrollToElement);
      if (isScrollToElementSet) {
        this.hostNode.withIScroll(true, function (scroll) {
          var selector = scrollToElement.selector,
              duration = scrollToElement.duration,
              offsetX = scrollToElement.offsetX,
              offsetY = scrollToElement.offsetY,
              easing = scrollToElement.easing;

          scroll.scrollToElement(selector, duration, _is_js2.default.number(offsetX) ? offsetX : true, _is_js2.default.number(offsetY) ? offsetY : true, easing);
        });
      }
    }
  }, {
    key: '_onBeforeScrollStart',
    value: function _onBeforeScrollStart() {
      this.setState({ isScrolling: true });
    }
  }, {
    key: '_onScrollCancelOrEnd',
    value: function _onScrollCancelOrEnd() {
      this.setState({ isScrolling: false });
    }
  }, {
    key: '_onScrollRefresh',
    value: function _onScrollRefresh(_iScroll) {
      this.setState({ hasScroll: !(_iScroll.x === _iScroll.maxScrollX && _iScroll.x === 0) });
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props = this.props,
          className = _props.className,
          innerClassName = _props.innerClassName;

      var iScrollClasses = (0, _classnames3.default)(_style2.default.HorizontalScroll_iScroll, innerClassName, (_classnames = {}, _defineProperty(_classnames, _style2.default.__hasScroll, !!this.state.hasScroll), _defineProperty(_classnames, _style2.default.__scrolling, !!this.state.isScrolling), _classnames));

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames3.default)(_style2.default.HorizontalScroll, className) },
        _react2.default.createElement(
          _reactIscroll2.default,
          { className: iScrollClasses,
            iScroll: _iscroll2.default,
            options: baseOptions,
            ref: function ref(node) {
              _this2.hostNode = node;
            },
            onBeforeScrollStart: this._onBeforeScrollStart,
            onScrollCancel: this._onScrollCancelOrEnd,
            onScrollEnd: this._onScrollCancelOrEnd,
            onRefresh: this._onScrollRefresh },
          this.props.children
        )
      );
    }
  }]);

  return HorizontalScroll;
}(_react.PureComponent);

HorizontalScroll.propTypes = {
  className: _react2.default.PropTypes.string,
  innerClassName: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node,
  onScrollReady: _react2.default.PropTypes.func,
  scrollToElement: _react2.default.PropTypes.shape({
    selector: _react2.default.PropTypes.string.isRequired,
    duration: _react2.default.PropTypes.number,
    offsetX: _react2.default.PropTypes.number,
    offsetY: _react2.default.PropTypes.number,
    easing: _react2.default.PropTypes.object
  })
};

exports.default = HorizontalScroll;
//# sourceMappingURL=index.js.map
