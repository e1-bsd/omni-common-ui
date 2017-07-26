import { createLogger } from 'redux-logger';
import log from 'domain/log';
import Config from 'domain/Config';
import is from 'is_js';

export function createLoggerMiddleware() {
  if (is.not.string(Config.get('sentryDsn')) || is.empty(Config.get('sentryDsn'))) {
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
