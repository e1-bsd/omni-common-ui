import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const PageCardContent = (props) => {
  const { className } = props;

  return <div className={classnames(styles.PageCardContent, className)}>
    {props.children}
  </div>;
};

PageCardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default pure(PageCardContent);
