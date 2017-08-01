'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiKey2 = require('./ApiKey');

var _ApiKey3 = _interopRequireDefault(_ApiKey2);

var _ApiAction2 = require('./ApiAction');

var _ApiAction3 = _interopRequireDefault(_ApiAction2);

var _ApiState2 = require('./ApiState');

var _ApiState3 = _interopRequireDefault(_ApiState2);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiCall = function () {
  function ApiCall() {
    _classCallCheck(this, ApiCall);
  }

  _createClass(ApiCall, null, [{
    key: 'find',
    value: function find(state, key) {
      if (_is_js2.default.object(key)) {
        var builtKey = ApiCall.Key.create(key);
        return ApiCall.find(state, builtKey);
      }

      return state.get('apiCalls').get(key);
    }
  }, {
    key: 'shouldPerform',
    value: function shouldPerform(state, key) {
      return ApiCall.State.shouldPerform(ApiCall.find(state, key));
    }
  }, {
    key: 'createAction',
    value: function createAction(action) {
      return ApiCall.Action.create(action);
    }
  }, {
    key: 'clean',
    value: function clean(key) {
      return Object.freeze({
        type: ApiCall.API_CALL_CLEAN,
        key: key
      });
    }
  }, {
    key: 'getErrors',
    value: function getErrors(state) {
      return ApiCall.getAllErrors(state).filter(function (call) {
        return !call.disableDefault;
      });
    }
  }, {
    key: 'getAllErrors',
    value: function getAllErrors(state) {
      return state.get('apiCalls').filter(function (call) {
        return ApiCall.State.hasFailed(call);
      });
    }
  }, {
    key: 'API_CALL_CLEAN',
    get: function get() {
      return 'API_CALL_CLEAN';
    }
  }, {
    key: 'Action',
    get: function get() {
      return _ApiAction3.default;
    },
    set: function set(param) {
      throw new Error('Not allowed to reassign!');
    }
  }, {
    key: 'Key',
    get: function get() {
      return _ApiKey3.default;
    },
    set: function set(param) {
      throw new Error('Not allowed to reassign!');
    }
  }, {
    key: 'State',
    get: function get() {
      return _ApiState3.default;
    },
    set: function set(param) {
      throw new Error('Not allowed to reassign!');
    }
  }]);

  return ApiCall;
}();

exports.default = ApiCall;
//# sourceMappingURL=ApiCall.js.map
