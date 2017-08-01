'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testClass = undefined;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Config = require('./../Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEST_REGEXP = /^[a-z][0-9a-z-_]*$/i;

var _testClass = function _testClass() {};
if (_Config2.default.get('enableTestClasses') === true) {
  _testClass = function _testClass(name) {
    (0, _invariant2.default)(TEST_REGEXP.test(name), 'Test classes must start with a letter and contain only a-z, 0-9, _ and -.');
    return (0, _classnames2.default)('test-' + name);
  };
}

var testClass = exports.testClass = _testClass;
exports.default = testClass;
//# sourceMappingURL=index.js.map
