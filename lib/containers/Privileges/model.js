'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrivilegesRecord = _immutable2.default.Record({
  didInvalidate: false,
  items: undefined
});

var Privileges = function (_PrivilegesRecord) {
  _inherits(Privileges, _PrivilegesRecord);

  function Privileges() {
    _classCallCheck(this, Privileges);

    return _possibleConstructorReturn(this, (Privileges.__proto__ || Object.getPrototypeOf(Privileges)).apply(this, arguments));
  }

  return Privileges;
}(PrivilegesRecord);

Privileges.create = function (data) {
  return new Privileges(data).update('items', function (items) {
    return new _immutable.List(items);
  });
};

exports.default = Privileges;
//# sourceMappingURL=model.js.map
