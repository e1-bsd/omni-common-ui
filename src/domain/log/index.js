import buildLogToRaven from './buildLogToRaven';
import Config from 'domain/Config';

class log {}
const methods = ['error', 'info', 'log', 'warn', 'debug'];

methods.forEach((method) => {
  log[method] = buildLogMethod(method); // eslint-disable-line no-param-reassign
});

function buildLogMethod(method) {
  const sentry = Config.get('sentry');
  if (sentry && sentry.disabled === true) {
    return (...args) => {
      /* eslint-disable no-console */
      if (window.console && console[method]) {
        return console[method](...args);
      }
      /* eslint-enable no-console */
    };
  }

  const logToRaven = buildLogToRaven(method);
  return (...args) => logToRaven(...args);
}

export default log;
