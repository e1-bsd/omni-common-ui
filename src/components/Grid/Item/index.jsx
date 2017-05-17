import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Item = (props, { grid }) => {
  let { xs } = props;
  const { sm, md, lg, className } = props;

  if (! xs) {
    xs = 12;
  }

  const classes = classnames(styles.Item,
      className,
      { [grid[`col-xs-${xs}`]]: !! xs },
      { [grid[`col-sm-${sm}`]]: !! sm },
      { [grid[`col-md-${md}`]]: !! md },
      { [grid[`col-lg-${lg}`]]: !! lg });
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
  className: React.PropTypes.string,
};

Item.contextTypes = {
  grid: React.PropTypes.object,
};

export default Item;
