import styles from './style.postcss';

import React, { Component } from 'react';
import { mediaQuery } from 'domain/MediaQuery';

class Logo extends Component {

  constructor(props) {
    super(props);
    this.xsQuery = mediaQuery('(min-width: 20em)');
    this.smQuery = mediaQuery('(min-width: 30em)');
    this.mdQuery = mediaQuery('(min-width: 40em)');
    this.state = {
      xs: this.xsQuery.matches ? false : true,
      sm: this.smQuery.matches ? false : true,
      md: this.mdQuery.matches ? false : true,
    };
  }

  componentDidMount() {
    this.xsQuery.addListener((mql) => {
      if (mql.matches) {
        this.setState({ xs: false });
      } else {
        this.setState({ xs: true });
      }
    });
    this.smQuery.addListener((mql) => {
      if (mql.matches) {
        this.setState({ sm: false });
      } else {
        this.setState({ sm: true });
      }
    });
    this.mdQuery.addListener((mql) => {
      if (mql.matches) {
        this.setState({ md: false });
      } else {
        this.setState({ md: true });
      }
    });
  }

  render() {
    if (!this.state.md) {
      return <span className={styles.Logo} { ...this.props }><img src={this.props.src}/></span>;
    } else {
      return <span className={styles.Logo_sideBar}></span>;
    }
  }

}
export default Logo;
