import styles from './style.postcss';

import React from 'react';
import PureComponent from 'domain/PureComponent';
import PropTypes from 'prop-types';

class SolidRadio extends PureComponent {
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SolidRadio;
