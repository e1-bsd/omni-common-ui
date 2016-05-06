
import React from 'react';
const Item = (props) => {
  return <div className={classes}>
    {props.children}
  </div>;
};

export default Item;
