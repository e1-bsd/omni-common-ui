import styles from './style.postcss';

import React from 'react';

const Content = (props) => <div className={styles.Content}>
  {props.children}
</div>;

Content.propTypes = {
  children: React.PropTypes.node,
};

export default Content;
