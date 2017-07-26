import buildLogToRaven from './buildLogToRaven';
import Config from 'domain/Config';
import is from 'is_js';

class log {}
const methods = ['error', 'info', 'log', 'warn', 'debug'];

methods.forEach((method) => {
  log[method] = buildLogMethod(method); // eslint-disable-line no-param-reassign
});

function buildLogMethod(method) {
  if (is.not.string(Config.get('sentryDsn')) || is.empty(Config.get('sentryDsn'))) {
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
