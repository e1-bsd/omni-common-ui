import Raven from 'raven-js';
import log from 'loglevel';

if (! PRODUCTION) {
  log.enableAll();
} else {
  log.setLevel('error');
}

export default class Log {
  static trace(message) {
    log.trace(message);
  }

  static debug(message) {
    Raven.captureBreadcrumb({ message, level: 'debug' });
    log.debug(message);
  }

  static info(message) {
    Raven.captureBreadcrumb({ message, level: 'info' });
    log.info(message);
  }

  static warn(message) {
    Raven.captureBreadcrumb({ message, level: 'warn' });
    log.warn(message);
  }

  static error(message) {
    if (message instanceof Error) {
      Raven.captureException(message, { level: 'error' });
    } else {
      Raven.captureMessage(message, { level: 'error' });
    }
    log.error(message);
  }
}
