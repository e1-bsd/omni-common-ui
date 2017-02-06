import styles from './style.postcss';
import React, { Component } from 'react';

class SolidRadio extends Component {
  _handleCheck(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    return <div className={styles.SolidRadio}>
      <input type="radio"
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          className={styles.SolidRadio_radio}
          checked={this.props.isChecked}
          onChange={(e) => this._handleCheck(e.target.value)} />
      <label htmlFor={this.props.id} />
    </div>;
  }
}

SolidRadio.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  isChecked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

export default SolidRadio;
