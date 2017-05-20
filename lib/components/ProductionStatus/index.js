'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ColourLabel = require('./../ColourLabel');

var _ColourLabel2 = _interopRequireDefault(_ColourLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductionStatus = function ProductionStatus(props) {
  var status = props.status,
      initial = props.initial,
      highlighted = props.highlighted;

  var colour = highlighted === true ? '#0087e6' : '#c8c8c8';
  return _react2.default.createElement(_ColourLabel2.default, { text: status, initial: initial, colour: colour });
};

ProductionStatus.propTypes = {
  className: _react2.default.PropTypes.string,
  status: _react2.default.PropTypes.string,
  initial: _react2.default.PropTypes.string,
  highlighted: _react2.default.PropTypes.bool,
  unbreakable: _react2.default.PropTypes.bool
};

exports.default = ProductionStatus;
//# sourceMappingURL=index.js.map
