import styles from './style.postcss';

import React, { Component } from 'react';
import classnames from 'classnames';

import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import Button from 'components/Button';

const HTTP_METHOD_TRIGGERS = ['POST', 'PUT', 'DELETE'];

// config feature flag
let IS_ACTIVE;
try {
  IS_ACTIVE = !! Config.get('showSavingBarForApiPostsPuts'); // replaced by webpack
} catch (e) {
  IS_ACTIVE = false;
}

class SavingBarHandler extends Component {
  constructor() {
    super();
    this.state = { isVisible: false };
  }

  componentWillReceiveProps(nextProps) {
    const { isAnyApiCallSaving: nextIsAnyApiCallSaving } = nextProps;
    // CONFIG flag check
    if (! IS_ACTIVE) return;
    if (nextIsAnyApiCallSaving !== this.state.isVisible) {
      this.setState({ isVisible: !! nextIsAnyApiCallSaving });
    }
  }

  render() {
    const { children, location: { pathname }, buildRoute } = this.props;
    const { isVisible } = this.state;
    const isExitButtonVisible = pathname.endsWith('/edit');
    const barClasses = {
      [styles.SavingBar]: true,
      [styles.__visible]: !! isVisible,
    };
    const overlayClasses = {
      [styles.SavingBar_overlay]: true,
      [styles.__visible]: !! isVisible,
    };
    return <div data-component="SavingBarHandler">
      <aside className={classnames(barClasses)}>
        <div className={styles.SavingBar_inner}>
          <span className={styles.SavingBar_text}>
            Saving…
          </span>
          {isExitButtonVisible ? <Button type={Button.Type.primaryInverse}
              className={styles.SavingBar_button}
              linkTo={buildRoute({ mode: '' })}
              autoWidth>
            Exit
          </Button> : null}
        </div>
      </aside>
      <div className={classnames(overlayClasses)} />
      {children}
    </div>;
  }
}

SavingBarHandler.propTypes = {
  isAnyApiCallSaving: React.PropTypes.bool.isRequired,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string,
  }).isRequired,
  buildRoute: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
};

function mapStateToProps(state) {
  return {
    isAnyApiCallSaving: !! isAnyApiCallSaving(state),
  };
}

function isAnyApiCallSaving(state) {
  return !! state.get('apiCalls')
    .filter((call, key) =>
      HTTP_METHOD_TRIGGERS.some((method) => key.startsWith(method)))
    .find((call) => ApiCall.State.isLoading(call));
}

export default connect(mapStateToProps)(SavingBarHandler);
