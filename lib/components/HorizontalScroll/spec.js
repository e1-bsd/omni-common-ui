'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<HorizontalScroll />', function () {
  it('renders its children', function () {
    var child = _react2.default.createElement('div', { id: 'inner' });
    (0, _chai.expect)((0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      child
    ))).to.contain(child);
  });

  it('calls property onScrollReady with an instance of iScroll', function (done) {
    var onScrollReady = function onScrollReady(scroll) {
      (0, _chai.expect)(scroll.scrollToElement).to.be.a('function');
      done();
    };

    (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      { onScrollReady: onScrollReady },
      _react2.default.createElement('div', null)
    ));
  });

  it('calls iScroll.scrollToElement with the given scrollToElement parameters', function (done) {
    var scrollToElementParams = {
      selector: 'div',
      duration: 100,
      offsetX: 10
    };

    var onScrollReady = function onScrollReady(scroll) {
      var oldScrollToElement = scroll.scrollToElement;
      scroll.scrollToElement = function (selector, duration, offsetX, offsetY) {
        // eslint-disable-line
        (0, _chai.expect)({
          selector: selector, duration: duration, offsetX: offsetX, offsetY: offsetY
        }).to.eql(_extends({
          offsetY: true }, scrollToElementParams));
        scroll.scrollToElement = oldScrollToElement; // eslint-disable-line
        done();
      };
    };

    (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      { onScrollReady: onScrollReady,
        scrollToElement: scrollToElementParams },
      _react2.default.createElement('div', null)
    ));
  });

  it('sets the __scrolling styles while in the isScrolling state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement('div', null)
    ));
    (0, _chai.expect)(wrapper).to.not.have.descendants('.' + _style2.default.__scrolling);
    wrapper.setState({ isScrolling: true });
    (0, _chai.expect)(wrapper).to.have.descendants('.' + _style2.default.__scrolling);
  });

  it('goes into isScrolling state while scrolling', function () {
    var spy = _sinon2.default.spy(_2.default.prototype, 'setState');
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement('div', null)
    ));

    (0, _chai.expect)(wrapper.find('.' + _style2.default.HorizontalScroll_iScroll).prop('onBeforeScrollStart')).to.equal(wrapper.instance()._onBeforeScrollStart);

    wrapper.instance()._onBeforeScrollStart();

    (0, _chai.expect)(spy.args[0]).to.eql([{ isScrolling: true }]);

    _2.default.prototype.setState.restore();
  });
});
//# sourceMappingURL=spec.js.map
