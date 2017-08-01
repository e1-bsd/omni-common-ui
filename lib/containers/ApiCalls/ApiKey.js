'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _ApiAction = require('./ApiAction');

var _ApiAction2 = _interopRequireDefault(_ApiAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiKey = function () {
  function ApiKey() {
    _classCallCheck(this, ApiKey);
  }

  _createClass(ApiKey, null, [{
    key: 'create',
    value: function create(param) {
      if (_ApiAction2.default.isApiAction(param)) {
        return createFromApiAction(param);
      }

      if (_is_js2.default.not.object(param)) {
        throw new Error('Expected an ApiAction or an object');
      }

      return createFromObject(param);
    }
  }]);

  return ApiKey;
}();

exports.default = ApiKey;


function createFromApiAction(apiAction) {
  return apiAction.method + ' ' + apiAction.url;
}

function createFromObject(_ref) {
  var method = _ref.method,
      url = _ref.url;

  if (_is_js2.default.not.string(method)) {
    throw new Error('The method property should be a string');
  }

  if (_is_js2.default.not.string(url)) {
    throw new Error('The url property should be a string');
  }

  return method.toUpperCase() + ' ' + url.toLowerCase();
}
//# sourceMappingURL=ApiKey.js.map
