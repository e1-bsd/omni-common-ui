import styles from './style.postcss';

import React, { PureComponent } from 'react';
import is from 'is_js';
import PropTypes from 'prop-types';

class Checkbox extends PureComponent {
  constructor(props) {
    super(props);
    this._handleCheck = this._handleCheck.bind(this);
  }

  _handleCheck(e) {
    this.props.onChange(e.target.checked);
  }

  render() {
    const { checked, onChange } = this.props;
    return <div className={styles.Checkbox}>
      <input type="checkbox"
          id={this.props.id}
          name={this.props.name}
          value={this.props.value || this.props.id}
          checked={is.existy(checked) ? !! checked : undefined}
          className={styles.Checkbox_input}
          onChange={onChange ? this._handleCheck : null} />
      <label className={styles.Checkbox_label} htmlFor={this.props.id} />
    </div>;
  }
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
