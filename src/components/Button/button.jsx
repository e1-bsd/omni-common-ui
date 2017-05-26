import styles from './style.postcss';

import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Type, validateType } from './type';
import is from 'is_js';
import PropTypes from 'prop-types';

class Button extends PureComponent {
  _handleButtonClick(e) {
    if (this.props.disabled) {
      return;
    }

    if (is.function(this.props.onClick)) {
      const ret = this.props.onClick(e);
      this._setActiveClassOnClick(ret);
    }
  }

  _setActiveClassOnClick(ret) {
    const { onClickActiveClassAddDelay, onClickActiveClassRemoveDelay } = this.props;

    // defer this - we don't want to show an active state if something happens immediately
    setTimeout(() => {
      if (! this._node) return;
      this._node.classList.add(styles.__active);
      if (ret instanceof Promise) {
        ret
        .then(() => { this._unsetActiveClassIfNonActive(); })
        .catch(() => { this._unsetActiveClassIfNonActive(); });
      } else {
        setTimeout(() => {
          this._unsetActiveClassIfNonActive();
        }, is.number(onClickActiveClassRemoveDelay) ? onClickActiveClassRemoveDelay : 1000);
      }
    }, is.number(onClickActiveClassAddDelay) ? onClickActiveClassAddDelay : 100);
  }

  _unsetActiveClassIfNonActive() {
    if (this.props.active) return;
    if (! this._node) return;
    this._node.classList.remove(styles.__active);
  }

  _renderButton(type, modeClasses) {
    const classes = classnames(type, modeClasses, this.props.className);

    return <button className={classes}
        disabled={this.props.disabled}
        onClick={this.props.onClick && ((e) => { this._handleButtonClick(e); })}
        ref={(c) => { this._node = c; }}
        {...this.props.attrs || {}}>
      {this.props.children}
    </button>;
  }

  render() {
    const props = this.props;
    const type = props.type || Type.default;

    validateType(type);

    const modeClasses = {
      [styles.__block]: !! props.block,
      [styles.__autoWidth]: !! props.autoWidth,
      [styles.__active]: !! props.active,
    };

    // case: link to URL via `linkHref` OR disabled with `linkTo`
    if (is.existy(props.linkHref) || (is.existy(props.linkTo) && props.disabled)) {
      // eslint-disable-next-line no-script-url
      return <a href={! props.disabled ? props.linkHref : 'javascript:void(0)'}
          className={classnames(styles.ButtonLink, modeClasses, props.className)}
          target={props.newTab ? '_blank' : undefined}
          onClick={() => { this._setActiveClassOnClick(); }}>
        {this._renderButton(type, modeClasses)}
      </a>;
    }

    // case: link to route via `linkTo`
    if (is.existy(props.linkTo)) {
      return <Link to={props.linkTo}
          draggable={false}
          className={classnames(styles.ButtonLink, modeClasses, props.className)}
          onClick={() => { this._setActiveClassOnClick(); }}>
        {this._renderButton(type, modeClasses)}
      </Link>;
    }

    return this._renderButton(type, modeClasses);
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  newTab: PropTypes.bool,
  children: PropTypes.node,
  linkTo: PropTypes.string,
  linkHref: PropTypes.string,
  block: PropTypes.bool,
  autoWidth: PropTypes.bool,
  active: PropTypes.bool,
  className: PropTypes.string,
  attrs: PropTypes.shape({
    type: PropTypes.string,
  }),
  onClickActiveClassAddDelay: PropTypes.number,  // default: 100ms
  onClickActiveClassRemoveDelay: PropTypes.number,  // default: 1000ms
};

export default Button;
