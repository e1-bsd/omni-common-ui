import styles from './style.postcss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import domAlign from 'dom-align';
import debounce from 'lodash.debounce';
import classnames from 'classnames';

const RESIZE_DEBOUNCE_MS = 30;

class Callout extends PureComponent {
  constructor() {
    super();
    this.state = { open: false };
    this._onClick = this._onClick.bind(this);
    this._onClickedOutside = this._onClickedOutside.bind(this);
  }

  componentDidMount() {
    this._updatePosition();
    document.body.addEventListener('click', this._onClickedOutside);
    document.body.addEventListener('touchstart', this._onClickedOutside);
    window.addEventListener('resize', this._onResizeHandler = debounce(() => {
      this._updatePosition();
    }, RESIZE_DEBOUNCE_MS, {
      leading: true,  // nicer iOS screen rotate
      trailing: true,
    }), false);
  }

  componentDidUpdate() {
    this._updatePosition();
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this._onClickedOutside);
    document.body.removeEventListener('touchstart', this._onClickedOutside);
    window.removeEventListener('resize', this._onResizeHandler);
  }

  _updatePosition() {
    if (! this._calloutNode) return;
    const { points, offset } = this.props;
    const notchPoints = ['tl', 'bl'];
    domAlign(this._notchNode, this._node.children[0], {
      points: notchPoints,
      offset: [0, 15],
    });
    domAlign(this._calloutNode, this._node.children[0], {
      points, offset });
  }

  _onClickedOutside(evt) {
    if ((this._node && this._node.contains(evt.target)) ||
        (this._calloutNode && this._calloutNode.contains(evt.target))) {
      return;
    }
    this.setState({ open: false });
  }

  _onClick() {
    this.setState({ open: ! this.state.open });
  }

  render() {
    const { popupClassName, content, children } = this.props;
    const newContent = React.cloneElement(content, {
      className: classnames(styles.Callout_popup, popupClassName),
      ref: (node) => { this._calloutNode = node; },
      key: 'Callout#popup',
    });
    return <div className={styles.Callout}
        ref={(node) => { this._node = node; }}>
      <div className={styles.Callout_trigger}
          onClick={this._onClick}
          role="button"
          tabIndex="0">
        {children}
      </div>
      {this.state.open && [
        <div className={styles.Callout_notch}
            ref={(node) => { this._notchNode = node; }}
            key="Callout#notch" />,
        newContent] }
    </div>;
  }
}

Callout.defaultProps = {
  points: ['tr', 'bc'],
  offset: [65, 25],
};

Callout.propTypes = {
  popupClassName: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.node,
  points: PropTypes.arrayOf((val, key) => {
    if (is.string(val) && val.length === 2 && key < 2) return true;
    return new Error('`points` should use the format required by dom-align');
  }),
  offset: PropTypes.arrayOf((val, key) => {
    if (is.number(val) && val.length === 2 && key < 2) return true;
    return new Error('`offset` should use the format required by dom-align');
  }),
};

export default Callout;
