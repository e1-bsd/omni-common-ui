import React from 'react';
import is from 'is_js';
import { Link } from 'react-router';
import styles from './style.postcss';
import classnames from 'classnames';

const Histories = (props) => {
  const currentRoute = props.routes[props.routes.length - 1];
  let history = currentRoute.history;

  if (is.function(currentRoute.canAccess) && (! (currentRoute.canAccess(props)))) return null;

  if (! (is.object(history) || is.function(history))) return null;

  if (is.function(history)) {
    history = history(props);
  }

  if (history && is.not.string(history.link)) return null;

  return <div className={classnames(styles.Histories, props.className)}>
    <Link to={history.link}>HISTORY</Link>
  </div>;
};

Histories.propTypes = {
  className: React.PropTypes.string,
  params: React.PropTypes.object.isRequired,
  routes: React.PropTypes.array.isRequired,
  buildRoute: React.PropTypes.func.isRequired,
};

export default Histories;
