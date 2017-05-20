'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _Tooltip = require('./../Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColourLabel = function ColourLabel(props) {
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
  initial: _react2.default.PropTypes.string,
  text: _react2.default.PropTypes.string,
  colour: _react2.default.PropTypes.string
};

exports.default = ColourLabel;
//# sourceMappingURL=index.js.map
