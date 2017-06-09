'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _PageCard = require('./../PageCard');

var _PageCard2 = _interopRequireDefault(_PageCard);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders the root Level and title', function () {
  var selectionTableTitle = 'Classroom';
  var selectionTable = _react2.default.createElement(
    _2.default,
    { title: selectionTableTitle },
    _react2.default.createElement(_2.default.Level, { label: 'CN' }),
    _react2.default.createElement(_2.default.Level, { label: 'RU' })
  );
  var wrapper = (0, _enzyme.mount)(selectionTable);
  expect(wrapper.find(_2.default.Level)).toHaveLength(2);
  expect(wrapper.find(_PageCard2.default.Heading).prop('text')).toBe(selectionTableTitle);
});

test('render sub-Level once a level is clicked', function () {
  var selectionTable = _react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement(
      _2.default.Level,
      { label: 'CN' },
      _react2.default.createElement(_2.default.Level, { label: 'CN-1' }),
      _react2.default.createElement(_2.default.Level, { label: 'CN-2' }),
      _react2.default.createElement(_2.default.Level, { label: 'CN-3' })
    ),
    _react2.default.createElement(
      _2.default.Level,
      { label: 'RU' },
      _react2.default.createElement(_2.default.Level, { label: 'CN-1' })
    )
  );

  var wrapper = (0, _enzyme.mount)(selectionTable);
  expect(wrapper.find(_2.default.Level)).toHaveLength(2);
  wrapper.find(_2.default.Level).first().simulate('click');
  expect(wrapper.find(_2.default.Level)).toHaveLength(3);
  expect(wrapper.find(_2.default.Level).first().prop('label')).toBe('CN-1');
});
//# sourceMappingURL=spec.js.map
