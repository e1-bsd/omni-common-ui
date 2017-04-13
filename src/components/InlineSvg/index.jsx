import styles from './style.postcss';
import React from 'react';
import classnames from 'classnames';

const InlineSvg = ({ children, className, title, onClick }) =>
  <i className={classnames(className, styles.InlineSvg)}
      dangerouslySetInnerHTML={{ __html: children }}
      title={title}
      onClick={onClick} />;

InlineSvg.propTypes = {
  children: React.PropTypes.string,
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default InlineSvg;
