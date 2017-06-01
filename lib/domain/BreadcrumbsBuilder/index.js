'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _log = require('./../log');

var _log2 = _interopRequireDefault(_log);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACCEPTABLE_LABELS_TYPES = new Set(['string', 'object', 'function']);
var ALWAYS_APPLIED_PARAMS = { mode: '' };

exports.default = {
  buildWithProps: function buildWithProps(props) {
    var params = props.params,
        routes = props.routes,
        buildRoute = props.buildRoute;


    var getRouteSegments = function getRouteSegments() {
      return routes.filter(function (route) {
        return _is_js2.default.string(route.path);
      });
    };

    var buildRouteHref = function buildRouteHref(toRouteIdx) {
      var paths = getRouteSegments().slice(0, toRouteIdx + 1).map(function (route) {
        return route.path;
      });
      var path = paths.join('/');
      return buildRoute(path, Object.assign({}, params, ALWAYS_APPLIED_PARAMS || {}));
    };

    var breadcrumbs = [];

    getRouteSegments().forEach(function (routeDescriptor, routeIdx) {
      var labels = routeDescriptor.breadcrumbLabels;
      if (!ACCEPTABLE_LABELS_TYPES.has(typeof labels === 'undefined' ? 'undefined' : _typeof(labels))) return;
      if (_is_js2.default.function(labels)) {
        try {
          labels = labels(props);
        } catch (err) {
          _log2.default.warn('Error in `breadcrumbLabels` in route `' + routeDescriptor.path + '`', err);
        }
      }
      labels = _is_js2.default.array(labels) ? labels : [labels];
      Array.prototype.push.apply(breadcrumbs, labels.filter(function (l) {
        return l;
      }).map(function (labelOrObject) {
        return {
          label: labelOrObject.label || labelOrObject,
          href: labelOrObject.href || buildRouteHref(routeIdx),
          clickable: _is_js2.default.boolean(labelOrObject.clickable) ? labelOrObject.clickable : true,
          hidden: _is_js2.default.boolean(labelOrObject.hidden) ? labelOrObject.hidden : false,
          backLinkHref: _is_js2.default.string(labelOrObject.backLinkHref) ? labelOrObject.backLinkHref : null
        };
      }));
    });

    // the last one shouldn't be clickable
    if (breadcrumbs.length > 1) {
      breadcrumbs[breadcrumbs.length - 1].clickable = false;
    }

    return breadcrumbs;
  }
};
//# sourceMappingURL=index.js.map
