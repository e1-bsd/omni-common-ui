import log from 'domain/log';
import is from 'is_js';

const ACCEPTABLE_LABELS_TYPES = new Set(['string', 'object', 'function']);
const ALWAYS_APPLIED_PARAMS = { mode: '' };

export default {
  buildWithProps: (props) => {
    const { params, routes, buildRoute } = props;

    const getRouteSegments = () =>
      routes.filter((route) => is.string(route.path));

    const buildRouteHref = (toRouteIdx) => {
      const paths = getRouteSegments()
        .slice(0, toRouteIdx + 1)
        .map((route) => route.path);
      const path = paths.join('/');
      return buildRoute(path,
          Object.assign({}, params, ALWAYS_APPLIED_PARAMS || {}));
    };

    const breadcrumbs = [];

    getRouteSegments().forEach((routeDescriptor, routeIdx) => {
      let labels = routeDescriptor.breadcrumbLabels;
      if (! ACCEPTABLE_LABELS_TYPES.has(typeof labels)) return;
      if (is.function(labels)) {
        try {
          labels = labels(props);
        } catch (err) {
          log.warn(`Error in \`breadcrumbLabels\` in route \`${routeDescriptor.path}\``, err);
        }
      }
      labels = is.array(labels) ? labels : [labels];
      Array.prototype.push.apply(breadcrumbs,
        labels.filter((l) => l).map((labelOrObject) => ({
          label: labelOrObject.label || labelOrObject,
          href: labelOrObject.href || buildRouteHref(routeIdx),
          clickable: is.boolean(labelOrObject.clickable) ? labelOrObject.clickable : true,
          hidden: is.boolean(labelOrObject.hidden) ? labelOrObject.hidden : false,
          backLinkHref: is.string(labelOrObject.backLinkHref) ? labelOrObject.backLinkHref : null,
        })));
    });

    // the last one shouldn't be clickable
    if (breadcrumbs.length > 1) {
      breadcrumbs[breadcrumbs.length - 1].clickable = false;
    }

    return breadcrumbs;
  },
};
