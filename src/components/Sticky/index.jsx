import styles from './style.postcss';

import React, { Component } from 'react';
import classnames from 'classnames';
import stickybits from 'stickybits';

export class Sticky extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._checkHeight = this._checkHeight.bind(this);
  }

  componentDidMount() {
    stickybits(this._container, { useStickyClasses: true });
    this._periodicCheckId = setInterval(this._checkHeight, 250);
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    clearInterval(this._periodicCheckId);
    // TODO Clean up!
  }

  _checkHeight() {
    if (this.state.height === this._bar.offsetHeight) {
      return;
    }

    this.setState({ height: this._bar.offsetHeight });
  }

  render() {
    return <div className={classnames(styles.Sticky, this.props.className)}
        ref={(n) => { this._container = n; }}>
      <div className={styles.Sticky_wrapper} ref={(n) => { this._bar = n; }}>
        {this.props.children}
      </div>
      <div className={styles.Sticky_placeholder} style={{ height: this.state.height }} />
    </div>;
  }
}

Sticky.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Sticky;
