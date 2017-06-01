'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _immutable = require('immutable');

var _Config = require('./../Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrivilegeChecker = function () {
  function PrivilegeChecker() {
    _classCallCheck(this, PrivilegeChecker);
  }

  _createClass(PrivilegeChecker, null, [{
    key: 'hasPrivilege',
    value: function hasPrivilege(state, privilege) {
      if (_Config2.default.get('featureLogin') !== true) {
        return true;
      }

      if (_is_js2.default.not.string(privilege) || _is_js2.default.empty(privilege)) {
        return false;
      }

      var privileges = state.get('privileges');
      if (_is_js2.default.not.object(privileges) || !_immutable.List.isList(privileges.items)) {
        return false;
      }

      var regEx = new RegExp(privilege + '$', 'i');
      return !!privileges.items.find(function (item) {
        return regEx.test(item);
      });
    }
  }]);

  return PrivilegeChecker;
}();

exports.default = PrivilegeChecker;
//# sourceMappingURL=index.js.map
