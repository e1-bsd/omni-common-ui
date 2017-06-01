'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
  className: _propTypes2.default.string,
  onSubmit: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onValid: _propTypes2.default.func,
  onInvalid: _propTypes2.default.func,
  children: _propTypes2.default.node
};

exports.default = Form;
//# sourceMappingURL=index.js.map
