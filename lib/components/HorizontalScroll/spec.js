'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _2 = require('./');

var _3 = _interopRequireDefault(_2);

var _reactIscroll = require('react-iscroll');

var _reactIscroll2 = _interopRequireDefault(_reactIscroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

jest.mock('iscroll', function () {
  return jest.fn();
});
jest.mock('react-iscroll', function () {
  var _require = require('react'),
      PureComponent = _require.PureComponent;

  var Mock = function (_PureComponent) {
    _inherits(Mock, _PureComponent);

    function Mock() {
      _classCallCheck(this, Mock);

      return _possibleConstructorReturn(this, (Mock.__proto__ || Object.getPrototypeOf(Mock)).apply(this, arguments));
    }

    _createClass(Mock, [{
      key: 'withIScroll',
      value: function withIScroll(_, callback) {
        // eslint-disable-next-line new-cap, react/prop-types, react/no-find-dom-node
        callback({ scrollToElement: Mock.scrollToElement });
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return Mock;
  }(PureComponent);

  Mock.scrollToElement = jest.fn();

  return Mock;
});

beforeEach(function () {
  jest.resetAllMocks();
});

test('renders its children', function () {
  var child = _react2.default.createElement('div', { id: 'inner' });
  expect((0, _enzyme.shallow)(_react2.default.createElement(
    _3.default,
    null,
    child
  )).contains(child)).toBe(true);
});

test('calls property onScrollReady with an instance of iScroll', function (done) {
  expect.assertions(1);
  var onScrollReady = jest.fn(function () {
    expect(onScrollReady).toHaveBeenCalled();
    done();
  });

  (0, _enzyme.mount)(_react2.default.createElement(
    _3.default,
    { onScrollReady: onScrollReady },
    _react2.default.createElement('div', null)
  ));
});

test('calls iScroll.scrollToElement with the given scrollToElement parameters', function (done) {
  expect.assertions(1);
  var scrollToElementParams = {
    selector: 'div',
    duration: 100,
    offsetX: 10
  };

  _reactIscroll2.default.scrollToElement = function (selector, duration, offsetX, offsetY) {
    // eslint-disable-line
    expect({ selector: selector, duration: duration, offsetX: offsetX, offsetY: offsetY }).toEqual(_extends({
      offsetY: true }, scrollToElementParams));
    done();
  };

  (0, _enzyme.mount)(_react2.default.createElement(
    _3.default,
    { scrollToElement: scrollToElementParams },
    _react2.default.createElement('div', null)
  ));
});

test('sets the __scrolling styles while in the isScrolling state', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _3.default,
    null,
    _react2.default.createElement('div', null)
  ));
  expect(wrapper.find('.' + _style2.default.__scrolling)).toHaveLength(0);
  wrapper.setState({ isScrolling: true });
  expect(wrapper.find('.' + _style2.default.__scrolling)).toHaveLength(1);
});

test('goes into isScrolling state while scrolling', function () {
  var spy = jest.spyOn(_3.default.prototype, 'setState');
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _3.default,
    null,
    _react2.default.createElement('div', null)
  ));

  expect(wrapper.find('.' + _style2.default.HorizontalScroll_iScroll).prop('onBeforeScrollStart')).toBe(wrapper.instance()._onBeforeScrollStart);

  wrapper.instance()._onBeforeScrollStart();

  expect(spy).toHaveBeenCalledWith({ isScrolling: true });

  spy.mockRestore();
});
//# sourceMappingURL=spec.js.map
