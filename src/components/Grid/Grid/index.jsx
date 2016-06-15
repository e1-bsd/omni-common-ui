import grid from '../grid.postcss';
import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Grid = (props) => {
  const classes = classnames(grid['container-fluid'], styles.Grid);
  return <div className={classes}>
    {props.children}
  </div>;
};

Grid.propTypes = {
  children: React.PropTypes.node,
};

export default Grid;
