import is from 'is_js';

import { formatPattern } from 'react-router';

export const createBuildRoute = (ownProps) => (...args) => {
  const route = getRoute(args);
  const params = getParams(args);
  const root = /^\//.test(route) ? '/' : getRoot(ownProps.routes);
  const finalParams = Object.assign({}, ownProps.params, params);
  return normalizeUrl(formatPattern(`/${root}/${route}`, finalParams));
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

function getRoot(routes = []) {
  let newRoute = '';
  routes.forEach((routePiece) => {
    if (is.not.string(routePiece.path)) {
      return;
    }

    newRoute = `${newRoute}/${routePiece.path}`;
  });

  return newRoute;
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
