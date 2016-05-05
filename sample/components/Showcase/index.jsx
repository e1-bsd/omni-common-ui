import styles from './style.postcss';

import React from 'react';

const Showcase = (props) =>
  <div className={styles.Showcase}>
    <h1 className={styles.Showcase_title}>{props.title}</h1>
    <div className={styles.Showcase_wrap}>{props.children}</div>
  </div>;

Showcase.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default Showcase;
