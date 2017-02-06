import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import is from 'is_js';

export const ClickableIcon = ({ src, title, width, onClick }) => {
  const _width = is.number(width) ? `${width}px` : (is.string(width) ? width : 'auto');  // eslint-disable-line
  return <img className={
      classnames(
        styles.ClickableIcon, {
          [styles.__clickable]: is.function(onClick),
        })}
      title={title || 'Icon'}
      alt={title || 'Icon'}
      style={{
        width: _width,
        minHeight: _width,
      }}
      src={src}
      onClick={(ev) => { onClick && onClick(ev); }} />;
};

ClickableIcon.propTypes = {
  src: React.PropTypes.string,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  onClick: React.PropTypes.func,
};

export default ClickableIcon;
