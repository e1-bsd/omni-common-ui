'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userManager = exports.IdleTimeoutHandler = exports.SingleSignOnProvider = exports.singleSignOnMiddleware = exports.routes = exports.reducer = exports.SingleSignOnHandler = undefined;

var _userManager2 = require('./userManager');

var _userManager3 = _interopRequireDefault(_userManager2);

var _SingleSignOnHandler2 = require('./SingleSignOnHandler');

var _SingleSignOnHandler3 = _interopRequireDefault(_SingleSignOnHandler2);

var _reducer2 = require('./reducer');

var _reducer3 = _interopRequireDefault(_reducer2);

var _routes2 = require('./routes');

var _routes3 = _interopRequireDefault(_routes2);

var _reduxOidc = require('redux-oidc');

var _reduxOidc2 = _interopRequireDefault(_reduxOidc);

var _SingleSignOnProvider2 = require('./SingleSignOnProvider');

var _SingleSignOnProvider3 = _interopRequireDefault(_SingleSignOnProvider2);

var _IdleTimeoutHandler2 = require('./IdleTimeoutHandler');

var _IdleTimeoutHandler3 = _interopRequireDefault(_IdleTimeoutHandler2);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleSignOnHandler = exports.SingleSignOnHandler = _SingleSignOnHandler3.default;
var reducer = exports.reducer = _reducer3.default;
var routes = exports.routes = [_routes3.default, _routes2.singleSignOnSilentRenewRoutes];
var singleSignOnMiddleware = exports.singleSignOnMiddleware = _Config2.default.get('featureLogin') === true ? (0, _reduxOidc2.default)(_userManager3.default, null, true) : function () {
    return function (next) {
        return function (action) {
            return next(action);
        };
    };
}; // Just an dummy middleware.
var SingleSignOnProvider = exports.SingleSignOnProvider = _SingleSignOnProvider3.default;
var IdleTimeoutHandler = exports.IdleTimeoutHandler = _IdleTimeoutHandler3.default;
var userManager = exports.userManager = _userManager3.default;
//# sourceMappingURL=index.js.map
