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

export default Grid;
