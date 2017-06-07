require('./bootstrap.css');

import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import RcTooltip from 'rc-tooltip';
import is from 'is_js';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Tooltip = (props) => {
  if (is.not.string(props.text) || is.empty(props.text)) {
    return <div className={props.className}>props.children</div>;
  }

  const placement = is.existy(props.placement) ? props.placement : 'top';
  const overlayClassName = is.existy(props.overlayClassName) ?
    classnames(styles.Tooltip_bubble, props.overlayClassName) :
    styles.Tooltip_bubble;
  const trigger = is.existy(props.trigger) ?
    props.trigger :
    ['hover'];

  return <RcTooltip placement={placement}
      trigger={trigger}
      destroyPopupOnHide
      overlay={<div>{props.text}</div>}
      overlayClassName={overlayClassName}>
    <div className={props.className}>{props.children}</div>
  </RcTooltip>;
};

Tooltip.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  className: PropTypes.string,
  placement: PropTypes.string,
  overlayClassName: PropTypes.string,
  trigger: PropTypes.any,
};

export default pure(Tooltip);
