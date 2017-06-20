'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = undefined;

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Field = exports.Field = function Field(props) {
  var classes = (0, _classnames4.default)(_style2.default.Field, props.className, getValidationClasses(), _defineProperty({}, _style2.default.__stackedHorizontally, props.neighborStackMode === 'horizontal'));
  if (props.useLabel === true) {
    return _react2.default.createElement(
      'label',
      { className: classes },
      renderInner()
    );
  }

  return _react2.default.createElement(
    'div',
    { className: classes },
    renderInner()
  );

  function renderInner() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames4.default)(_style2.default.Field_wrap, _defineProperty({}, _style2.default.__stackedVertically, props.innerStackMode === 'vertical')) },
      _react2.default.createElement(
        'span',
        { className: (0, _classnames4.default)(_style2.default.Field_wrap_label, props.labelTextClassName) },
        props.label
      ),
      _react2.default.createElement(
        'div',
        { className: _style2.default.Field_wrap_inputContainer },
        props.children,
        renderError()
      )
    );
  }

  function renderError() {
    if (!props.showError()) {
      return;
    }

    return _react2.default.createElement(
      'span',
      { className: _style2.default.Field_wrap_inputContainer_validationError },
      getErrorMessage()
    );
  }

  function getValidationClasses() {
    if (props.showError()) {
      return _style2.default.__error;
    }

    if (props.showRequired()) {
      return _style2.default.__required;
    }
  }

  function getErrorMessage() {
    if (props.showRequired()) {
      return 'This field is required';
    }

    return props.getErrorMessage();
  }
};

Field.propTypes = {
  className: _propTypes2.default.string,
  labelTextClassName: _propTypes2.default.string,
  label: _propTypes2.default.string,
  showError: _propTypes2.default.func.isRequired,
  showRequired: _propTypes2.default.func.isRequired,
  getErrorMessage: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node,
  useLabel: _propTypes2.default.bool,
  neighborStackMode: _propTypes2.default.oneOf(['default', 'horizontal']),
  innerStackMode: _propTypes2.default.oneOf(['horizontal', 'vertical']) // default: horizontal
};

exports.default = (0, _pure2.default)(Field);
//# sourceMappingURL=index.js.map
