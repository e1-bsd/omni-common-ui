'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleSignOnSilentRenewRoutes = undefined;

var _SingleSignOnCallback = require('./SingleSignOnCallback');

var _SingleSignOnCallback2 = _interopRequireDefault(_SingleSignOnCallback);

var _SingleSignOnSilentRenew = require('./SingleSignOnSilentRenew');

var _SingleSignOnSilentRenew2 = _interopRequireDefault(_SingleSignOnSilentRenew);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  path: '/callback',
  component: _SingleSignOnCallback2.default
};
var singleSignOnSilentRenewRoutes = exports.singleSignOnSilentRenewRoutes = {
  path: '/silent-renew',
  component: _SingleSignOnSilentRenew2.default
};
//# sourceMappingURL=routes.js.map
