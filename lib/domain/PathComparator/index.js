'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PathComparator = function () {
  function PathComparator() {
    _classCallCheck(this, PathComparator);
  }

  _createClass(PathComparator, null, [{
    key: 'equal',
    value: function equal(a, b) {
      // eslint-disable-next-line no-param-reassign
      a = a.replace(/^\//, '').replace(/\/$/, '');
      return new RegExp('^/?' + a + '/?$', 'i').test(b);
    }
  }]);

  return PathComparator;
}();

exports.default = PathComparator;
//# sourceMappingURL=index.js.map
