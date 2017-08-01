'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setReduxStore = setReduxStore;
exports.getReduxStore = getReduxStore;
exports.getUserCallback = getUserCallback;
exports.errorCallback = errorCallback;
exports.default = loadUser;

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// stores the redux store here to be accessed by all functions
var reduxStore = void 0;

// helper function to set the redux store (for testing)
function setReduxStore(newStore) {
  reduxStore = newStore;
}

// helper function to get the redux store (for testing)
function getReduxStore() {
  return reduxStore;
}

// callback function called when the user has been loaded
function getUserCallback(user) {
  if (user && !user.expired) {
    reduxStore.dispatch((0, _actions.userFound)(user));
  } else if (user && user.expired) {
    reduxStore.dispatch((0, _actions.userExpired)());
  } else {
    reduxStore.dispatch((0, _actions.userNotFound)());
  }
  return user;
}

// error callback called when the userManager's loadUser() function failed
function errorCallback(error) {
  _log2.default.error('loadUser: Error in loadUser(): ' + error.message);
  reduxStore.dispatch((0, _actions.loadUserError)());
}

// function to load the current user into the store
// NOTE: use only when silent renew is configured
function loadUser(store, userManager) {
  if (!store || !store.dispatch) {
    throw new Error('loadUser: You need to pass the redux store into the loadUser helper!');
  }

  if (!userManager || !userManager.getUser) {
    throw new Error('loadUser: You need to pass the userManager into the loadUser helper!');
  }

  reduxStore = store;

  return userManager.getUser().then(getUserCallback).catch(errorCallback);
}
//# sourceMappingURL=loadUser.js.map
