import styles from './style.postcss';

import React from 'react';

const Image = (props) => <img className={styles.Image}
    alt={props.alt}
    {...props} />;

Image.propTypes = {
  alt: React.PropTypes.string,
};

export default Image;
