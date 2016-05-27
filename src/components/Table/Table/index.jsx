import styles from './style.postcss';

import React from 'react';
import Reactable from 'reactable';
import classnames from 'classnames';

const Table = (props) => <Reactable.Table columns={props.columns}
    data={props.data}
    className={classnames(styles.Table, props.className)}>
  {props.children}
</Reactable.Table>;

Table.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
  className: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
};

export default Table;
