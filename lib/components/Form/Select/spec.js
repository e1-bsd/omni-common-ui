'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two', clearableValue: false }];

test('works along with Formsy', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement(_2.default.Select, { name: 'required',
      label: 'required',
      value: '',
      options: options,
      required: true })
  ));
  expect(wrapper.find('.' + _style2.default.__required).length).toBeGreaterThanOrEqual(1);
});

describe('label prop existence', function () {
  test('has a Field when there is a label prop present', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement(_2.default.Select, { name: 'labelled',
        label: 'labelled',
        value: '',
        options: options })
    ));
    expect(wrapper.find(_Field2.default)).toHaveLength(1);
    expect(wrapper.find(_Field2.default).prop('useLabel')).toBeTruthy();
  });

  test('passes options to Field when there is are label and fieldOptions props present', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement(_2.default.Select, { name: 'labelled',
        label: 'labelled',
        value: '',
        options: options,
        fieldOptions: { neighborStackMode: 'horizontal', className: 'class' } })
    ));
    var field = wrapper.find(_Field2.default);
    expect(field.prop('neighborStackMode')).toBe('horizontal');
    expect(field.prop('className')).toBe('class');
  });

  test('does not have a Field when there is no label prop present', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement(_2.default.Select, { name: 'labelless',
        value: '',
        options: options })
    ));
    expect(wrapper.find(_Field2.default)).toHaveLength(0);
  });
});
//# sourceMappingURL=spec.js.map
