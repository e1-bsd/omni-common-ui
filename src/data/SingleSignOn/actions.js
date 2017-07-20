export const USER_EXPIRED = 'SSO_USER_EXPIRED';
export const REDIRECT_SUCCESS = 'SSO_REDIRECT_SUCCESS';
export const USER_FOUND = 'SSO_USER_FOUND';
export const USER_NOT_FOUND = 'SSO_USER_NOT_FOUND';
export const SILENT_RENEW_ERROR = 'SSO_SILENT_RENEW_ERROR';
export const USER_EXPIRING = 'SSO_USER_EXPIRING';
export const SESSION_TERMINATED = 'SSO_SESSION_TERMINATED';
export const LOADING_USER = 'SSO_LOADING_USER';
export const USER_SIGNED_OUT = 'SSO_USER_SIGNED_OUT';
export const LOAD_USER_ERROR = 'SSO_LOAD_USER_ERROR';

// dispatched when the existing user expired
export function userExpired() {
  return {
    type: USER_EXPIRED,
  };
}

// dispatched after a successful redirect callback
export function redirectSuccess(user) {
  return {
    type: REDIRECT_SUCCESS,
    payload: user,
  };
}

// dispatched when a user has been found in storage
export function userFound(user) {
  return {
    type: USER_FOUND,
    payload: user,
  };
}

// dispatched when a user has been found in storage
export function userNotFound() {
  return {
    type: USER_NOT_FOUND,
  };
}

// dispatched when silent renew fails
// payload: the error
export function silentRenewError(error) {
  return {
    type: SILENT_RENEW_ERROR,
    payload: error,
  };
}

// dispatched when the user is logged out
export function sessionTerminated() {
  return {
    type: SESSION_TERMINATED,
  };
}

// dispatched when the user is expiring (just before a silent renew is triggered)
export function userExpiring() {
  return {
    type: USER_EXPIRING,
  };
}

// dispatched when a new user is loading
export function loadingUser() {
  return {
    type: LOADING_USER,
  };
}

export function userSignedOut() {
  return {
    type: USER_SIGNED_OUT,
  };
}

export function loadUserError() {
  return {
    type: LOAD_USER_ERROR,
  };
}
