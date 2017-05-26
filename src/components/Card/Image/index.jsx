import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';

const Image = (props) => <img className={styles.Image}
    alt={props.alt}
    {...props} />;

Image.propTypes = {
  alt: PropTypes.string,
};

export default pure(Image);
