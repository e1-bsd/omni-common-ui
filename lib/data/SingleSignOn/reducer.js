'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _actions = require('./actions');

var initialState = new _immutable.Map({
  user: null,
  isLoadingUser: false
});

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _actions.REDIRECT_SUCCESS:
    case _actions.USER_FOUND:
      return new _immutable.Map({
        user: new _immutable.Map(action.payload),
        isLoadingUser: false
      });
    case _actions.USER_EXPIRED:
    case _actions.SILENT_RENEW_ERROR:
    case _actions.SESSION_TERMINATED:
    case _actions.USER_SIGNED_OUT:
      return new _immutable.Map({
        user: null,
        isLoadingUser: false
      });
    case _actions.LOADING_USER:
      return state.set('isLoadingUser', true);
    default:
      return state;
  }
};

exports.default = reducer;
//# sourceMappingURL=reducer.js.map
