import styles from './style.postcss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import domAlign from 'dom-align';

class Callout extends PureComponent {
  constructor() {
    super();
    this.state = { open: false };
    this._onClick = this._onClick.bind(this);
    this._getRef = this._getRef.bind(this);
    this._getCalloutRef = this._getCalloutRef.bind(this);
  }

  componentDidMount() {
    this._updatePosition();
  }

  componentDidUpdate() {
    this._updatePosition();
  }

  _updatePosition() {
    domAlign(this._calloutNode, this._node.children[0], {
      points: ['tr', 'bc'],
      offset: [65, 25],
    });
  }

  _onClick() {
    this.setState({ open: ! this.state.open });
  }

  _getRef(node) {
    this._node = node;
  }

  _getCalloutRef(node) {
    this._calloutNode = node;
  }

  render() {
    const { content, children } = this.props;
    return <div className={styles.Callout}
        ref={this._getRef}>
      <div onClick={this._onClick}>
        {children}
      </div>
      {this.state.open &&
      <div className={styles.Callout_popup}
          ref={this._getCalloutRef}>
        {content}
      </div>}
    </div>;
  }
}

Callout.propTypes = {
  content: PropTypes.node,
  children: PropTypes.node,
};

export default Callout;
