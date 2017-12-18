import styles from './style.postcss';

import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CHECK_SAME_HEIGHT_MAX = 5;

export class Sticky extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { sticky: false };
    this._onWheel = this._onWheel.bind(this);
    this._checkHeight = this._checkHeight.bind(this);
  }

  componentDidMount() {
    window.addEventListener('wheel', this._onWheel);
    window.addEventListener('touchmove', this._onWheel);
    window.addEventListener('scroll', this._onWheel);
  }

  componentDidUpdate() {
    this._startPeriodicCheck();
  }

  componentWillUnmount() {
    this._stopPeriodicCheck();
    window.removeEventListener('wheel', this._onWheel);
    window.removeEventListener('touchmove', this._onWheel);
    window.removeEventListener('scroll', this._onWheel);
  }

  _onWheel() {
    const shouldBeSticky = this._container.getBoundingClientRect().top < 0;
    if (! this.state.sticky && shouldBeSticky) {
      this.setState({ sticky: true });
    } else if (this.state.sticky && ! shouldBeSticky) {
      this.setState({ sticky: false });
    }
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
    if (this._sameHeightCount > CHECK_SAME_HEIGHT_MAX) {
      return this._stopPeriodicCheck();
    }

    if (this.state.height === this._bar.offsetHeight) {
      this._sameHeightCount += 1;
      return;
    }

    this.setState({ height: this._bar.offsetHeight }, this._onWheel);
  }

  render() {
    const classes = classnames(styles.Sticky, this.props.className, {
      [styles.__sticky]: this.state.sticky,
    });
    return <div className={classes} ref={(n) => { this._container = n; }}>
      <div className={styles.Sticky_wrapper} ref={(n) => { this._bar = n; }}>
        {this.props.children}
      </div>
      <div className={styles.Sticky_placeholder} style={{ height: this.state.height }} />
    </div>;
  }
}

Sticky.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Sticky;
