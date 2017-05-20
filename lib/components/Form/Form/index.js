'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = function Form(props) {
  return _react2.default.createElement(
    'div',
    { className: props.className },
    _react2.default.createElement(
      _formsyReact.Form,
      { onSubmit: props.onSubmit,
        onChange: props.onChange,
        onValid: props.onValid,
        onInvalid: props.onInvalid },
      props.children
    )
  );
};

Form.propTypes = {
  className: _react2.default.PropTypes.string,
  onSubmit: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  onValid: _react2.default.PropTypes.func,
  onInvalid: _react2.default.PropTypes.func,
  children: _react2.default.PropTypes.node
};

exports.default = Form;
//# sourceMappingURL=index.js.map
