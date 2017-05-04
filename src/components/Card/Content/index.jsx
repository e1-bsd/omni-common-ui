import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Content = (props) => {
  const className = classnames(props.className, styles.Content,
    { [styles.__bottomless]: props.withoutBottomPadding });
  return <div className={className}>
    {props.children}
  </div>;
};

Content.propTypes = {
  className: React.PropTypes.string,
  withoutBottomPadding: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default Content;
