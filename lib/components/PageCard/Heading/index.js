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

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PageCardHeading = function PageCardHeading(props) {
  var className = props.className,
      text = props.text;


  return _react2.default.createElement(
    'header',
    { className: (0, _classnames3.default)(_style2.default.PageCardHeading, className, _defineProperty({}, _style2.default.__stackHorizontal, props.stackMode === 'horizontal')) },
    _is_js2.default.string(text) && text.length ? _react2.default.createElement(
      'h1',
      { className: _style2.default.PageCardHeading_h1 },
      text
    ) : null,
    props.children
  );
};

PageCardHeading.propTypes = {
  className: _react2.default.PropTypes.string,
  text: _react2.default.PropTypes.string,
  stackMode: _react2.default.PropTypes.oneOf(['vertical', 'horizontal']), // default: vertical
  children: _react2.default.PropTypes.node
};

exports.default = PageCardHeading;
//# sourceMappingURL=index.js.map
