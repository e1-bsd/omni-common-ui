import styles from './style.postcss';

import React, { Component } from 'react';
import classnames from 'classnames';
import stickybits from 'stickybits';
import log from 'domain/log';

const CHECK_SAME_HEIGHT_MAX = 5;

export class Sticky extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._checkHeight = this._checkHeight.bind(this);
  }

  componentDidMount() {
    stickybits(this._container, { useStickyClasses: true });
  }

  componentDidUpdate() {
    this._startPeriodicCheck();
  }

  componentWillUnmount() {
    this._stopPeriodicCheck();
    // TODO Clean up stickybits!
  }

  _startPeriodicCheck() {
    this._stopPeriodicCheck();
    this._sameHeightCount = 0;
    this._periodicCheckId = setInterval(this._checkHeight, 25);
  }

  _stopPeriodicCheck() {
    clearInterval(this._periodicCheckId);
  }

  _checkHeight() {
    log.debug('Sticky - _checkHeight()');
    if (this._sameHeightCount > CHECK_SAME_HEIGHT_MAX) {
      return this._stopPeriodicCheck();
    }

    if (this.state.height === this._bar.offsetHeight) {
      this._sameHeightCount += 1;
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
