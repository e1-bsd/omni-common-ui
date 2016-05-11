import styles from './style.postcss';

import React from 'react';
import Cell from '../Cell';

const Row = (props, context) => {
  return <tr className={styles.Row}>
    {props.children}
    {renderExpandButton()}
  </tr>;

  function renderExpandButton() {
    if (context.expandable !== true) {
      return;
    }

    return <Cell>Expand</Cell>;
  }
};

Row.contextTypes = {
  expandable: React.PropTypes.bool,
};

export default Row;
