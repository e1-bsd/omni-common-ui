'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColourLabel = undefined;

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _Tooltip = require('./../Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColourLabel = exports.ColourLabel = function ColourLabel(props) {
  var text = props.text,
      initial = props.initial,
      colour = props.colour;


  if (_is_js2.default.string(initial) && _is_js2.default.not.empty(initial)) {
    return renderSmall();
  }

  if (_is_js2.default.string(text) && _is_js2.default.not.empty(text)) {
    return renderBig();
  }

  return null;

  function renderSmall() {
    if (_is_js2.default.string(text) && _is_js2.default.not.empty(text)) {
      return _react2.default.createElement(
        _Tooltip2.default,
        { text: text, className: _style2.default.ColourLabel },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_style2.default.ColourLabel_inner, _style2.default.__small),
            style: { backgroundColor: colour } },
          initial
        )
      );
    }

    return _react2.default.createElement(
      'div',
      { className: _style2.default.ColourLabel },
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_style2.default.ColourLabel_inner, _style2.default.__small),
          style: { backgroundColor: colour } },
        initial
      )
    );
  }

  function renderBig() {
    return _react2.default.createElement(
      'div',
      { className: _style2.default.ColourLabel },
      _react2.default.createElement(
        'div',
        { className: _style2.default.ColourLabel_inner, style: { backgroundColor: colour } },
        text
      )
    );
  }
};

ColourLabel.propTypes = {
  initial: _propTypes2.default.string,
  text: _propTypes2.default.string,
  colour: _propTypes2.default.string
};

exports.default = (0, _pure2.default)(ColourLabel);
//# sourceMappingURL=index.js.map
