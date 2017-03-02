import styles from './style.postcss';
import React from 'react';
import classnames from 'classnames';

const InlineSvg = ({ children, className }) =>
  <i className={classnames(className, styles.InlineSvg)}
      dangerouslySetInnerHTML={{ __html: children }} />;

InlineSvg.propTypes = {
  children: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default InlineSvg;
