import styles from './style.postcss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SolidRadio extends Component {
  constructor(props) {
    super(props);
    this._handleCheck = this._handleCheck.bind(this);
  }

  _handleCheck(evt) {
    const { value } = evt.target;
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
          onChange={this._handleCheck} />
      <label htmlFor={this.props.id} />
    </div>;
  }
}

SolidRadio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SolidRadio;
