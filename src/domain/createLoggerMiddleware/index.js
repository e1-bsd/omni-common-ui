import { createLogger } from 'redux-logger';
import log from 'domain/log';

export function createLoggerMiddleware() {
  if (PRODUCTION) {
    return () => (next) => (action) => {
      try {
        log.debug('Dispatched action:', JSON.stringify(action, null, 2));
      } catch (e) {
        log.warn('Could not log action:', e);
      }

      return next(action);
    };
  }

  return createLogger();
}

export default createLoggerMiddleware;
