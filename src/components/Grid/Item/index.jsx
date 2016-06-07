import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Item = (props) => {
  let { xs } = props;
  const { sm, md, lg } = props;

  if (!xs && !sm && !md && !lg) {
    xs = 12;
  }

  const classes = classnames(styles.Item,
      { [`col-xs-${xs}`]: !!xs },
      { [`col-sm-${sm}`]: !!sm },
      { [`col-md-${md}`]: !!md },
      { [`col-lg-${lg}`]: !!lg });
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
