"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GlobalTimer = function () {
  function GlobalTimer() {
    _classCallCheck(this, GlobalTimer);

    this._timerHandler = undefined;
  }

  _createClass(GlobalTimer, [{
    key: "invoke",
    value: function invoke(callback, duration) {
      this.cancel();
      this._timerHandler = setTimeout(callback, duration);
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this._timerHandler) {
        clearTimeout(this._timerHandler);
        this._timerHandler = undefined;
      }
    }
  }]);

  return GlobalTimer;
}();

exports.default = GlobalTimer;
//# sourceMappingURL=Timer.js.map
