import 'rc-tooltip/assets/bootstrap.css';

import styles from './style.postcss';

import React from 'react';
import RcTooltip from 'rc-tooltip';
import is from 'is_js';
import classnames from 'classnames';

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
      overlay={<div className={overlayClassName}>{props.text}</div>}>
    <div className={props.className}>{props.children}</div>
  </RcTooltip>;
};

Tooltip.propTypes = {
  children: React.PropTypes.node,
  text: React.PropTypes.string,
  className: React.PropTypes.string,
  placement: React.PropTypes.string,
  overlayClassName: React.PropTypes.string,
  trigger: React.PropTypes.any,
};

export default Tooltip;
