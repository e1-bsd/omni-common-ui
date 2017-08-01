'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBuildRoute = undefined;
exports.normalizeUrl = normalizeUrl;

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
    var root = /^\//.test(route) ? '/' : getRoot(ownProps.routes);
    var finalParams = Object.assign({}, ownProps.params, params);
    return normalizeUrl((0, _reactRouter.formatPattern)('/' + root + '/' + route, finalParams));
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

function getRoot() {
  var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var newRoute = '';
  routes.forEach(function (routePiece) {
    if (_is_js2.default.not.string(routePiece.path)) {
      return;
    }

    newRoute = newRoute + '/' + routePiece.path;
  });

  return newRoute;
}

function normalizeUrl(url) {
  var result = url.replace(/(^|[\w-])\/+/gi, '$1/'); // Gets rid of duplicated slashes (//)
  while (true) {
    // Interprets two dots (..), going up in the path for each occurrence
    var newResult = result.replace(/((^\/)|[\w-]*\/)\.\.\/?/gi, '$2');
    if (result === newResult) {
      break;
    }

    result = newResult;
  }
  result = result.replace(/(\/\.|\.\/)/g, ''); // Gets rid of ./
  result = result.replace(/\/$/, '');

  return result;
}

exports.default = createBuildRoute;
//# sourceMappingURL=index.js.map
