'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('../style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('./../../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _testClass = require('./../../../domain/testClass');

var _testClass2 = _interopRequireDefault(_testClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SaveBarButton = function SaveBarButton(_ref) {
  var label = _ref.label,
      isPrimary = _ref.isPrimary,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      linkHref = _ref.linkHref,
      linkTo = _ref.linkTo;

  var className = (0, _classnames2.default)(_style2.default.SaveBar_button, (0, _testClass2.default)('toolbar-button-' + label.replace(/\s+/g, '-').toLowerCase()));
  return _react2.default.createElement(
    _Button2.default,
    { autoWidth: true,
      type: isPrimary ? _Button2.default.Type.primaryInverse : _Button2.default.Type.defaultInverse,
      className: className,
      disabled: disabled,
      onClick: onClick,
      linkHref: linkHref,
      linkTo: linkTo },
    label
  );
};

SaveBarButton.propTypes = {
  label: _propTypes2.default.string,
  isPrimary: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  linkHref: _propTypes2.default.string,
  linkTo: _propTypes2.default.string
};

exports.default = SaveBarButton;
//# sourceMappingURL=index.js.map
