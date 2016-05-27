import 'flexboxgrid';
import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Grid = (props) => {
  const classes = classnames('container-fluid', styles.Grid);
  return <div className={classes}>
    {props.children}
  </div>;
};

Grid.propTypes = {
  children: React.PropTypes.node,
};

export default Grid;
