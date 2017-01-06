import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import is from 'is_js';

const PageCardHeading = (props) => {
  const { className, text } = props;

  return <header className={classnames(styles.PageCardHeading, className, {
    [styles.__stackHorizontal]: props.stackMode === 'horizontal',
  })}>
    {is.string(text) && text.length ?
      <h1 className={styles.PageCardHeading_h1}>
        {text}
      </h1> : null}
    {props.children}
  </header>;
};

PageCardHeading.propTypes = {
  className: React.PropTypes.string,
  text: React.PropTypes.string,
  stackMode: React.PropTypes.oneOf(['vertical', 'horizontal']),  // default: vertical
  children: React.PropTypes.node,
};

export default PageCardHeading;
