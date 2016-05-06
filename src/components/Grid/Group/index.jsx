import React, { Component } from 'react';

const GridGroup = (props) => {
  return <div className="row">
    {props.children}
  </div>;
};

export default GridGroup;
