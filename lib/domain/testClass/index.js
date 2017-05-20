'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testClass = undefined;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Config = require('./../Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _testClass = function _testClass() {};
if (_Config2.default.get('enableTestClasses') === true) {
  _testClass = function _testClass(name) {
    return (0, _classnames2.default)('test-' + name);
  };
}

var testClass = exports.testClass = _testClass;
exports.default = testClass;
//# sourceMappingURL=index.js.map
