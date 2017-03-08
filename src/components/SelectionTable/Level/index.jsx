import React from 'react';
import styles from './style.postcss';

const Level = ({ label }) =>
  <div className={styles.Level}>
    {label}
  </div>;

Level.propTypes = {
  label: React.PropTypes.string.isRequired,
};

export default Level;
