import styles from './style.postcss';

import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Map } from 'immutable';
import is from 'is_js';
import log from 'domain/log';
import ReactGA from 'react-ga';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import Config from 'domain/Config';
import SaveBarButton from './SaveBarButton';

const HTTP_METHOD_TRIGGERS = ['POST', 'PUT', 'DELETE'];
const EDIT_MODE_MATCH_REGEXP = new RegExp('^edit$', 'i');

// config feature flag
let IS_ACTIVE;
try {
  IS_ACTIVE = !! Config.get('showSavingBarForApiPostsPuts');
} catch (e) {
  IS_ACTIVE = false;
}

// per-route action button settings may be supplied as functions
const fnToValue = (any, props) => {
  if (is.function(any)) {
    return any(props);
  }
  return any;
};

class SaveBarHandler extends Component {
  constructor() {
    super();
    this.state = { isVisible: false };
  }

  componentWillReceiveProps(nextProps) {
    const {
      params: { mode: nextMode },
      isAnyApiCallSaving: nextIsAnyApiCallSaving,
    } = nextProps;
    // CONFIG flag check
    if (! IS_ACTIVE) return;
    const buttonsToDisplay = this._getButtonsToDisplay(nextProps);
    let newIsVisible = false;
    nextIsAnyApiCallSaving && (newIsVisible = true);
    // we don't want to show the saving bar when editing but there are no buttons
    EDIT_MODE_MATCH_REGEXP.test(nextMode) && buttonsToDisplay.size && (newIsVisible = true);
    if (newIsVisible !== this.state.isVisible) {
      this.setState({ isVisible: newIsVisible });
    }
  }

  _getButtonsToDisplay(props = this.props) {
    const currentRoute = SaveBarHandler.getCurrentRouteSegment(props);
    const currentModeName = props.params &&
        props.params.mode &&
        props.params.mode.length ?
            props.params.mode :
            'default';

    // exit out if not in edit mode; we're not visible.
    if (! EDIT_MODE_MATCH_REGEXP.test(props.params.mode)) return new Map();

    const actionButtonsMap = {};
    let actionButtonsForMode;
    if (currentRoute.actionButtons && currentRoute.actionButtons[currentModeName]) {
      actionButtonsForMode = currentRoute.actionButtons[currentModeName];
      Object.assign(actionButtonsMap, actionButtonsForMode);
    }

    const buttonsToDisplay = Object.keys(actionButtonsMap).filter((buttonLabel) => {
      const buttonDescriptor = actionButtonsMap[buttonLabel];
      try {
        if (is.function(buttonDescriptor.visibleWhen)) {
          if (buttonDescriptor.visibleWhen.length < 2) {
            return buttonDescriptor.visibleWhen(props);
          }
          log.error('Too many arguments in signature of `visibleWhen`. Got',
              buttonDescriptor.visibleWhen.length);
        }
      } catch (err) {
        log.warn(`Error in \`visibleWhen\` in route \`${currentRoute.path}\``, err);
      }

      return true;
    });

    return new Map(actionButtonsMap)
        .filter((v, key) => buttonsToDisplay.indexOf(key) >= 0);
  }

  _getIsDisabled(buttonDescriptor) {
    const props = this.props;
    try {
      if (is.function(buttonDescriptor.disableWhen)) {
        if (buttonDescriptor.disableWhen.length < 2) {
          return buttonDescriptor.disableWhen(props);
        // handle the older form of this method where there are two args - state and props
        }
        log.error('Too many arguments in signature of `disableWhen`. Got',
            buttonDescriptor.disableWhen.length);
      }
    } catch (err) {
      const currentRoute = SaveBarHandler.getCurrentRouteSegment(this.props);
      log.warn(`Error in \`disableWhen\` in route \`${currentRoute.path}\``, err);
    }
    return false;
  }

  _getOnClickHandler(buttonDescriptor, buttonLabel) {
    if (buttonDescriptor.onClick) {
      if (buttonDescriptor.onClick.length > 1) {
        log.warn('Deprecated form of `onClick` handler found. It should now have just one argument for props.',
            buttonDescriptor);
      }
      return () => {
        registerClick();
        return buttonDescriptor.onClick.call(this, this.props);
      };
    }
    return (buttonDescriptor.route &&
      (() => {
        registerClick();
        return this._redirect(fnToValue(buttonDescriptor.route, this.props));
      }));
    function registerClick() {
      ReactGA.event({
        category: 'Navigation',
        action: 'Clicked action button',
        label: `Clicked ${buttonLabel} in the bottom save bar`,
      });
    }
  }

  _redirect(param) {
    const { pushRoute, buildRoute } = this.props;
    pushRoute(buildRoute(param));
  }

  render() {
    const { children, isAnyApiCallSaving } = this.props;  // eslint-disable-line
    const { isVisible } = this.state;
    const barClasses = {
      [styles.SaveBar]: true,
      [styles.__visible]: !! isVisible,
    };
    const overlayClasses = {
      [styles.SaveBar_overlay]: true,
      [styles.__visible]: !! isAnyApiCallSaving,
    };
    return <div className={styles.SaveBarHandler}>
      <aside className={classnames(barClasses)}>
        <div className={styles.SaveBar_inner}>
          <span className={classnames(styles.SaveBar_text, {
            [styles.__visible]: !! isAnyApiCallSaving,
          })}>
            Saving…
          </span>
          <div className={styles.SaveBar_inner_buttons}>
            {
              this._getButtonsToDisplay()
                // eslint-disable-next-line react/no-array-index-key
                .map((buttonDescriptor, buttonLabel) => <SaveBarButton key={buttonLabel}
                    label={buttonLabel}
                    isPrimary={buttonDescriptor.isPrimary}
                    disabled={this._getIsDisabled(buttonDescriptor)}
                    onClick={this._getOnClickHandler(buttonDescriptor, buttonLabel)}
                    linkHref={fnToValue(buttonDescriptor.linkHref, this.props)} />)
                .toArray()
            }
          </div>
        </div>
      </aside>
      <div className={classnames(overlayClasses)} />
      {children}
    </div>;
  }
}

SaveBarHandler.getCurrentRouteSegment = ({ routes }) =>
  (routes ? routes[routes.length - 1] : {});

SaveBarHandler.propTypes = {
  isAnyApiCallSaving: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    mode: PropTypes.string,
  }).isRequired,
  routes: PropTypes.array.isRequired,
  pushRoute: PropTypes.func.isRequired,
  buildRoute: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function mapStateToProps(state) {
  return {
    isAnyApiCallSaving: !! isAnyApiCallSaving(state),
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign(
    { pushRoute: (path) => dispatch(push(path)) },
  );
}

function isAnyApiCallSaving(state) {
  return !! state.get('apiCalls')
    .filter((call, key) =>
      HTTP_METHOD_TRIGGERS.some((method) => key.startsWith(method)))
    .find((call) => ApiCall.State.isLoading(call));
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveBarHandler);
