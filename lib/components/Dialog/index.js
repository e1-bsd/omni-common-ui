'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Card = require('./../Card');

var _Card2 = _interopRequireDefault(_Card);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dialog = function Dialog(props) {
  return _react2.default.createElement(
    _reactModal2.default,
    { className: _style2.default.Dialog,
      overlayClassName: _style2.default.Overlay,
      onRequestClose: function onRequestClose(ev) {
        return props.onRequestClose && props.onRequestClose('escape', ev);
      },
      portalClassName: _style2.default.Portal,
      isOpen: props.isOpen },
    _react2.default.createElement(
      _Card2.default,
      { className: (0, _classnames3.default)(_style2.default.Dialog_card, props.className) },
      _react2.default.createElement(
        _Card2.default.Content,
        null,
        props.children
      ),
      props.withCloseButton && _react2.default.createElement(
        'div',
        { className: _style2.default.Dialog_closeIcon,
          onClick: function onClick(ev) {
            return props.onRequestClose && props.onRequestClose('button', ev);
          } },
        _react2.default.createElement(_Icon2.default, { id: 'close' })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames3.default)(_style2.default.LoadingOverlay, _defineProperty({}, _style2.default.__visible, !!props.isLoading)) },
        _react2.default.createElement('div', { className: _style2.default.LoadingOverlay_inner })
      )
    )
  );
};

Dialog.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  isLoading: _propTypes2.default.bool,
  withCloseButton: _propTypes2.default.bool,
  onRequestClose: _propTypes2.default.func, /* called with 'escape' or 'button' arg */
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};

exports.default = Dialog;
//# sourceMappingURL=index.js.map
