import React from 'react';
import styles from './style.postcss';

const TextInput = (props) => {
  return <div className={styles.TextInput}>
    <label className={styles.TextInput_label} for={props.name}>{props.label}</label>
    <input type="text" id={props.name} name={props.name} disabled={props.disabled} />
  </div>;
};

export default TextInput;
