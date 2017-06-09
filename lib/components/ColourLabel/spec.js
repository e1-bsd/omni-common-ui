'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Tooltip = require('./../Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('when neither initial nor text is provided', function () {
  test('renders nothing', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ColourLabel, null));
    expect(wrapper.html()).toBe(null);
  });
});

describe('when initial is not provided', function () {
  test('renders a big label with the text', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ColourLabel, { text: 'hey' }));
    expect(wrapper.find('.' + _style2.default.ColourLabel_inner).text()).toBe('hey');
  });
});

describe('when initial is provided', function () {
  describe('when text is not provided', function () {
    test('renders a small label with the initial without any tooltip', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ColourLabel, { initial: 'h' }));
      expect(wrapper.find('.' + _style2.default.ColourLabel_inner).text()).toBe('h');
      expect(wrapper.find(_Tooltip2.default)).toHaveLength(0);
    });
  });

  describe('when text is provided', function () {
    test('renders a small label with the initial and a tooltip with the text', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ColourLabel, { initial: 'h', text: 'on hold' }));
      var tooltip = wrapper.find(_Tooltip2.default);
      expect(wrapper.find('.' + _style2.default.ColourLabel_inner).text()).toBe('h');
      expect(tooltip).toHaveLength(1);
      expect(tooltip.prop('text')).toBe('on hold');
    });
  });
});
//# sourceMappingURL=spec.js.map
