import styles from './style.postcss';

import React from 'react';
import { Link } from 'react-router';
import is from 'is_js';
import PathComparator from 'domain/PathComparator';
import classnames from 'classnames';

const LinkComponent = ({ currentPath, to, children }) => {
  if (PathComparator.equal(currentPath, to)) {
    return <div className={classnames(styles.LinkComponent, styles.__current)}>{children}</div>;
  }

  if (is.not.url(to)) {
    return <Link to={to} className={styles.LinkComponent}>{children}</Link>;
  }

  return <a href={to} className={styles.LinkComponent}>{children}</a>;
};

LinkComponent.propTypes = {
  children: React.PropTypes.node,
  to: React.PropTypes.string,
  currentPath: React.PropTypes.string,
};

export default LinkComponent;
