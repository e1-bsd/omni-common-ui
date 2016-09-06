import {
  SESSION_TERMINATED,
  USER_EXPIRED,
  USER_EXPIRING,
  reducer as oidcReducer,
} from 'redux-oidc';
import { combineReducers } from 'redux-immutable';
import { RESET_USER_EXPIRING, STORE_TOKEN_LIFE_TIME } from './actions';

const LOAD_SUBSCRIPTIONS_SUCCESS = 'redux-oidc-sample/LOAD_SUBSCRIPTIONS_SUCCESS';
const initialState = {
  channels: [],
  isExpiring: false,
};

function subscriptionsReducer(state = initialState, action) {
  switch (action.type) {
    case USER_EXPIRING:
      return Object.assign({}, state, { isExpiring: true });
    case RESET_USER_EXPIRING:
      return Object.assign({}, state, { isExpiring: false });
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign({}, state, { channels: [] });
    case LOAD_SUBSCRIPTIONS_SUCCESS:
      return Object.assign({}, state, { channels: action.payload });
    default:
      return state;
  }
}

function tokenLifeTime(state = - 1, action) {
  switch (action.type) {
    case STORE_TOKEN_LIFE_TIME:
      return action.tokenLifeTime;
    default:
      return state;
  }
}

const reducer = combineReducers({
  oidc: oidcReducer,
  subscriptions: subscriptionsReducer,
  tokenLifeTime,
});

export default reducer;
