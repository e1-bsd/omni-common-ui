'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('rc-tooltip/assets/bootstrap.css');

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = function Tooltip(props) {
  if (_is_js2.default.not.string(props.text) || _is_js2.default.empty(props.text)) {
    return _react2.default.createElement(
      'div',
      { className: props.className },
      'props.children'
    );
  }

  var placement = _is_js2.default.existy(props.placement) ? props.placement : 'top';
  var overlayClassName = _is_js2.default.existy(props.overlayClassName) ? (0, _classnames2.default)(_style2.default.Tooltip_bubble, props.overlayClassName) : _style2.default.Tooltip_bubble;
  var trigger = _is_js2.default.existy(props.trigger) ? props.trigger : ['hover'];

  return _react2.default.createElement(
    _rcTooltip2.default,
    { placement: placement,
      trigger: trigger,
      destroyPopupOnHide: true,
      overlay: _react2.default.createElement(
        'div',
        null,
        props.text
      ),
      overlayClassName: overlayClassName },
    _react2.default.createElement(
      'div',
      { className: props.className },
      props.children
    )
  );
};

Tooltip.propTypes = {
  children: _propTypes2.default.node,
  text: _propTypes2.default.string,
  className: _propTypes2.default.string,
  placement: _propTypes2.default.string,
  overlayClassName: _propTypes2.default.string,
  trigger: _propTypes2.default.any
};

exports.default = (0, _pure2.default)(Tooltip);
//# sourceMappingURL=index.js.map
