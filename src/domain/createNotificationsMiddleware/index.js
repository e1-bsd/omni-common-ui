import is from 'is_js';
import invariant from 'invariant';
import EventEmitter from 'event-emitter';
import createApiActionBoilerplate from 'domain/createApiActionBoilerplate';
import { buildUrl } from 'domain/Api';
import log from 'domain/log';

class Strategy extends EventEmitter {
  constructor(config) {
    super();
    invariant(is.object(config), 'config must be an object');
    this._config = config;
    if (! is.number(config.triggerOnStartAfterMs)) return;
    window.setTimeout(() => {
      this.emit('notification');
    }, config.triggerOnStartAfterMs);
  }
}

class TimerStrategy extends Strategy {
  constructor(config) {
    super(config);
    if (! is.number(config.intervalMs)) return;
    window.setInterval(() => {
      this.emit('notification');
    }, config.intervalMs);
  }
}

class SignalRStrategy extends Strategy {
  constructor(config) {
    super(config);
    invariant(false, 'NOT IMPLEMENTED');
  }
}

const STRATEGIES = {
  timer: TimerStrategy,
  signalr: SignalRStrategy,
};

export function createNotificationsMiddleware(config = {}) {
  invariant(is.string(config.strategy), 'trigger strategy must be a string');
  invariant(is.object(config.dispatch), 'trigger dispatch must be an object');
  invariant(is.string(config.dispatch.requestActionType), 'dispatch requestActionType must be a string');
  invariant(is.string(config.dispatch.successActionType), 'dispatch successActionType must be a string');
  invariant(is.string(config.dispatch.failureActionType), 'dispatch failureActionType must be a string');
  invariant(is.string(config.dispatch.apiUrl), 'dispatch apiUrl must be a string');

  const StrategyClass = STRATEGIES[config.strategy];
  invariant(!! StrategyClass,
      `strategy must be valid (one of ${Object.keys(STRATEGIES).toString()})`);

  return (store) => {
    const emitter = new StrategyClass(config);
    emitter.on('notification', () => {
      const {
        requestActionType,
        successActionType,
        failureActionType,
        method,
        apiUrl,
      } = config.dispatch;

      const fullUrl = buildUrl(apiUrl);

      store.dispatch(
          createApiActionBoilerplate(
              requestActionType, successActionType, failureActionType, fullUrl, method));
    });

    log.info(`Pulling notifications using the \`${config.strategy}\` strategy`);

    return (next) => (action) => next(action);
  };
}

export default createNotificationsMiddleware;
