import styles from './style.postcss';
import React from 'react';
import classnames from 'classnames';
import InlineSvg from 'components/InlineSvg';
import is from 'is_js';
import icons from './icons';
import PropTypes from 'prop-types';

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
  className: PropTypes.string,
  id: PropTypes.oneOf(Object.keys(icons.toObject())),
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
