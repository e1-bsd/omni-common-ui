'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorPageConfig = function () {
  function ErrorPageConfig() {
    _classCallCheck(this, ErrorPageConfig);
  }

  _createClass(ErrorPageConfig, null, [{
    key: 'get',
    value: function get(routes) {
      var routeWithConfig = new _immutable.List(routes).findLast(function (route) {
        return _is_js2.default.object(route.errorPage);
      });
      if (_is_js2.default.undefined(routeWithConfig)) {
        return undefined;
      }

      return routeWithConfig.errorPage;
    }
  }]);

  return ErrorPageConfig;
}();

exports.default = ErrorPageConfig;
//# sourceMappingURL=index.js.map
