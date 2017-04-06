/* eslint-disable import/prefer-default-export */
export const USER_LOADED = 'USER_LOADED';

export function userLoaded(user) {
  return (dispatch) => dispatch({
    type: USER_LOADED,
    user,
  });
}
