import { List } from 'immutable';
import is from 'is_js';

export default class ErrorPageConfig {
  static get(routes) {
    const routeWithConfig = new List(routes).findLast((route) => is.object(route.errorPage));
    if (is.undefined(routeWithConfig)) {
      return undefined;
    }

    return routeWithConfig.errorPage;
  }
}
