import styles from './style.postcss';
import React from 'react';
import classnames from 'classnames';
import InlineSvg from 'components/InlineSvg';
import is from 'is_js';
import icons from './icons';

const Icon = ({ className, id, title, onClick }) => {
  const classes = classnames(styles.Icon,
      className,
      { [styles.__clickable]: is.function(onClick) });
  return <InlineSvg className={classes}
      title={title}
      onClick={onClick}>
    {icons.get(id)}
  </InlineSvg>;
};

Icon.propTypes = {
  className: React.PropTypes.string,
  id: React.PropTypes.oneOf(Object.keys(icons.toObject())),
  title: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default Icon;
