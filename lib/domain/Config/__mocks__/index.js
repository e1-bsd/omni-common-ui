'use strict';

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapMock = function MapMock() {
  _classCallCheck(this, MapMock);

  this._realMap = new _immutable.Map();
};

var methods = Object.getOwnPropertyNames(_immutable.Map.prototype);
methods.forEach(function (method) {
  if (/(^[^a-z])|(contructor)/.test(method)) return;

  MapMock.prototype[method] = function () {
    var _realMap;

    // eslint-disable-line func-names
    var result = (_realMap = this._realMap)[method].apply(_realMap, arguments);
    if (_immutable.Map.isMap(result)) {
      this._realMap = result;
      return this;
    }

    return result;
  };
});

module.exports = new MapMock();
//# sourceMappingURL=index.js.map
