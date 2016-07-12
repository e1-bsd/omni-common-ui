import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Content = (props) => <div className={
    classnames(styles.Content, { [styles.__bottomless]: props.withoutBottomPadding }
  )}>
  {props.children}
</div>;

Content.propTypes = {
  withoutBottomPadding: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default Content;
