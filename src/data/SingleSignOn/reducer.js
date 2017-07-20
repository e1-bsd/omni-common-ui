import { Map } from 'immutable';

import {
  USER_EXPIRED,
  REDIRECT_SUCCESS,
  USER_FOUND,
  SILENT_RENEW_ERROR,
  SESSION_TERMINATED,
  LOADING_USER,
  USER_SIGNED_OUT,
} from './actions';

const initialState = new Map({
  user: null,
  isLoadingUser: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REDIRECT_SUCCESS:
    case USER_FOUND:
      return new Map({
        user: new Map(action.payload),
        isLoadingUser: false,
      });
    case USER_EXPIRED:
    case SILENT_RENEW_ERROR:
    case SESSION_TERMINATED:
    case USER_SIGNED_OUT:
      return new Map({
        user: null,
        isLoadingUser: false,
      });
    case LOADING_USER:
      return state.set('isLoadingUser', true);
    default:
      return state;
  }
};

export default reducer;
