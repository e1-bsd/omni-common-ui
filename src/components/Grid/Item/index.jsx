import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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
  children: PropTypes.node,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  className: PropTypes.string,
};

Item.contextTypes = {
  grid: PropTypes.object,
};

export default Item;
