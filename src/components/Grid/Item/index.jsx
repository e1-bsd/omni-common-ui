import grid from '../grid.postcss';
import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Item = (props) => {
  let { xs } = props;
  const { sm, md, lg } = props;

  if (!xs) {
    xs = 12;
  }

  const classes = classnames(styles.Item,
      { [grid[`col-xs-${xs}`]]: !!xs },
      { [grid[`col-sm-${sm}`]]: !!sm },
      { [grid[`col-md-${md}`]]: !!md },
      { [grid[`col-lg-${lg}`]]: !!lg });
  return <div className={classes}>
    {props.children}
  </div>;
};

Item.propTypes = {
  children: React.PropTypes.node,
  xs: React.PropTypes.number,
  sm: React.PropTypes.number,
  md: React.PropTypes.number,
  lg: React.PropTypes.number,
};

export default Item;
