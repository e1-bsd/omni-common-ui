import styles from './style.postcss';

import React from 'react';

const Table = (props) =>
  <table className={styles.Table}>
    {props.children}
  </table>;

export default Table;
