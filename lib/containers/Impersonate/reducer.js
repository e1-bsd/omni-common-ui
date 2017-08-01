'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('./actions');

var _immutable = require('immutable');

var _ApiResponseHelper = require('./../../domain/ApiResponseHelper');

var _ApiResponseHelper2 = _interopRequireDefault(_ApiResponseHelper);

var _reduxImmutable = require('redux-immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/prefer-default-export: "off" */
exports.default = (0, _reduxImmutable.combineReducers)({
  postedImpersonate: postedImpersonate
});


function postedImpersonate() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)({});
  var action = arguments[1];

  switch (action.type) {
    case _actions.POST_IMPERSONATE_REQUEST:
      return state.set('impersonate', _ApiResponseHelper2.default.create({ loading: true }));
    case _actions.POST_IMPERSONATE_SUCCESS:
      return state.set('impersonate', _ApiResponseHelper2.default.create(action.payload));
    case _actions.CLEAR_IMPERSONATE_DATA:
      return (0, _immutable.Map)({});
    default:
      return state;
  }
}
//# sourceMappingURL=reducer.js.map
