'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseRoutes;

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseRoutes(routes, store) {
  if (_is_js2.default.array(routes)) {
    return routes.map(function (route) {
      return parseRoutes(route, store);
    });
  }

  if (_is_js2.default.object(routes) && _is_js2.default.array(routes.childRoutes)) {
    /* eslint no-param-reassign: "off" */
    routes.childRoutes = routes.childRoutes.map(function (route) {
      return parseRoutes(route, store);
    });
    return routes;
  }

  if (_is_js2.default.function(routes)) {
    return parseRoutes(routes(store), store);
  }

  return routes;
}
//# sourceMappingURL=index.js.map
