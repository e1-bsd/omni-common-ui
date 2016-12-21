import React from 'react';
import log from 'loglevel';
import is from 'is_js';

import Breadcrumbs from 'components/Breadcrumbs';

const ACCEPTABLE_LABELS_TYPES = new Set(['string', 'object', 'function']);
const ALWAYS_APPLIED_PARAMS = { mode: '' };

const RouteBreadcrumbs = (props) => {
  const { params, routes, buildRoute, className } = props;

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
      labels.filter((l) => l).map((label) => ({
        label: label.label || label,
        href: label.href || buildRouteHref(routeIdx),
        clickable: is.boolean(label.clickable) ? label.clickable : true,
      })));
  });

  if (! breadcrumbs.length || breadcrumbs.length <= 1) return null;

  // the last one shouldn't be clickable
  if (breadcrumbs.length > 1) {
    breadcrumbs[breadcrumbs.length - 1].clickable = false;
  }

  return <Breadcrumbs className={className} items={breadcrumbs} />;
};

RouteBreadcrumbs.propTypes = {
  className: React.PropTypes.string,
  params: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
  routes: React.PropTypes.array.isRequired,
  buildRoute: React.PropTypes.func.isRequired,
};

export default RouteBreadcrumbs;
