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

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorDialog = function ErrorDialog(_ref) {
  var onConfirmClick = _ref.onConfirmClick,
      isOpen = _ref.isOpen;
  return _react2.default.createElement(
    _Dialog2.default,
    { withCloseButton: true,
      isOpen: isOpen,
      onRequestClose: function onRequestClose(source) {
        return source === 'button' ? onConfirmClick() : null;
      } },
    _react2.default.createElement(
      'div',
      { className: _style2.default.ErrorDialog },
      _react2.default.createElement(_Icon2.default, { id: 'warning', className: _style2.default.ErrorDialog_icon }),
      _react2.default.createElement(
        'div',
        { className: _style2.default.ErrorDialog_content },
        _react2.default.createElement(
          'span',
          null,
          'An error occurred!'
        )
      ),
      _react2.default.createElement(
        _Button2.default.Container,
        { className: _style2.default.ErrorDialog_buttons,
          align: 'center' },
        _react2.default.createElement(
          _Button2.default,
          { type: _Button2.default.Type.primary, onClick: function onClick() {
              return onConfirmClick();
            } },
          'OK'
        )
      )
    )
  );
};

ErrorDialog.propTypes = {
  isOpen: _react2.default.PropTypes.bool,
  onConfirmClick: _react2.default.PropTypes.func
};

exports.default = ErrorDialog;
//# sourceMappingURL=index.js.map
