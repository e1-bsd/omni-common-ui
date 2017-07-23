import { Map } from 'immutable';

import {
  USER_EXPIRED,
  REDIRECT_SUCCESS,
  USER_FOUND,
  SESSION_TERMINATED,
  LOADING_USER,
  USER_SIGNED_OUT,
  TRIGGER_USER_CLEAR,
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
    case SESSION_TERMINATED:
    case USER_SIGNED_OUT:
    case TRIGGER_USER_CLEAR:
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
