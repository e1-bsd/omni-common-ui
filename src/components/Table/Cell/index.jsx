import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const NormalCell = (props) => <td className={props.className}>{props.children}</td>;
const HeaderCell = (props) => <th className={props.className}>{props.children}</th>;

const Cell = (props, context) => {
  const CellNode = context.isHeader ?
      HeaderCell :
      NormalCell;
  const classes = classnames(styles.Cell, { [styles.__header]: context.isHeader });

  return <CellNode className={classes}>
    <div>
      {props.children}
    </div>
  </CellNode>;
};

Cell.contextTypes = {
  isHeader: React.PropTypes.bool,
};

export default Cell;
