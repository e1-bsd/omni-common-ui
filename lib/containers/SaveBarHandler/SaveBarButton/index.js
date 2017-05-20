'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('../style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./../../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SaveBarButton = function SaveBarButton(_ref) {
  var label = _ref.label,
      isPrimary = _ref.isPrimary,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      linkHref = _ref.linkHref,
      linkTo = _ref.linkTo;
  return _react2.default.createElement(
    _Button2.default,
    { autoWidth: true,
      type: isPrimary ? _Button2.default.Type.primaryInverse : _Button2.default.Type.defaultInverse,
      className: _style2.default.SaveBar_button,
      disabled: disabled,
      onClick: onClick,
      linkHref: linkHref,
      linkTo: linkTo },
    label
  );
};

SaveBarButton.propTypes = {
  label: _react2.default.PropTypes.string,
  isPrimary: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  onClick: _react2.default.PropTypes.func,
  linkHref: _react2.default.PropTypes.string,
  linkTo: _react2.default.PropTypes.string
};

exports.default = SaveBarButton;
//# sourceMappingURL=index.js.map
