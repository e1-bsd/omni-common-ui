import { createLogger } from 'redux-logger';
import log from 'domain/log';
import Config from 'domain/Config';

export function createLoggerMiddleware() {
  const sentry = Config.get('sentry');
  if (sentry && sentry.disabled === true) {
    return createLogger();
  }

  return () => (next) => (action) => {
    try {
      log.debug('Dispatched action:', JSON.stringify(action, null, 2));
    } catch (e) {
      log.warn('Could not log action:', e);
    }

    return next(action);
  };
}

export default createLoggerMiddleware;
