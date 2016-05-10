import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const NormalCell = (props) => <td className={props.className}>{props.children}</td>;
const HeaderCell = (props) => <th className={props.className}>{props.children}</th>;

const Cell = (props) => {
  const isHeader = props.header === true;
  const CellNode = isHeader ?
      HeaderCell :
      NormalCell;
  const classes = classnames(styles.Cell, { [styles.__header]: isHeader });

  return <CellNode className={classes}>
    {props.children}
  </CellNode>;
};

Cell.propTypes = {
  header: React.PropTypes.bool,
};

export default Cell;
