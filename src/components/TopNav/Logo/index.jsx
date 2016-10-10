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
      xs: this.xsQuery.matches,
      sm: this.smQuery.matches,
      md: this.mdQuery.matches,
    };
  }

  componentDidMount() {
    this.xsQuery.addListener((mql) => this.setState({ xs: mql.matches }));
    this.smQuery.addListener((mql) => this.setState({ sm: mql.matches }));
    this.mdQuery.addListener((mql) => this.setState({ md: mql.matches }));
  }

  render() {
    if (! this.state.md) {
      return <span className={styles.Logo} {...this.props}>
        <img src={this.props.src} role="presentation" />
      </span>;
    }

    return <span className={styles.Logo_sideBar} />;
  }
}

Logo.propTypes = {
  src: React.PropTypes.string.isRequired,
};

export default Logo;
