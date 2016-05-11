import styles from './style.postcss';

import React, { Component } from 'react';
import Reactable from 'reactable';

const Table = (props) => <Reactable.Table className={styles.Table} {...props} />;

export default Table;
