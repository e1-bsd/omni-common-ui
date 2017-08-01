'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = privileges;

var _actions = require('./actions');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function privileges() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _model2.default.create();
  var action = arguments[1];

  switch (action.type) {
    case _actions.FETCH_PRIVILEGES_SUCCESS:
      return _model2.default.create({ items: action.privileges });
    case _actions.FETCH_PRIVILEGES_INVALIDATE:
      return _model2.default.create({ items: state.items, didInvalidate: true });
    case _actions.FETCH_PRIVILEGES_REQUEST:
    case _actions.FETCH_PRIVILEGES_FAILURE:
      return _model2.default.create(); // Removes the data.
    default:
      return state;
  }
}
//# sourceMappingURL=reducer.js.map
