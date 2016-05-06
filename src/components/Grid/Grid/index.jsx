import 'flexboxgrid';

import React, { Component } from 'react';

const Grid = (props) =>
  <div className="container">
    {props.children}
  </div>;

export default Grid;
