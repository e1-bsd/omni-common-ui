import React, { Component } from 'react';

const GridItem = (props) => {
  const classes = props.className || 'col-xs-12';
  return <div className={classes}>
    {props.children}
  </div>;
};

export default GridItem;
