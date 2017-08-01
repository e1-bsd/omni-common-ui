'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckBox = function CheckBox(props) {
  var checked = props.checked === true;
  var classes = (0, _classnames3.default)(_style2.default.Checkbox, _defineProperty({}, _style2.default.__checked, checked));

  return _react2.default.createElement(
    'label',
    { className: classes },
    _react2.default.createElement('input', { type: 'checkbox',
      name: props.name,
      className: _style2.default.Checkbox_input,
      onChange: onChange,
      checked: checked }),
    _react2.default.createElement(
      'span',
      { className: _style2.default.Checkbox_text },
      props.item
    )
  );

  function onChange(e) {
    props.onChecked(e);
  }
};

CheckBox.propTypes = {
  name: _propTypes2.default.string,
  item: _propTypes2.default.string,
  onChecked: _propTypes2.default.func,
  checked: _propTypes2.default.bool
};

exports.default = (0, _pure2.default)(CheckBox);
//# sourceMappingURL=index.js.map
