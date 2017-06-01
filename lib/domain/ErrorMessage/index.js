'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var set = false;
var map = void 0;

var ErrorMessage = function () {
  function ErrorMessage() {
    _classCallCheck(this, ErrorMessage);
  }

  _createClass(ErrorMessage, null, [{
    key: 'for',
    value: function _for(key) {
      if (_is_js2.default.not.object(map)) {
        return undefined;
      }

      return map[key];
    }
  }, {
    key: 'getMap',
    value: function getMap() {
      return map;
    }
  }, {
    key: 'setMap',
    value: function setMap(newMap) {
      if (set !== false) {
        throw new Error('ErrorMessage map has already been set!');
      }

      set = true;

      if (_is_js2.default.object(newMap)) {
        map = Object.freeze(Object.assign({}, newMap));
      }
    }
  }]);

  return ErrorMessage;
}();

exports.default = ErrorMessage;
//# sourceMappingURL=index.js.map
