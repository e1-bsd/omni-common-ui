import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Type, validateType } from './type';
import is from 'is_js';

const Button = (props) => {
  const type = props.type || Type.default;
  validateType(type);
  const modeClasses = {
    [styles.__block]: !! props.block,
    [styles.__autoWidth]: !! props.autoWidth,
    [styles.__active]: !! props.active,
  };

  const classes = classnames(type, modeClasses, props.className);

  // case: link to URL via `linkHref` OR disabled with `linkTo`
  if (is.existy(props.linkHref) || (is.existy(props.linkTo) && props.disabled)) {
    // eslint-disable-next-line no-script-url
    return <a href={! props.disabled ? props.linkHref : 'javascript:void(0)'}
        className={classnames(styles.ButtonLink, modeClasses, props.className)}>
      {renderButton()}
    </a>;
  }

  // case: link to route via `linkTo`
  if (is.existy(props.linkTo)) {
    return <Link to={props.linkTo}
        className={classnames(styles.ButtonLink, modeClasses, props.className, {
          [styles.__neo]: type === Type.neoPrimary || type === Type.neo,
        })}>
      {renderButton()}
    </Link>;
  }

  return renderButton();

  function renderButton() {
    return <button className={classes}
        disabled={props.disabled}
        onClick={props.onClick && handleClick}>
      {props.children}
    </button>;
  }

  function handleClick(e) {
    if (props.disabled) {
      return;
    }

    if (is.function(props.onClick)) {
      props.onClick(e);
    }
  }
};

Button.propTypes = {
  onClick: React.PropTypes.func,
  type: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  children: React.PropTypes.node,
  linkTo: React.PropTypes.string,
  linkHref: React.PropTypes.string,
  block: React.PropTypes.bool,
  autoWidth: React.PropTypes.bool,
  active: React.PropTypes.bool,
  className: React.PropTypes.string,
};

export default Button;
