'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ProgressBar = function ProgressBar(props) {
  var _classnames;

  var value = props.value,
      max = props.max;


  return _react2.default.createElement(
    'div',
    { className: (0, _classnames3.default)(_style2.default.ProgressBar, (_classnames = {}, _defineProperty(_classnames, _style2.default.__rounded, !!props.rounded), _defineProperty(_classnames, _style2.default.__larger, !!props.larger), _classnames), props.className) },
    _react2.default.createElement('div', { className: _style2.default.ProgressBar_progress,
      style: { width: percentage(value, max) } })
  );
};

function fraction() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments[1];

  if (_is_js2.default.number(max)) {
    return value / max;
  }

  if (value > 100) {
    value = 100; // eslint-disable-line
  }

  return value / 100;
}

function clamp(fract) {
  return Math.min(1, Math.max(0, fract));
}

function percentage(value, max) {
  return Math.round( // eslint-disable-line
  clamp(fraction(value, max)) * 100) + '%';
}

ProgressBar.propTypes = {
  className: _propTypes2.default.string,
  value: _propTypes2.default.number,
  max: _propTypes2.default.number,
  rounded: _propTypes2.default.bool,
  larger: _propTypes2.default.bool
};

exports.default = ProgressBar;
//# sourceMappingURL=index.js.map
