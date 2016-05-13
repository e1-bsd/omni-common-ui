import 'react-select/dist/react-select.css';
import styles from './style.postcss';

import React from 'react';
import ReactSelect from 'react-select';

const Select = (props) =>
  <div className={styles.Select}>
    <ReactSelect {...props} />
  </div>;

export default Select;
