import is from 'is_js';

import { formatPattern } from 'react-router';

export const createBuildRoute = (ownProps) => (...args) => {
  const route = getRoute(args);
  const params = getParams(args);
  if (/^\//.test(route)) {
    return normalizeUrl(route);
  }

  if (is.not.object(params) || is.empty(params)) {
    return normalizeUrl(`/${ownProps.location.pathname}/${route}`);
  }

  let newRoute = '';
  ownProps.routes.forEach((routePiece) => {
    if (is.not.string(routePiece.path)) {
      return;
    }

    newRoute = `${newRoute}/${routePiece.path}`;
  });

  const finalParams = Object.assign({}, ownProps.params, params);
  return normalizeUrl(formatPattern(`/${newRoute}/${route}`, finalParams));
};

function getRoute(args) {
  return is.string(args[0]) ? args[0] : '';
}

function getParams(args) {
  if (args.length === 1 && is.object(args[0])) {
    return args[0];
  }

  if (args.length > 1) {
    return args[1];
  }

  return undefined;
}

export function normalizeUrl(url) {
  let result = url.replace(/(^|[\w-])\/+/gi, '$1/'); // Gets rid of duplicated slashes (//)
  while (true) { // Interprets two dots (..), going up in the path for each occurrence
    const newResult = result.replace(/((^\/)|[\w-]*\/)\.\.\/?/gi, '$2');
    if (result === newResult) {
      break;
    }

    result = newResult;
  }
  result = result.replace(/(\/\.|\.\/)/g, ''); // Gets rid of ./
  result = result.replace(/\/$/, '');

  return result;
}

export default createBuildRoute;
