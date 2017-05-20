'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBuildRoute = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createBuildRoute = exports.createBuildRoute = function createBuildRoute(ownProps) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var route = getRoute(args);
    var params = getParams(args);
    if (_is_js2.default.not.object(params) || _is_js2.default.empty(params)) {
      return _path2.default.resolve(ownProps.location.pathname, route);
    }

    var newRoute = '';
    ownProps.routes.forEach(function (routePiece) {
      if (_is_js2.default.not.string(routePiece.path)) {
        return;
      }

      newRoute = _path2.default.join(newRoute, routePiece.path);
    });

    newRoute = _path2.default.resolve(newRoute, route);

    var finalParams = Object.assign({}, ownProps.params, params);
    newRoute = (0, _reactRouter.formatPattern)(newRoute, finalParams);

    return newRoute.replace(/\/$/, '');
  };
};

function getRoute(args) {
  return _is_js2.default.string(args[0]) ? args[0] : '';
}

function getParams(args) {
  if (args.length === 1 && _is_js2.default.object(args[0])) {
    return args[0];
  }

  if (args.length > 1) {
    return args[1];
  }

  return undefined;
}

exports.default = createBuildRoute;
//# sourceMappingURL=index.js.map
