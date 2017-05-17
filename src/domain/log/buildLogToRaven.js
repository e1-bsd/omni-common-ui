import Raven from 'raven-js';
import { sprintf } from 'sprintf-js';

export default function buildLogToRaven(level) {
  if (level === 'error') {
    return (...args) => {
      if (args.length === 1 && args[0] instanceof Error) {
        return Raven.captureException(args[0], { level });
      }

      return Raven.captureMessage(buildErrorMessage(...args), { level });
    };
  }

  return (...args) => Raven.captureBreadcrumb({
    message: buildErrorMessage(...args),
    level: level === 'warn' ? level : 'info',
  });
}

function buildErrorMessage(...args) {
  const parsedArgs = args.map((item) => (item instanceof Error ? item.stack : item));
  if (/%[bcdieufgosxXj]( |$)/.test(args[0])) {
    return sprintf(...parsedArgs);
  }

  return parsedArgs.join(' ');
}
