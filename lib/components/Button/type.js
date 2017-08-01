'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Type = undefined;
exports.validateType = validateType;

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Type = exports.Type = {
  default: (0, _classnames2.default)(_style2.default.Button, _style2.default.__default),
  defaultInverse: (0, _classnames2.default)(_style2.default.Button, _style2.default.__default, _style2.default.__inverse),
  primary: (0, _classnames2.default)(_style2.default.Button, _style2.default.__primary),
  primaryInverse: (0, _classnames2.default)(_style2.default.Button, _style2.default.__primary, _style2.default.__inverse),
  correct: (0, _classnames2.default)(_style2.default.Button, _style2.default.__correct),
  wrong: (0, _classnames2.default)(_style2.default.Button, _style2.default.__wrong),
  needsAttention: (0, _classnames2.default)(_style2.default.Button, _style2.default.__needsAttention),
  black: (0, _classnames2.default)(_style2.default.Button, _style2.default.__black)
};

function validateType(type) {
  if (Object.keys(Type).some(function (k) {
    return Type[k] === type;
  })) {
    return true;
  }
  throw new Error('Type "' + type + '" is not valid! Use the Type object provided');
}
//# sourceMappingURL=type.js.map
