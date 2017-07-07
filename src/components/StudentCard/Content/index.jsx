import styles from './style.postcss';
import React from 'react';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Content = ({ children }, { withSeparatorLine }) => {
  const classes = classnames(styles.Content, { [styles.__withSeparatorLine]: withSeparatorLine });
  return <div className={classes}>{children}</div>;
};

Content.propTypes = {
  children: PropTypes.node,
};

Content.contextTypes = {
  withSeparatorLine: PropTypes.bool,
};


export default pure(Content);
