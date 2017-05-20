'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

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
  name: _react2.default.PropTypes.string,
  item: _react2.default.PropTypes.string,
  onChecked: _react2.default.PropTypes.func,
  checked: _react2.default.PropTypes.bool
};

exports.default = CheckBox;
//# sourceMappingURL=index.js.map
