'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apiCalls;

var _immutable = require('immutable');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function apiCalls() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)();
  var action = arguments[1];

  if (action.type === _2.default.API_CALL_CLEAN) {
    return state.remove(action.key);
  }

  if (!_2.default.Action.isApiAction(action)) {
    return state;
  }

  var key = _2.default.Key.create(action);
  if (_2.default.Action.isStarted(action)) {
    var newState = _2.default.State.createLoading(key, { disableDefault: action.disableDefault });
    return state.set(key, newState);
  }

  if (_2.default.Action.isSuccess(action)) {
    return state.set(key, _2.default.State.createSucceeded(key));
  }

  if (_2.default.Action.isFailure(action)) {
    var _newState = _2.default.State.createFailed(key, action.error, { disableDefault: action.disableDefault });
    return state.set(key, _newState);
  }

  return state;
}
//# sourceMappingURL=reducer.js.map
