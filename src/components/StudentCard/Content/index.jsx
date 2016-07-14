import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const getClassNames = (isShowingStatusAccent) => {
  if (isShowingStatusAccent) {
    return classnames(styles.Content, styles.__withLeftPadding);
  }
  return classnames(styles.Content);
};

const Content = (props, { isShowingStatusAccent }) => <div className={
    getClassNames(isShowingStatusAccent)}>
  {props.children}
</div>;

Content.contextTypes = {
  isShowingStatusAccent: React.PropTypes.bool,
};

Content.propTypes = {
  children: React.PropTypes.node,
};

export default Content;
