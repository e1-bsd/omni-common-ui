import styles from './style.postcss';
import React, { Component } from 'react';

class SolidCheckBox extends Component {

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
  id: React.PropTypes.string.isRequired,
  isChecked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

export default SolidCheckBox;
