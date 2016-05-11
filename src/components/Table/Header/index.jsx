import React, { Component } from 'react';

class Header extends Component {
  getChildContext() {
    return { isHeader: true };
  }

  render() {
    return <thead>{this.props.children}</thead>;
  }
}

Header.childContextTypes = {
  isHeader: React.PropTypes.bool,
};

export default Header;
