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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Dialog = require('./../Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Button = require('./../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _testClass = require('./../../domain/testClass');

var _testClass2 = _interopRequireDefault(_testClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfirmDialog = function ConfirmDialog(_ref) {
  var children = _ref.children,
      title = _ref.title,
      content = _ref.content,
      primaryButtonContent = _ref.primaryButtonContent,
      secondaryButtonContent = _ref.secondaryButtonContent,
      onPrimaryClick = _ref.onPrimaryClick,
      onSecondaryClick = _ref.onSecondaryClick,
      _onRequestClose = _ref.onRequestClose,
      isOpen = _ref.isOpen,
      isLoading = _ref.isLoading,
      isButtonless = _ref.isButtonless;
  return _react2.default.createElement(
    _Dialog2.default,
    { isOpen: isOpen,
      withCloseButton: _is_js2.default.function(_onRequestClose),
      isLoading: isLoading,
      onRequestClose: function onRequestClose(source) {
        return _onRequestClose && source === 'button' ? _onRequestClose(source) : null;
      } },
    _react2.default.createElement(
      'div',
      { className: _style2.default.ConfirmDialog },
      title ? _react2.default.createElement(
        'div',
        { className: _style2.default.ConfirmDialog_title },
        title
      ) : _react2.default.createElement(_Icon2.default, { id: 'info', className: _style2.default.ConfirmDialog_icon }),
      _react2.default.createElement(
        'div',
        { className: _style2.default.ConfirmDialog_content },
        _react2.default.createElement(
          'span',
          null,
          content
        ),
        children
      ),
      !isButtonless && _react2.default.createElement(
        _Button2.default.Container,
        { className: _style2.default.ConfirmDialog_buttons,
          align: 'center' },
        _react2.default.createElement(
          _Button2.default,
          { type: _Button2.default.Type.primary,
            className: (0, _classnames2.default)(_style2.default.ConfirmDialog_button, (0, _testClass2.default)('confirm-dialog-primary')),
            onClick: function onClick() {
              return onPrimaryClick();
            } },
          primaryButtonContent
        ),
        secondaryButtonContent && _react2.default.createElement(
          _Button2.default,
          { type: _Button2.default.Type.default,
            className: (0, _classnames2.default)(_style2.default.ConfirmDialog_button, (0, _testClass2.default)('confirm-dialog-secondary')),
            onClick: function onClick() {
              return onSecondaryClick();
            } },
          secondaryButtonContent
        )
      )
    )
  );
};

ConfirmDialog.propTypes = {
  isOpen: _propTypes2.default.bool,
  isLoading: _propTypes2.default.bool,
  isButtonless: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  title: _propTypes2.default.string,
  content: _propTypes2.default.string,
  primaryButtonContent: _propTypes2.default.string.isRequired,
  secondaryButtonContent: _propTypes2.default.string,
  onPrimaryClick: _propTypes2.default.func,
  onSecondaryClick: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func
};

exports.default = ConfirmDialog;
//# sourceMappingURL=index.js.map
