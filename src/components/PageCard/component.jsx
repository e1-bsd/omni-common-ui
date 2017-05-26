import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import is from 'is_js';
import PropTypes from 'prop-types';

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
  headingText: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default pure(PageCard);
