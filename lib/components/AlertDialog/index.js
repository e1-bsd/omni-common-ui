'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dialog = require('./../Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Button = require('./../Button');

var _Button2 = _interopRequireDefault(_Button);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AlertDialog = function AlertDialog(_ref) {
  var _classnames;

  var isWarning = _ref.isWarning,
      content1 = _ref.content1,
      content2 = _ref.content2,
      okButtonContent = _ref.okButtonContent,
      onButtonClick = _ref.onButtonClick;

  var iconClassName = (0, _classnames3.default)(_style2.default.AlertDialog_icon, (_classnames = {}, _defineProperty(_classnames, _style2.default.__success, !isWarning), _defineProperty(_classnames, _style2.default.__warning, isWarning), _classnames));
  var primaryContentClassName = content1 && content1.length === 0 ? '' : _style2.default.AlertDialog_content;
  var secondContentClassName = content2 && content2.length === 0 ? '' : _style2.default.AlertDialog_content;
  return _react2.default.createElement(
    _Dialog2.default,
    { isOpen: true },
    _react2.default.createElement(
      'div',
      { className: _style2.default.AlertDialog },
      _react2.default.createElement(_Icon2.default, { id: isWarning ? 'warning' : 'success', className: iconClassName }),
      _react2.default.createElement(
        'div',
        { className: primaryContentClassName },
        _react2.default.createElement(
          'span',
          null,
          content1
        )
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames3.default)(secondContentClassName, _style2.default.AlertDialog_secondContent) },
        _react2.default.createElement(
          'span',
          null,
          content2
        )
      ),
      _react2.default.createElement(
        _Button2.default.Container,
        { className: _style2.default.AlertDialog_buttonWrapper,
          align: 'center' },
        _react2.default.createElement(
          _Button2.default,
          { className: _style2.default.AlertDialog_button,
            type: _Button2.default.Type.primary,
            onClick: function onClick() {
              onButtonClick();
            } },
          okButtonContent
        )
      )
    )
  );
};

AlertDialog.propTypes = {
  isWarning: _propTypes2.default.bool,
  content1: _propTypes2.default.string,
  content2: _propTypes2.default.string,
  okButtonContent: _propTypes2.default.string,
  onButtonClick: _propTypes2.default.func
};

exports.default = AlertDialog;
//# sourceMappingURL=index.js.map
