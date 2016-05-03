import styles from './style.postcss';

import React, { Component } from 'react';

export const Type = {
  default: 'default',
  danger: 'danger',
};

class Button extends Component {
  constructor(props) {
    super(props);
    this.type = this.props.type || Type.default;
    this.inverse = !!this.props.inverse;
  }

  getTypeClass() {
    let inverse = '';
    if (this.inverse) {
      inverse = '__inverse';
    }

    return styles[`Button__${this.type}${inverse}`];
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return <button className={`${styles.Button} ${this.getTypeClass()}`}
        disabled={this.props.disabled}
        onClick={(e) => this.handleClick(e)}>
      {this.props.children}
    </button>;
  }
}

Button.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  type: React.PropTypes.string,
  inverse: React.PropTypes.bool,
};

export default Button;
