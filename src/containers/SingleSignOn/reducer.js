import { Map } from 'immutable';
import { USER_LOADED } from './actions';

export default function oidc(state = new Map(), action) {
  switch (action.type) {
    case USER_LOADED:
      return state.set('user', action.user);
    default:
      return state;
  }
}
