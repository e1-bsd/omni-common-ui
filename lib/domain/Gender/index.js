'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MALE = 'male';
var FEMALE = 'female';
var UNKNOWN = null;

var Gender = function () {
  function Gender() {
    _classCallCheck(this, Gender);
  }

  _createClass(Gender, null, [{
    key: 'isMale',
    value: function isMale(gender) {
      if (_is_js2.default.not.string(gender)) {
        return false;
      }

      return (/^m(ale)?$/i.test(gender)
      );
    }
  }, {
    key: 'isFemale',
    value: function isFemale(gender) {
      if (_is_js2.default.not.string(gender)) {
        return false;
      }

      return (/^f(emale)?$/i.test(gender)
      );
    }
  }, {
    key: 'isUnknown',
    value: function isUnknown(gender) {
      return !Gender.isMale(gender) && !Gender.isFemale(gender);
    }
  }, {
    key: 'parse',
    value: function parse(gender) {
      if (Gender.isMale(gender)) {
        return MALE;
      }

      if (Gender.isFemale(gender)) {
        return FEMALE;
      }

      return UNKNOWN;
    }
  }]);

  return Gender;
}();

exports.default = Gender;
//# sourceMappingURL=index.js.map
