import path from 'path';
import is from 'is_js';

import { formatPattern } from 'react-router';

export const createBuildRoute = (ownProps) => (...args) => {
  const route = getRoute(args);
  const params = getParams(args);
  if (is.not.object(params) || is.empty(params)) {
    return path.resolve(ownProps.location.pathname, route);
  }

  let newRoute = '';
  ownProps.routes.forEach((routePiece) => {
    if (is.not.string(routePiece.path)) {
      return;
    }

    newRoute = path.join(newRoute, routePiece.path);
  });

  newRoute = path.resolve(newRoute, route);

  const finalParams = Object.assign({}, ownProps.params, params);
  newRoute = formatPattern(newRoute, finalParams);

  return newRoute.replace(/\/$/, '');
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

export default createBuildRoute;
