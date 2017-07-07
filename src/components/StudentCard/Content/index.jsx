import styles from './style.postcss';
import React from 'react';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Content = ({ withSeparatorLine, children }) => {
  const classes = classnames(styles.Content, { [styles.__withSeparatorLine]: withSeparatorLine });
  return <div className={classes}>{children}</div>;
};

Content.propTypes = {
  withSeparatorLine: PropTypes.bool,
  children: PropTypes.node,
};

export default pure(Content);
