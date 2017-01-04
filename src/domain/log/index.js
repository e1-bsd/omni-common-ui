import Raven from 'raven-js';
import log from 'loglevel';

export default class Log {
  static trace(message) {
    log.trace(message);
  }

  static debug(message) {
    Raven.captureMessage(message, { level: 'info' });
    log.debug(message);
  }

  static info(message) {
    Raven.captureMessage(message, { level: 'info' });
    log.info(message);
  }

  static warn(message) {
    Raven.captureMessage(message, { level: 'warning' });
    log.info(message);
  }

  static error(message) {
    Raven.captureMessage(message, { level: 'error' });
    log.info(message);
  }
}
