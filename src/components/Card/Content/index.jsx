import styles from './style.postcss';

import React from 'react';

const Content = (props) =>
  <div className={styles.Content}>
    {props.children}
  </div>;

export default Content;
