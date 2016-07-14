import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const getClassNames = (isLeftPaddingRequiredInContentArea) => {
  if (isLeftPaddingRequiredInContentArea) {
    return classnames(styles.Content, styles.__withLeftPadding);
  }
  return classnames(styles.Content);
};

const Content = (props, { isLeftPaddingRequiredInContentArea }) => <div className={
    getClassNames(isLeftPaddingRequiredInContentArea)}>
  {props.children}
</div>;

Content.contextTypes = {
  isLeftPaddingRequiredInContentArea: React.PropTypes.bool,
};

Content.propTypes = {
  children: React.PropTypes.node,
};

export default Content;
