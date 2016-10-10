const LOAD_SUBSCRIPTIONS_START = 'redux-oidc-sample/LOAD_SUBSCRIPTIONS_START';
const LOAD_SUBSCRIPTIONS_SUCCESS = 'redux-oidc-sample/LOAD_SUBSCRIPTIONS_SUCCESS';
export const RESET_USER_EXPIRING = 'RESET_USER_EXPIRING';
export const STORE_TOKEN_LIFE_TIME = 'storeTokenLifeTime';

export function loadSubscriptionsStart() {
  return {
    type: LOAD_SUBSCRIPTIONS_START,
  };
}

export function loadSubscriptionsSuccess(channels) {
  return {
    type: LOAD_SUBSCRIPTIONS_SUCCESS,
    payload: channels,
  };
}

export function resetUserExpiring() {
  return {
    type: RESET_USER_EXPIRING,
  };
}

export function storeTokenLifeTime(tokenLifeTime) {
  return {
    type: STORE_TOKEN_LIFE_TIME,
    tokenLifeTime,
  };
}
