'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Field = function Field(props) {
  var classes = (0, _classnames2.default)(_style2.default.Field, getValidationClasses());
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
      { className: _style2.default.Field_wrap },
      _react2.default.createElement(
        'span',
        { className: _style2.default.Field_wrap_label },
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
  label: _react2.default.PropTypes.string,
  showError: _react2.default.PropTypes.func.isRequired,
  showRequired: _react2.default.PropTypes.func.isRequired,
  getErrorMessage: _react2.default.PropTypes.func.isRequired,
  children: _react2.default.PropTypes.node,
  useLabel: _react2.default.PropTypes.bool
};

exports.default = Field;
//# sourceMappingURL=index.js.map
