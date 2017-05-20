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

var _Card = require('./../Card');

var _Card2 = _interopRequireDefault(_Card);

var _Heading = require('./Heading');

var _Heading2 = _interopRequireDefault(_Heading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageCard = function PageCard(props) {
  var className = props.className,
      headingText = props.headingText;


  return _react2.default.createElement(
    _Card2.default,
    { borderless: true,
      className: (0, _classnames2.default)(_style2.default.PageCard, className) },
    _is_js2.default.string(headingText) && headingText.length ? _react2.default.createElement(_Heading2.default, { text: headingText }) : null,
    props.children
  );
};

PageCard.propTypes = {
  headingText: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string
};

exports.default = PageCard;
//# sourceMappingURL=component.js.map
