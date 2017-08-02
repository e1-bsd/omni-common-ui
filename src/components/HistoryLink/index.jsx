import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import is from 'is_js';
import { Link } from 'react-router';
import classnames from 'classnames';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';
import testClass from 'domain/testClass';

const HistoryLink = (props) => {
  const currentRoute = props.routes[props.routes.length - 1];
  let history = currentRoute.history;

  if (is.function(currentRoute.canAccess) && (! (currentRoute.canAccess(props)))) return null;

  if (! (is.object(history) || is.function(history))) return null;

  if (is.function(history)) {
    history = history(props);
  }

  if (history && is.not.string(history.link)) return null;

  return <div className={classnames(styles.HistoryLink, props.className, testClass('history-link'))}>
    <Link to={history.link}
        draggable={false}>
      History
      <Icon id="history2" />
    </Link>
  </div>;
};

HistoryLink.propTypes = {
  className: PropTypes.string,
  params: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  buildRoute: PropTypes.func.isRequired,
};

export default pure(HistoryLink);
