import is from 'is_js';
import invariant from 'invariant';
import createApiActionCreator from 'domain/createApiActionCreator';
import { buildUrl } from 'domain/Api';
import log from 'domain/log';

import TimerStrategy from './timer';
import SignalRStrategy from './signalr';

const STRATEGIES = {
  timer: TimerStrategy,
  signalr: SignalRStrategy,
};

export function createNotificationsMiddleware(config = {}) {
  invariant(is.string(config.strategy), 'trigger strategy must be a string');
  invariant(is.object(config.dispatch), 'trigger dispatch must be an object');
  invariant(is.string(config.dispatch.apiUrl), 'dispatch apiUrl must be a string');

  const StrategyClass = STRATEGIES[config.strategy];
  invariant(!! StrategyClass,
      `strategy must be valid (one of ${Object.keys(STRATEGIES).toString()})`);

  let emitter;

  return (store) => (next) => (action) => {
    const state = store.getState();
    const sso = state && state.get('singleSignOn');
    const user = (sso && sso.get('user')) || {};
    if (user && ! is.empty(user)) {
      const accessToken = user.get('access_token');

      if (is.string(accessToken) && ! emitter) {
        emitter = new StrategyClass(config, accessToken);

        emitter.on('notification', () => {
          const {
            method, apiUrl, disableDefault,
          } = config.dispatch;

          const fullUrl = buildUrl(apiUrl);
          const actionExtras = disableDefault ? { disableDefault: true } : {};

          store.dispatch(
              createApiActionCreator({
                actionObjectName: 'NOTIFICATIONS',
                url: fullUrl,
                method,
                requestExtras: actionExtras,  // disableDefault in request, success, failure
                successExtras: actionExtras,
                failureExtras: actionExtras,
              }));
        });

        log.info(`Notification pull strategy: \`${config.strategy}\``);
      }
    }

    return next(action);
  };
}

export default createNotificationsMiddleware;
