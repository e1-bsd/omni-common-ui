import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import is from 'is_js';
import PropTypes from 'prop-types';
import testClass from 'domain/testClass';

const PageCardHeading = (props) => {
  const { className, text } = props;
  const textAbbr = is.string(text) &&
    text.replace(/\s+/g, '-').replace(/'/, '').toLowerCase();
  const textClassName = textAbbr && testClass(`${textAbbr}-page-card`);
  return <header className={classnames(styles.PageCardHeading, className, {
    [styles.__stackHorizontal]: props.stackMode === 'horizontal',
    [textClassName]: is.existy(textAbbr),
  })}>
    {is.string(text) && text.length ?
      <h1 className={styles.PageCardHeading_h1}>
        {text}
      </h1> : null}
    {props.children}
  </header>;
};

PageCardHeading.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  stackMode: PropTypes.oneOf(['vertical', 'horizontal']),  // default: vertical
  children: PropTypes.node,
};

export default pure(PageCardHeading);
