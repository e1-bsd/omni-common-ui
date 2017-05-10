import buildLogToRaven from './buildLogToRaven';

class log {}
const methods = ['error', 'info', 'log', 'warn', 'debug'];

methods.forEach((method) => {
  log[method] = buildLogMethod(method); // eslint-disable-line no-param-reassign
});

function buildLogMethod(method) {
  if (! PRODUCTION) {
    return (...args) => {
      /* eslint-disable no-console */
      if (window.console && window.console[method]) {
        return window.console[method](...args);
      }
      /* eslint-enable no-console */
    };
  }

  const logToRaven = buildLogToRaven(method);
  return (...args) => logToRaven(...args);
}

export default log;
