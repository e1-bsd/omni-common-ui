import styles from './style.postcss';

import React from 'react';

const Row = (props) =>
  <tr className={styles.Row}>
    {props.children}
  </tr>;

export default Row;
