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

var _Dialog = require('./../Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Button = require('./../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

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
            className: _style2.default.ConfirmDialog_button,
            onClick: function onClick() {
              return onPrimaryClick();
            } },
          primaryButtonContent
        ),
        secondaryButtonContent && _react2.default.createElement(
          _Button2.default,
          { type: _Button2.default.Type.default,
            className: _style2.default.ConfirmDialog_button,
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
  isOpen: _react2.default.PropTypes.bool,
  isLoading: _react2.default.PropTypes.bool,
  isButtonless: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.node,
  title: _react2.default.PropTypes.string,
  content: _react2.default.PropTypes.string,
  primaryButtonContent: _react2.default.PropTypes.string.isRequired,
  secondaryButtonContent: _react2.default.PropTypes.string,
  onPrimaryClick: _react2.default.PropTypes.func,
  onSecondaryClick: _react2.default.PropTypes.func,
  onRequestClose: _react2.default.PropTypes.func
};

exports.default = ConfirmDialog;
//# sourceMappingURL=index.js.map
