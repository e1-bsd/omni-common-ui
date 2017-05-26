import styles from './style.postcss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SolidCheckBox extends PureComponent {

  _handleCheck(checkBoxStatus) {
    this.props.onChange(checkBoxStatus);
  }

  render() {
    return <div className={styles.SolidCheckBox}>
      <input type="checkbox"
          id={this.props.id}
          className={styles.SolidCheckBox_checkBox}
          checked={this.props.isChecked}
          onChange={(e) => this._handleCheck(e.target.checked)} />
      <label htmlFor={this.props.id} />
    </div>;
  }
}

SolidCheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SolidCheckBox;
