'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ColourLabel = require('./../ColourLabel');

var _ColourLabel2 = _interopRequireDefault(_ColourLabel);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductionStatus = function ProductionStatus(props) {
  var status = props.status,
      initial = props.initial,
      highlighted = props.highlighted;

  var colour = highlighted === true ? '#0087e6' : '#c8c8c8';
  return _react2.default.createElement(_ColourLabel2.default, { text: status, initial: initial, colour: colour });
};

ProductionStatus.propTypes = {
  className: _propTypes2.default.string,
  status: _propTypes2.default.string,
  initial: _propTypes2.default.string,
  highlighted: _propTypes2.default.bool,
  unbreakable: _propTypes2.default.bool
};

exports.default = ProductionStatus;
//# sourceMappingURL=index.js.map
