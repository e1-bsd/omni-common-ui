import styles from './style.postcss';
import React from 'react';
import is from 'is_js';
import { Link } from 'react-router';
import classnames from 'classnames';
import Icon from 'components/Icon';

const HistoryLink = (props) => {
  const currentRoute = props.routes[props.routes.length - 1];
  let history = currentRoute.history;

  if (is.function(currentRoute.canAccess) && (! (currentRoute.canAccess(props)))) return null;

  if (! (is.object(history) || is.function(history))) return null;

  if (is.function(history)) {
    history = history(props);
  }

  if (history && is.not.string(history.link)) return null;

  return <div className={classnames(styles.HistoryLink, props.className)}>
    <Link to={history.link}
        draggable={false}>
      History
      <Icon id="history2" />
    </Link>
  </div>;
};

HistoryLink.propTypes = {
  className: React.PropTypes.string,
  params: React.PropTypes.object.isRequired,
  routes: React.PropTypes.array.isRequired,
  buildRoute: React.PropTypes.func.isRequired,
};

export default HistoryLink;
