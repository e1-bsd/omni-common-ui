import path from 'path';
import is from 'is_js';

export const createBuildRoute = (ownProps) => (...args) => {
  const route = getRoute(args);
  const params = getParams(args);
  if (is.not.object(params) || is.empty(params)) {
    return path.resolve(ownProps.location.pathname, route);
  }

  let newRoute = '';
  ownProps.routes.forEach((routePiece) => {
    newRoute = path.join(newRoute, routePiece.path);
  });

  newRoute = path.resolve(newRoute, route);

  const finalParams = Object.assign({}, ownProps.params, params);
  Object.keys(finalParams).forEach((param) => {
    newRoute = newRoute.replace(`:${param}`, finalParams[param]);
  });

  return newRoute;
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
