import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CheckBox = (props) => {
  const checked = props.checked === true;
  const classes = classnames(styles.Checkbox, { [styles.__checked]: checked });

  return <label className={classes}>
    <input type="checkbox"
        name={props.name}
        className={styles.Checkbox_input}
        onChange={onChange}
        checked={checked} />
    <span className={styles.Checkbox_text}>{props.item}</span>
  </label>;

  function onChange(e) {
    props.onChecked(e);
  }
};

CheckBox.propTypes = {
  name: PropTypes.string,
  item: PropTypes.string,
  onChecked: PropTypes.func,
  checked: PropTypes.bool,
};

export default CheckBox;
