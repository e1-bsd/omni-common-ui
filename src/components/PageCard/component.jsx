import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import is from 'is_js';

import Card from 'components/Card';

import Heading from './Heading';

const PageCard = (props) => {
  const { className, headingText } = props;

  return <Card borderless
      className={classnames(styles.PageCard, className)}>
    {is.string(headingText) && headingText.length ?
      <Heading text={headingText} /> :
      null}
    {props.children}
  </Card>;
};

PageCard.propTypes = {
  headingText: React.PropTypes.string,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default PageCard;
