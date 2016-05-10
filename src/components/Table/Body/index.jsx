import React, { Component } from 'react';

class Body extends Component {
  getChildContext() {
    return { isHeader: false };
  }

  render() {
    return <tbody>{this.props.children}</tbody>;
  }
};

Body.childContextTypes = {
  isHeader: React.PropTypes.bool,
};

export default Body;
