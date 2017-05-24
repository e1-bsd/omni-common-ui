import styles from './style.postcss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InlineSvg = ({ children, className, title, onClick }) =>
  <i className={classnames(className, styles.InlineSvg)}
      dangerouslySetInnerHTML={{ __html: children }}
      title={title}
      onClick={onClick} />;

InlineSvg.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default InlineSvg;
