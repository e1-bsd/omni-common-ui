import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Content = (props) => {
  const className = classnames(props.className, styles.Content,
    { [styles.__bottomless]: props.withoutBottomPadding });
  return <div className={className}>
    {props.children}
  </div>;
};

Content.propTypes = {
  className: PropTypes.string,
  withoutBottomPadding: PropTypes.bool,
  children: PropTypes.node,
};

export default pure(Content);
