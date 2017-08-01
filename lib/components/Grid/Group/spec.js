'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _Item = require('../Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = void 0;

beforeEach(function () {
  options = { context: { grid: {} } };
});

describe('when it has one child', function () {
  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement('div', { id: 'child' })
    ), options);
  });

  test('renders it', function () {
    expect(wrapper.contains(_react2.default.createElement('div', { id: 'child' }))).toBe(true);
  });

  test('wraps it with Item if it is not an Item', function () {
    expect(wrapper.find(_Item2.default)).toHaveLength(1);
  });

  test('wraps it only if it is not an Item', function () {
    (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement(
        _Item2.default,
        null,
        _react2.default.createElement('div', { id: 'child' })
      )
    ), options);
    expect(wrapper.find(_Item2.default)).toHaveLength(1);
  });

  test('does not crash if no children are provided', function () {
    expect(function () {
      return (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null), options);
    }).not.toThrowError();
  });

  test('does not crash if an invalid child is provided', function () {
    expect(function () {
      return (0, _enzyme.shallow)(_react2.default.createElement(
        _2.default,
        null,
        _react2.default.createElement('div', null),
        null
      ), options);
    }).not.toThrowError();
  });
});

describe('when it has several children', function () {
  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement('div', { id: 'child1' }),
      _react2.default.createElement('div', { id: 'child2' })
    ), options);
  });

  test('renders them', function () {
    expect(wrapper.contains(_react2.default.createElement('div', { id: 'child1' }))).toBe(true);
    expect(wrapper.contains(_react2.default.createElement('div', { id: 'child2' }))).toBe(true);
  });

  test('wraps them with Item if they are not an Item', function () {
    expect(wrapper.find(_Item2.default)).toHaveLength(2);
  });

  test('wraps only children that are not an Item', function () {
    (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement('div', { id: 'child1' }),
      _react2.default.createElement(
        _Item2.default,
        null,
        _react2.default.createElement('div', { id: 'child2' })
      )
    ), options);
    expect(wrapper.find(_Item2.default)).toHaveLength(2);
  });
});
//# sourceMappingURL=spec.js.map
