'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _object = require('object.values');

var _object2 = _interopRequireDefault(_object);

var _object3 = require('object.entries');

var _object4 = _interopRequireDefault(_object3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bindPolyfills = function bindPolyfills() {
  if (!Object.values) {
    _object2.default.shim();
  }

  if (!Object.entries) {
    _object4.default.shim();
  }
};

exports.default = bindPolyfills;
//# sourceMappingURL=index.js.map
