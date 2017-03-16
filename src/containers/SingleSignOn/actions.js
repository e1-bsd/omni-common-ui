/* eslint-disable import/prefer-default-export */
export const USER_LOADED = 'USER_LOADED';
export const USER_UNLOADED = 'USER_UNLOADED';

export function userLoaded(user) {
  return (dispatch) => dispatch({
    type: USER_LOADED,
    user,
  });
}

export function userUnloaded() {
  return (dispatch) => dispatch({ type: USER_UNLOADED });
}
