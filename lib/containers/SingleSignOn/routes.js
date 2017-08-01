'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callbackRoute = undefined;

var _SingleSignOnCallback = require('./SingleSignOnCallback');

var _SingleSignOnCallback2 = _interopRequireDefault(_SingleSignOnCallback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callbackRoute = exports.callbackRoute = {
  path: '/callback',
  component: _SingleSignOnCallback2.default
};

exports.default = [callbackRoute];
//# sourceMappingURL=routes.js.map
