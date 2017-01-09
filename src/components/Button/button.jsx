import styles from './style.postcss';

import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Type, validateType, NeoTypes } from './type';
import is from 'is_js';

class Button extends Component {
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
        ref={(c) => { this._node = c; }}>
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
          ref={(c) => { this._node = c; }}
          target={props.newTab ? '_blank' : undefined}
          onClick={() => { this._setActiveClassOnClick(); }}>
        {this._renderButton(type, modeClasses)}
      </a>;
    }

    // case: link to route via `linkTo`
    if (is.existy(props.linkTo)) {
      return <Link to={props.linkTo}
          className={classnames(styles.ButtonLink, modeClasses, props.className, {
            [styles.__neo]: NeoTypes.indexOf(type) !== - 1,
          })}
          ref={(c) => { this._node = c; }}
          onClick={() => { this._setActiveClassOnClick(); }}>
        {this._renderButton(type, modeClasses)}
      </Link>;
    }

    return this._renderButton(type, modeClasses);
  }
}

Button.propTypes = {
  onClick: React.PropTypes.func,
  type: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  newTab: React.PropTypes.bool,
  children: React.PropTypes.node,
  linkTo: React.PropTypes.string,
  linkHref: React.PropTypes.string,
  block: React.PropTypes.bool,
  autoWidth: React.PropTypes.bool,
  active: React.PropTypes.bool,
  className: React.PropTypes.string,
  onClickActiveClassAddDelay: React.PropTypes.number,  // default: 100ms
  onClickActiveClassRemoveDelay: React.PropTypes.number,  // default: 1000ms
};

export default Button;
