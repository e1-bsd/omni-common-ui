import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const PageCardContent = (props) => {
  const { className } = props;

  return <div className={classnames(styles.PageCardContent, className)}>
    {props.children}
  </div>;
};

PageCardContent.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default PageCardContent;
