"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = function Radio(props) {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "label",
      null,
      _react2.default.createElement("input", { type: "radio",
        name: props.name,
        onChange: function onChange(e) {
          return handleOptionChecked(e, props.item);
        } }),
      props.item
    )
  );
  function handleOptionChecked(e, item) {
    props.onChecked(e, item);
  }
};

Radio.propTypes = {
  name: _react2.default.PropTypes.string,
  item: _react2.default.PropTypes.string,
  onChecked: _react2.default.PropTypes.func
};

exports.default = Radio;
//# sourceMappingURL=index.js.map
