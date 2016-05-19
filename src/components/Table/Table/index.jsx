import styles from './style.postcss';

import React from 'react';
import Reactable from 'reactable';
import classnames from 'classnames';

const Table = (props) => <Reactable.Table columns={props.columns}
    data={props.data}
    className={classnames(styles.Table, props.className)}>
  {props.children}
</Reactable.Table>;

export default Table;
