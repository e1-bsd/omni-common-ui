import styles from './style.postcss';

import React, { Component } from 'react';
import Header from '../Header';
import Body from '../Body';
import is from 'is_js';

class Table extends Component {
  constructor(props) {
    super(props);
    this.hasHeader = is.function(this.props.header);
  }

  getChildContext() {
    return { expandable: this.props.expandable };
  }

  render() {
    return <table className={styles.Table}>
      {this.renderHeader()}
      <Body>
        {this.props.children}
      </Body>
    </table>;
  }

  renderHeader() {
    if (!this.hasHeader) {
      return;
    }

    return <Header>{this.props.header()}</Header>;
  }
}

Table.propTypes = {
  header: React.PropTypes.func,
  expandable: React.PropTypes.bool,
};

Table.childContextTypes = {
  expandable: React.PropTypes.bool,
};

export default Table;
