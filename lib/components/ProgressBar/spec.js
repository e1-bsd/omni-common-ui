'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('when total is not provided', function () {
  test('uses the "progress" property directly as a percentage', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ProgressBar, { value: 45 }));
    var progress = wrapper.find('.' + _style2.default.ProgressBar_progress);
    expect(progress.props().style.width).toBe('45%');
  });

  test('the progress is 0 if no "progress" is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ProgressBar, null));
    var progress = wrapper.find('.' + _style2.default.ProgressBar_progress);
    expect(progress.props().style.width).toBe('0%');
  });

  test('the progress is 0 if "progress" is negative', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ProgressBar, { value: -45 }));
    var progress = wrapper.find('.' + _style2.default.ProgressBar_progress);
    expect(progress.props().style.width).toBe('0%');
  });

  test('the progress is 100 if "progress" is more than 100', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ProgressBar, { value: 145 }));
    var progress = wrapper.find('.' + _style2.default.ProgressBar_progress);
    expect(progress.props().style.width).toBe('100%');
  });
});

describe('when total is provided', function () {
  test('calculates the progress percentage out of "progress" and "total"', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ProgressBar, { value: 45, max: 45 }));
    var progress = wrapper.find('.' + _style2.default.ProgressBar_progress);
    expect(progress.props().style.width).toBe('100%');
  });

  test('the progress is 0 if no "progress" is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ProgressBar, { max: 45 }));
    var progress = wrapper.find('.' + _style2.default.ProgressBar_progress);
    expect(progress.props().style.width).toBe('0%');
  });

  test('the progress is 0 if "progress" is negative', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ProgressBar, { value: -45, max: 45 }));
    var progress = wrapper.find('.' + _style2.default.ProgressBar_progress);
    expect(progress.props().style.width).toBe('0%');
  });

  test('the progress is 100 if fraction is greater than 1', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ProgressBar, { value: 200, max: 100 }));
    var progress = wrapper.find('.' + _style2.default.ProgressBar_progress);
    expect(progress.props().style.width).toBe('100%');
  });
});
//# sourceMappingURL=spec.js.map
