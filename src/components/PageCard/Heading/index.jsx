import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import is from 'is_js';
import PropTypes from 'prop-types';

const PageCardHeading = (props) => {
  const { className, titleClassName, text } = props;

  return <header className={classnames(styles.PageCardHeading, className, {
    [styles.__stackHorizontal]: props.stackMode === 'horizontal',
  })}>
    {is.string(text) && text.length ?
      <h1 className={classnames(styles.PageCardHeading_h1, titleClassName)}>
        {text}
      </h1> : null}
    {props.children}
  </header>;
};

PageCardHeading.propTypes = {
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  text: PropTypes.string,
  stackMode: PropTypes.oneOf(['vertical', 'horizontal']),  // default: vertical
  children: PropTypes.node,
};

export default pure(PageCardHeading);
