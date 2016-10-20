import is from 'is_js';

export default function parseRoutes(routes, store) {
  if (is.array(routes)) {
    return routes.map((route) => parseRoutes(route, store));
  }

  if (is.object(routes) && is.array(routes.childRoutes)) {
    /* eslint no-param-reassign: "off" */
    routes.childRoutes = routes.childRoutes.map((route) => parseRoutes(route, store));
    return routes;
  }

  if (is.function(routes)) {
    return parseRoutes(routes(store), store);
  }

  return routes;
}
