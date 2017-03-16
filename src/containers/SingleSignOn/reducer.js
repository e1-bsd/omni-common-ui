import { Map } from 'immutable';
import { USER_LOADED, USER_UNLOADED } from './actions';

export default function oidc(state = new Map(), action) {
  switch (action.type) {
    case USER_LOADED:
      return state.set('user', action.user);
    case USER_UNLOADED:
      return state.remove('user');
    default:
      return state;
  }
}
