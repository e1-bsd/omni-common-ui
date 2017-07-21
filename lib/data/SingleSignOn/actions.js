'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerSignInRedirect = triggerSignInRedirect;
exports.triggerSignOutRedirect = triggerSignOutRedirect;
exports.userExpired = userExpired;
exports.redirectSuccess = redirectSuccess;
exports.userFound = userFound;
exports.userNotFound = userNotFound;
exports.silentRenewError = silentRenewError;
exports.sessionTerminated = sessionTerminated;
exports.userExpiring = userExpiring;
exports.loadingUser = loadingUser;
exports.userSignedOut = userSignedOut;
exports.loadUserError = loadUserError;
// actions
var TRIGGER_USER_CLEAR = exports.TRIGGER_USER_CLEAR = 'SSO_TRIGGER_USER_CLEAR';
var TRIGGER_SIGNIN_REDIRECT = exports.TRIGGER_SIGNIN_REDIRECT = 'SSO_TRIGGER_SIGNIN_REDIRECT';
var TRIGGER_SIGNOUT_REDIRECT = exports.TRIGGER_SIGNOUT_REDIRECT = 'SSO_TRIGGER_SIGNOUT_REDIRECT';

// state changes
var USER_EXPIRED = exports.USER_EXPIRED = 'SSO_USER_EXPIRED';
var REDIRECT_SUCCESS = exports.REDIRECT_SUCCESS = 'SSO_REDIRECT_SUCCESS';
var USER_FOUND = exports.USER_FOUND = 'SSO_USER_FOUND';
var USER_NOT_FOUND = exports.USER_NOT_FOUND = 'SSO_USER_NOT_FOUND';
var SILENT_RENEW_ERROR = exports.SILENT_RENEW_ERROR = 'SSO_SILENT_RENEW_ERROR';
var USER_EXPIRING = exports.USER_EXPIRING = 'SSO_USER_EXPIRING';
var SESSION_TERMINATED = exports.SESSION_TERMINATED = 'SSO_SESSION_TERMINATED';
var LOADING_USER = exports.LOADING_USER = 'SSO_LOADING_USER';
var USER_SIGNED_OUT = exports.USER_SIGNED_OUT = 'SSO_USER_SIGNED_OUT';
var LOAD_USER_ERROR = exports.LOAD_USER_ERROR = 'SSO_LOAD_USER_ERROR';

function triggerSignInRedirect() {
  var returnUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  return {
    type: TRIGGER_SIGNIN_REDIRECT,
    returnUrl: returnUrl
  };
}

function triggerSignOutRedirect() {
  var returnUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  return {
    type: TRIGGER_SIGNOUT_REDIRECT,
    returnUrl: returnUrl
  };
}

// dispatched when the existing user expired
function userExpired() {
  return {
    type: USER_EXPIRED
  };
}

// dispatched after a successful redirect callback
function redirectSuccess(user) {
  return {
    type: REDIRECT_SUCCESS,
    payload: user
  };
}

// dispatched when a user has been found in storage
function userFound(user) {
  return {
    type: USER_FOUND,
    payload: user
  };
}

// dispatched when a user has been found in storage
function userNotFound() {
  return {
    type: USER_NOT_FOUND
  };
}

// dispatched when silent renew fails
// payload: the error
function silentRenewError(error) {
  return {
    type: SILENT_RENEW_ERROR,
    payload: error
  };
}

// dispatched when the user is logged out
function sessionTerminated() {
  return {
    type: SESSION_TERMINATED
  };
}

// dispatched when the user is expiring (just before a silent renew is triggered)
function userExpiring() {
  return {
    type: USER_EXPIRING
  };
}

// dispatched when a new user is loading
function loadingUser() {
  return {
    type: LOADING_USER
  };
}

function userSignedOut() {
  return {
    type: USER_SIGNED_OUT
  };
}

function loadUserError() {
  return {
    type: LOAD_USER_ERROR
  };
}
//# sourceMappingURL=actions.js.map
